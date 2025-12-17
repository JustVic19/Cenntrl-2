import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        // Get upcoming live sessions for the user
        const now = new Date();
        const liveSessions = await prisma.live_sessions.findMany({
            where: {
                userId: session.user.id,
                scheduledAt: { gte: now },
                status: 'scheduled',
            },
            orderBy: { scheduledAt: 'asc' },
            take: 20, // Get next 20 sessions
        });

        // Also get past sessions (last 5)
        const pastSessions = await prisma.live_sessions.findMany({
            where: {
                userId: session.user.id,
                OR: [
                    { scheduledAt: { lt: now } },
                    { status: { in: ['completed', 'cancelled'] } },
                ],
            },
            orderBy: { scheduledAt: 'desc' },
            take: 5,
        });

        // Get next session (soonest upcoming)
        const nextSession = liveSessions.length > 0 ? liveSessions[0] : null;

        return NextResponse.json({
            upcoming: liveSessions,
            past: pastSessions,
            nextSession,
            totalUpcoming: liveSessions.length,
        });
    } catch (error) {
        console.error('Sessions API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch sessions' },
            { status: 500 }
        );
    }
}
