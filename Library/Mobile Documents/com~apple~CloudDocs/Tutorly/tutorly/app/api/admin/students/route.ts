import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: List all students
export async function GET(request: Request) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const year = searchParams.get('year') || '';
        const status = searchParams.get('status') || '';

        const students = await prisma.users.findMany({
            where: {
                role: 'STUDENT',
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' as const } },
                        { email: { contains: search, mode: 'insensitive' as const } },
                        { username: { contains: search, mode: 'insensitive' as const } },
                    ]
                }),
                ...(year && { year }),
                ...(status === 'active' && { onboarded: true }),
                ...(status === 'inactive' && { onboarded: false }),
            },
            select: {
                id: true,
                name: true,
                email: true,
                username: true,
                year: true,
                ageGroup: true,
                onboarded: true,
                createdAt: true,
                subscriptions: {
                    select: {
                        plan: true,
                        status: true,
                        courses: true,
                    },
                    take: 1,
                    orderBy: { createdAt: 'desc' }
                },
                _count: {
                    select: {
                        homeworkSubmissions: true,
                        testSubmissions: true,
                        live_sessions: true,
                    }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        return NextResponse.json({ students });
    } catch (error) {
        console.error('Failed to fetch students:', error);
        return NextResponse.json(
            { error: 'Failed to fetch students' },
            { status: 500 }
        );
    }
}

// POST: Create new student
export async function POST(request: Request) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const body = await request.json();
        const { name, email, year, ageGroup } = body;

        if (!name || !email) {
            return NextResponse.json(
                { error: 'Name and email are required' },
                { status: 400 }
            );
        }

        // Check if email already exists
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'A user with this email already exists' },
                { status: 400 }
            );
        }

        // Create student
        const student = await prisma.users.create({
            data: {
                name,
                email,
                year,
                ageGroup: ageGroup || (year && parseInt(year.replace('Year ', '')) <= 4 ? 'years_1_4' : 'years_4_plus'),
                role: 'STUDENT',
                onboarded: false,
            }
        });

        return NextResponse.json({ student }, { status: 201 });
    } catch (error) {
        console.error('Failed to create student:', error);
        return NextResponse.json(
            { error: 'Failed to create student' },
            { status: 500 }
        );
    }
}
