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
                { error: 'Invalid or expired token' },
                { status: 400 }
            );
        }

        if (new Date() > verificationToken.expires) {
            await prisma.verification_tokens.delete({
                where: { token },
            });

            return NextResponse.json(
                { error: 'Setup link has expired' },
                { status: 400 }
            );
        }

        const email = verificationToken.identifier;

        // Check if user already exists
        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json(
                { error: 'Account already exists with this email' },
                { status: 400 }
            );
        }

        // Get subscription info
        const subscription = await prisma.subscriptions.findFirst({
            where: { studentEmail: email },
            orderBy: { createdAt: 'desc' },
        });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user account
        const user = await prisma.users.create({
            data: {
                email,
                name: subscription?.studentName || '',
                password: hashedPassword,
                role: 'STUDENT',
                onboarded: false,
                emailVerified: new Date(), // Mark as verified since they came from payment
            },
        });

        // Link subscription to user
        if (subscription) {
            await prisma.subscriptions.update({
                where: { id: subscription.id },
                data: { userId: user.id },
            });
        }

        // Delete the used token
        await prisma.verification_tokens.delete({
            where: { token },
        });

        return NextResponse.json({
            message: 'Account created successfully',
            userId: user.id,
        });
    } catch (error) {
        console.error('Account setup error:', error);
        return NextResponse.json(
            { error: 'Failed to create account' },
            { status: 500 }
        );
    }
}
