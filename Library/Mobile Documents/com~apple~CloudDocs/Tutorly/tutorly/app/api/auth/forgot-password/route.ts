import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/tokens';
import { sendPasswordResetEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
    try {
        const { email } = await request.json();

        if (!email) {
            return NextResponse.json(
                { error: 'Email is required' },
                { status: 400 }
            );
        }

        // Find user
        const user = await prisma.users.findUnique({
            where: { email },
        });

        // Always return success (don't reveal if email exists)
        // But only send email if user exists
        if (user) {
            // Create reset token
            const token = generateToken();
            const expiresAt = new Date();
            expiresAt.setHours(expiresAt.getHours() + 1); // 1 hour

            await prisma.verification_tokens.create({
                data: {
                    identifier: email,
                    token,
                    expires: expiresAt,
                },
            });

            // Send reset email
            const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password?token=${token}`;

            try {
                await sendPasswordResetEmail({
                    email,
                    name: user.name || 'Student',
                    resetUrl,
                });
                console.log('Password reset email sent to:', email);
            } catch (emailError) {
                console.error('Failed to send password reset email:', emailError);
            }
        }

        return NextResponse.json({
            message: 'If an account exists with that email, we sent a password reset link',
        });
    } catch (error) {
        console.error('Forgot password error:', error);
        return NextResponse.json(
            { error: 'Failed to process request' },
            { status: 500 }
        );
    }
}
