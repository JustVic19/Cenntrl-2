import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
    try {
        const { name, email, password } = await request.json();

        // Validation
        if (!name || !email || !password) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await prisma.users.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: 'STUDENT',
                onboarded: false,
            },
        });

        // Create verification token
        const { generateToken } = await import('@/lib/tokens');
        const { sendVerificationEmail } = await import('@/lib/email');

        const token = generateToken();
        const expiresAt = new Date();
        expiresAt.setHours(expiresAt.getHours() + 24); // 24 hours

        await prisma.verification_tokens.create({
            data: {
                identifier: email,
                token: token,
                expires: expiresAt,
            },
        });

        // Send verification email
        const verificationUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/verify-email?token=${token}`;

        try {
            await sendVerificationEmail({
                email,
                name,
                verificationUrl,
            });
            console.log('Verification email sent to:', email);
        } catch (emailError) {
            console.error('Failed to send verification email:', emailError);
            // Continue anyway - user can resend later
        }

        // Auto-login after registration
        return NextResponse.json({
            message: 'Account created successfully',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json(
            { error: 'Failed to create account' },
            { status: 500 }
        );
    }
}
