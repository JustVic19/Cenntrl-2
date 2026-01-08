import { NextResponse } from 'next/server';
import { requireAdminOrTutor } from '@/lib/admin-auth';
import prisma from '@/lib/prisma';

// GET: Get single homework with submissions
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

        const homework = await prisma.homework.findUnique({
            where: { id },
            include: {
                creator: {
                    select: { name: true, email: true }
                },
                submissions: {
                    include: {
                        student: {
                            select: { id: true, name: true, email: true, year: true }
                        }
                    },
                    orderBy: { submittedAt: 'desc' }
                }
            }
        });

        if (!homework) {
            return NextResponse.json(
                { error: 'Homework not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ homework });
    } catch (error) {
        console.error('Failed to fetch homework:', error);
        return NextResponse.json(
            { error: 'Failed to fetch homework' },
            { status: 500 }
        );
    }
}

// PATCH: Update homework
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
        const { title, description, fileUrl, fileType, dueDate, assignedTo, yearGroup } = body;

        const homework = await prisma.homework.update({
            where: { id },
            data: {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(fileUrl !== undefined && { fileUrl }),
                ...(fileType !== undefined && { fileType }),
                ...(dueDate !== undefined && { dueDate: dueDate ? new Date(dueDate) : null }),
                ...(assignedTo !== undefined && { assignedTo }),
                ...(yearGroup !== undefined && { yearGroup }),
            }
        });

        return NextResponse.json({ homework });
    } catch (error) {
        console.error('Failed to update homework:', error);
        return NextResponse.json(
            { error: 'Failed to update homework' },
            { status: 500 }
        );
    }
}

// DELETE: Delete homework
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

        await prisma.homework.delete({
            where: { id }
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Failed to delete homework:', error);
        return NextResponse.json(
            { error: 'Failed to delete homework' },
            { status: 500 }
        );
    }
}
