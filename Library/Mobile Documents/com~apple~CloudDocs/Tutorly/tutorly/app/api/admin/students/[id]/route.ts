import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: Get single student details
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

        const student = await prisma.users.findUnique({
            where: { id, role: 'STUDENT' },
            include: {
                subscriptions: {
                    orderBy: { createdAt: 'desc' },
                    take: 1
                },
                homeworkSubmissions: {
                    include: { homework: true },
                    orderBy: { submittedAt: 'desc' },
                    take: 10
                },
                testSubmissions: {
                    include: { test: true },
                    orderBy: { submittedAt: 'desc' },
                    take: 10
                },
                live_sessions: {
                    orderBy: { scheduledAt: 'desc' },
                    take: 10
                }
            }
        });

        if (!student) {
            return NextResponse.json(
                { error: 'Student not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ student });
    } catch (error) {
        console.error('Failed to fetch student:', error);
        return NextResponse.json(
            { error: 'Failed to fetch student' },
            { status: 500 }
        );
    }
}

// PATCH: Update student
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
        const { name, email, year, ageGroup, onboarded } = body;

        const student = await prisma.users.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(email !== undefined && { email }),
                ...(year !== undefined && { year }),
                ...(ageGroup !== undefined && { ageGroup }),
                ...(onboarded !== undefined && { onboarded }),
            }
        });

        return NextResponse.json({ student });
    } catch (error) {
        console.error('Failed to update student:', error);
        return NextResponse.json(
            { error: 'Failed to update student' },
            { status: 500 }
        );
    }
}

// DELETE: Delete student
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

        await prisma.users.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete student:', error);
        return NextResponse.json(
            { error: 'Failed to delete student' },
            { status: 500 }
        );
    }
}
