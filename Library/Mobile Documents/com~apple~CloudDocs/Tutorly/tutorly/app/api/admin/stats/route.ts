import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const { authorized, error, session } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        // Get total students
        const totalStudents = await prisma.users.count({
            where: { role: 'STUDENT' }
        });

        // Get active students (onboarded)
        const activeStudents = await prisma.users.count({
            where: {
                role: 'STUDENT',
                onboarded: true
            }
        });

        // Get pending homework submissions (not graded yet)
        const pendingHomework = await prisma.homework_submissions.count({
            where: { graded: false }
        });

        // Get upcoming sessions
        const upcomingSessions = await prisma.live_sessions.count({
            where: {
                scheduledAt: { gte: new Date() },
                status: 'scheduled'
            }
        });

        // Get unread messages (messages sent to tutor that are unread)
        const unreadMessages = 0; // Will implement later

        return NextResponse.json({
            totalStudents,
            activeStudents,
            pendingHomework,
            upcomingSessions,
            unreadMessages,
        });
    } catch (error) {
        console.error('Admin stats error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch stats' },
            { status: 500 }
        );
    }
}
