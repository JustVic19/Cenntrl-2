import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json(
            { valid: false, error: 'Token is required' },
            { status: 400 }
        );
    }

    try {
        // Find the token
        const verificationToken = await prisma.verification_tokens.findUnique({
            where: { token },
        });

        if (!verificationToken) {
            return NextResponse.json(
                { valid: false, error: 'Invalid token' },
                { status: 400 }
            );
        }

        // Check if token is expired
        if (new Date() > verificationToken.expires) {
            // Delete expired token
            await prisma.verification_tokens.delete({
                where: { token },
            });

            return NextResponse.json(
                { valid: false, error: 'Token has expired' },
                { status: 400 }
            );
        }

        // Get subscription info for this email
        const subscription = await prisma.subscriptions.findFirst({
            where: { studentEmail: verificationToken.identifier },
            orderBy: { createdAt: 'desc' },
        });

        return NextResponse.json({
            valid: true,
            email: verificationToken.identifier,
            name: subscription?.studentName || '',
        });
    } catch (error) {
        console.error('Token verification error:', error);
        return NextResponse.json(
            { valid: false, error: 'Failed to verify token' },
            { status: 500 }
        );
    }
}
