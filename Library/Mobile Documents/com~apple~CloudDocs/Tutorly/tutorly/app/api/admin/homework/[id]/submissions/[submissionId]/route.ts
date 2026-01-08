import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// PATCH: Grade a submission
export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string; submissionId: string }> }
) {
    try {
        const { authorized, error } = await requireAdminOrTutor();

        if (!authorized) {
            return error;
        }

        const { submissionId } = await params;
        const body = await request.json();
        const { grade, feedback } = body;

        const submission = await prisma.homework_submissions.update({
            where: { id: submissionId },
            data: {
                grade,
                feedback,
                graded: true,
                gradedAt: new Date(),
            },
            include: {
                student: {
                    select: { name: true, email: true }
                },
                homework: {
                    select: { title: true }
                }
            }
        });

        // TODO: Send email notification to student about their grade

        return NextResponse.json({ submission });
    } catch (error) {
        console.error('Failed to grade submission:', error);
        return NextResponse.json(
            { error: 'Failed to grade submission' },
            { status: 500 }
        );
    }
}
