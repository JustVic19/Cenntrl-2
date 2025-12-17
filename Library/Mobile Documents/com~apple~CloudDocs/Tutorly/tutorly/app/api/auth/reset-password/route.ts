import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    try {
        const { token, password } = await request.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: 'Token and password are required' },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { error: 'Password must be at least 8 characters' },
                { status: 400 }
            );
        }

        // Find and verify token
        const verificationToken = await prisma.verification_tokens.findUnique({
            where: { token },
        });

        if (!verificationToken) {
            return NextResponse.json(
                { error: 'Invalid or expired reset link' },
                { status: 400 }
            );
        }

        if (new Date() > verificationToken.expires) {
            await prisma.verification_tokens.delete({
                where: { token },
            });

            return NextResponse.json(
                { error: 'Reset link has expired' },
                { status: 400 }
            );
        }

        const email = verificationToken.identifier;

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Update user password
        await prisma.users.update({
            where: { email },
            data: { password: hashedPassword },
        });

        // Delete used token
        await prisma.verification_tokens.delete({
            where: { token },
        });

        return NextResponse.json({
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.error('Password reset error:', error);
        return NextResponse.json(
            { error: 'Failed to reset password' },
            { status: 500 }
        );
    }
}
