import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: Get single session
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { id } = await params;

        const session = await prisma.live_sessions.findUnique({
            where: { id },
            include: {
                users: {
                    select: { id: true, name: true, email: true, year: true }
                }
            }
        });

        if (!session) {
            return NextResponse.json(
                { error: 'Session not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ session });
    } catch (error) {
        console.error('Failed to fetch session:', error);
        return NextResponse.json(
            { error: 'Failed to fetch session' },
            { status: 500 }
        );
    }
}

// PATCH: Update session
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { id } = await params;
        const body = await request.json();
        const { courseName, scheduledAt, meetingLink, notes, status, attendees } = body;

        const session = await prisma.live_sessions.update({
            where: { id },
            data: {
                ...(courseName !== undefined && { courseName }),
                ...(scheduledAt !== undefined && { scheduledAt: new Date(scheduledAt) }),
                ...(meetingLink !== undefined && { meetingLink }),
                ...(notes !== undefined && { notes }),
                ...(status !== undefined && { status }),
                ...(attendees !== undefined && { attendees }),
            }
        });

        return NextResponse.json({ session });
    } catch (error) {
        console.error('Failed to update session:', error);
        return NextResponse.json(
            { error: 'Failed to update session' },
            { status: 500 }
        );
    }
}

// DELETE: Delete session
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { id } = await params;

        await prisma.live_sessions.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete session:', error);
        return NextResponse.json(
            { error: 'Failed to delete session' },
            { status: 500 }
        );
    }
}
