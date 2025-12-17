import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json(
            { success: false, error: 'Token is required' },
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
                { success: false, error: 'Invalid verification token' },
                { status: 400 }
            );
        }

        // Check if expired
        if (new Date() > verificationToken.expires) {
            await prisma.verification_tokens.delete({
                where: { token },
            });

            return NextResponse.json(
                { success: false, error: 'Verification link has expired' },
                { status: 400 }
            );
        }

        // Update user emailVerified
        const user = await prisma.users.update({
            where: { email: verificationToken.identifier },
            data: { emailVerified: new Date() },
        });

        // Delete used token
        await prisma.verification_tokens.delete({
            where: { token },
        });

        return NextResponse.json({
            success: true,
            message: 'Email verified successfully',
        });
    } catch (error) {
        console.error('Email verification error:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to verify email' },
            { status: 500 }
        );
    }
}
