import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: List all homework
export async function GET(request: Request) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search') || '';
        const year = searchParams.get('year') || '';

        const homework = await prisma.homework.findMany({
            where: {
                ...(search && {
                    OR: [
                        { title: { contains: search, mode: 'insensitive' as const } },
                        { description: { contains: search, mode: 'insensitive' as const } },
                    ]
                }),
                ...(year && { yearGroup: year }),
            },
            include: {
                creator: {
                    select: { name: true, email: true }
                },
                _count: {
                    select: { submissions: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });

        // Get submission counts
        const homeworkWithStats = await Promise.all(
            homework.map(async (hw) => {
                const gradedCount = await prisma.homework_submissions.count({
                    where: { homeworkId: hw.id, graded: true }
                });
                return {
                    ...hw,
                    submissionCount: hw._count.submissions,
                    gradedCount,
                };
            })
        );

        return NextResponse.json({ homework: homeworkWithStats });
    } catch (error) {
        console.error('Failed to fetch homework:', error);
        return NextResponse.json(
            { error: 'Failed to fetch homework' },
            { status: 500 }
        );
    }
}

// POST: Create new homework
export async function POST(request: Request) {
    try {
        const { authorized, error, session } = await requireAdminOrTutor();

        if (!authorized || !session) {
            return error;
        }

        const body = await request.json();
        const { title, description, fileUrl, fileType, dueDate, assignedTo, yearGroup } = body;

        if (!title) {
            return NextResponse.json(
                { error: 'Title is required' },
                { status: 400 }
            );
        }

        const homework = await prisma.homework.create({
            data: {
                title,
                description,
                fileUrl,
                fileType,
                dueDate: dueDate ? new Date(dueDate) : null,
                assignedTo: assignedTo || 'all',
                yearGroup,
                createdBy: session.user.id,
            },
            include: {
                creator: {
                    select: { name: true, email: true }
                }
            }
        });

        // TODO: Send email notification to assigned students

        return NextResponse.json({ homework }, { status: 201 });
    } catch (error) {
        console.error('Failed to create homework:', error);
        return NextResponse.json(
            { error: 'Failed to create homework' },
            { status: 500 }
        );
    }
}
