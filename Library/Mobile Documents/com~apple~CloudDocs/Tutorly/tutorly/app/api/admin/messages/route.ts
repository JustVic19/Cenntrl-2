import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: List all messages sent by tutor
export async function GET(request: Request) {
    try {
        const { authorized, error, session } = await requireAdminOrTutor();

        if (!authorized || !session) {
            return error;
        }

        const messages = await prisma.messages.findMany({
            where: { sentBy: session.user.id },
            include: {
                recipients: {
                    include: {
                        user: {
                            select: { name: true, email: true }
                        }
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        const messagesWithStats = messages.map(msg => ({
            ...msg,
            recipientCount: msg.recipients.length,
            readCount: msg.recipients.filter(r => r.read).length,
        }));

        return NextResponse.json({ messages: messagesWithStats });
    } catch (error) {
        console.error('Failed to fetch messages:', error);
        return NextResponse.json(
            { error: 'Failed to fetch messages' },
            { status: 500 }
        );
    }
}

// POST: Send new message
export async function POST(request: Request) {
    try {
        const { authorized, error, session } = await requireAdminOrTutor();

        if (!authorized || !session) {
            return error;
        }

        const body = await request.json();
        const { subject, content, sentTo, yearGroup } = body;

        if (!subject || !content || !sentTo) {
            return NextResponse.json(
                { error: 'Subject, content, and recipients are required' },
                { status: 400 }
            );
        }

        // Get recipient user IDs based on sentTo value
        let recipientIds: string[] = [];

        if (sentTo === 'all') {
            const students = await prisma.users.findMany({
                where: { role: 'STUDENT' },
                select: { id: true }
            });
            recipientIds = students.map(s => s.id);
        } else if (sentTo.startsWith('Year ')) {
            const students = await prisma.users.findMany({
                where: { role: 'STUDENT', year: sentTo },
                select: { id: true }
            });
            recipientIds = students.map(s => s.id);
        } else {
            // Assume it's a specific user ID
            recipientIds = [sentTo];
        }

        // Create message and recipients
        const message = await prisma.messages.create({
            data: {
                subject,
                content,
                sentBy: session.user.id,
                sentTo,
                yearGroup,
                recipients: {
                    create: recipientIds.map(userId => ({
                        userId,
                        read: false
                    }))
                }
            },
            include: {
                recipients: {
                    include: {
                        user: {
                            select: { name: true, email: true }
                        }
                    }
                }
            }
        });

        // TODO: Send email notifications to recipients

        return NextResponse.json({ message }, { status: 201 });
    } catch (error) {
        console.error('Failed to send message:', error);
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        );
    }
}
