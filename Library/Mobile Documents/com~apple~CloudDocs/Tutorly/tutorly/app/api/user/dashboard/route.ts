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

        // Fetch user with active subscription
        const user = await prisma.users.findUnique({
            where: { id: session.user.id },
        });

        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        // Fetch user's active subscription
        const subscription = await prisma.subscriptions.findFirst({
            where: {
                userId: session.user.id,
                status: 'active',
            },
            orderBy: { createdAt: 'desc' },
        });

        if (!subscription) {
            return NextResponse.json({
                hasSubscription: false,
                courses: [],
                user: {
                    name: user.name,
                    email: user.email,
                    username: user.username,
                    year: user.year,
                    ageGroup: user.ageGroup,
                },
            });
        }

        // Parse courses from subscription
        const courses = Array.isArray(subscription.courses)
            ? subscription.courses
            : [];

        // Transform courses for dashboard
        const coursesData = courses.map((courseName: string, index: number) => ({
            id: index + 1,
            name: courseName,
            progress: 0, // Will be tracked later
            nextLesson: null, // Will come from sessions
            totalLessons: 12, // Default, can be configured per course later
            subject: courseName.split(' ')[1] || 'General', // Extract subject from name
        }));

        return NextResponse.json({
            hasSubscription: true,
            user: {
                name: user.name,
                email: user.email,
                username: user.username,
                year: user.year,
                ageGroup: user.ageGroup,
            },
            subscription: {
                id: subscription.id,
                plan: subscription.plan,
                courses: courses,
                sessionsPerWeek: subscription.sessionsPerWeek,
                monthlyAmount: Number(subscription.monthlyAmount),
                status: subscription.status,
                createdAt: subscription.createdAt,
            },
            courses: coursesData,
        });
    } catch (error) {
        console.error('Dashboard API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch dashboard data' },
            { status: 500 }
        );
    }
}
