import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { username, year, ageGroup } = await request.json();

        // Validation
        if (!username || !year || !ageGroup) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if username is already taken
        const existingUser = await prisma.users.findUnique({
            where: { username },
        });

        if (existingUser && existingUser.id !== session.user.id) {
            return NextResponse.json(
                { error: 'Username already taken' },
                { status: 400 }
            );
        }

        // Update user
        const updatedUser = await prisma.users.update({
            where: { id: session.user.id },
            data: {
                username,
                year,
                ageGroup,
                onboarded: true,
            },
        });

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                username: updatedUser.username,
                year: updatedUser.year,
                ageGroup: updatedUser.ageGroup,
                onboarded: updatedUser.onboarded,
            },
        });
    } catch (error) {
        console.error('Onboarding error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
