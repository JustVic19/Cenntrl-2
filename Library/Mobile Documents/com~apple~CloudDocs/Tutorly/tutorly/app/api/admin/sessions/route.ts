import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: List all sessions
export async function GET(request: Request) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { searchParams } = new URL(request.url);
        const status = searchParams.get('status') || '';
        const upcoming = searchParams.get('upcoming') === 'true';

        const sessions = await prisma.live_sessions.findMany({
            where: {
                ...(status && { status }),
                ...(upcoming && {
                    scheduledAt: { gte: new Date() },
                    status: 'scheduled'
                }),
            },
            include: {
                users: {
                    select: { id: true, name: true, email: true, year: true }
                }
            },
            orderBy: { scheduledAt: upcoming ? 'asc' : 'desc' }
        });

        return NextResponse.json({ sessions });
    } catch (error) {
        console.error('Failed to fetch sessions:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sessions' },
            { status: 500 }
        );
    }
}

// POST: Create new session
export async function POST(request: Request) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const body = await request.json();
        const { userId, courseName, scheduledAt, meetingLink, notes } = body;

        if (!userId || !courseName || !scheduledAt) {
            return NextResponse.json(
                { error: 'Student, course name, and scheduled time are required' },
                { status: 400 }
            );
        }

        const session = await prisma.live_sessions.create({
            data: {
                userId,
                courseName,
                scheduledAt: new Date(scheduledAt),
                meetingLink,
                notes,
                status: 'scheduled',
            },
            include: {
                users: {
                    select: { id: true, name: true, email: true }
                }
            }
        });

        // TODO: Send email notification to student about scheduled session

        return NextResponse.json({ session }, { status: 201 });
    } catch (error) {
        console.error('Failed to create session:', error);
        return NextResponse.json(
            { error: 'Failed to create session' },
            { status: 500 }
        );
    }
}
