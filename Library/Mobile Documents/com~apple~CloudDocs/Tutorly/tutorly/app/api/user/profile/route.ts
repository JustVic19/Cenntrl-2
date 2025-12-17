import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function PATCH(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user?.id) {
            return NextResponse.json(
                { error: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { name, username, year } = await request.json();

        // Check if username is already taken (if changing username)
        if (username && username !== session.user.username) {
            const existingUser = await prisma.users.findUnique({
                where: { username },
            });

            if (existingUser) {
                return NextResponse.json(
                    { error: 'Username already taken' },
                    { status: 400 }
                );
            }
        }

        // Determine age group based on year if year is being updated
        let ageGroup = session.user.ageGroup;
        if (year) {
            const yearNum = parseInt(year.replace('Year ', ''));
            ageGroup = yearNum <= 4 ? 'years_1_4' : 'years_4_plus';
        }

        // Update user
        const updatedUser = await prisma.users.update({
            where: { id: session.user.id },
            data: {
                ...(name && { name }),
                ...(username && { username }),
                ...(year && { year, ageGroup }),
            },
        });

        return NextResponse.json({
            message: 'Profile updated successfully',
            user: {
                id: updatedUser.id,
                name: updatedUser.name,
                username: updatedUser.username,
                year: updatedUser.year,
                ageGroup: updatedUser.ageGroup,
            },
        });
    } catch (error) {
        console.error('Profile update error:', error);
        return NextResponse.json(
            { error: 'Failed to update profile' },
            { status: 500 }
        );
    }
}
