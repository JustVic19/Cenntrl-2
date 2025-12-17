import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { prisma } from '@/lib/prisma';

// Disable body parsing, need raw body for webhook signature verification
export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
    const body = await request.text();
    const headersList = await headers();
    const signature = headersList.get('stripe-signature');

    if (!signature) {
        return NextResponse.json(
            { error: 'Missing stripe-signature header' },
            { status: 400 }
        );
    }

    let event: Stripe.Event;

    try {
        // Verify webhook signature
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err) {
        console.error('Webhook signature verification failed:', err);
        return NextResponse.json(
            { error: 'Webhook signature verification failed' },
            { status: 400 }
        );
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                await handleCheckoutSessionCompleted(session);
                break;
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionUpdated(subscription);
                break;
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription;
                await handleSubscriptionDeleted(subscription);
                break;
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice;
                await handlePaymentFailed(invoice);
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return NextResponse.json({ received: true }, { status: 200 });
    } catch (error) {
        console.error('Webhook handler error:', error);
        return NextResponse.json(
            { error: 'Webhook handler failed' },
            { status: 500 }
        );
    }
}

async function handleCheckoutSessionCompleted(session: Stripe.Checkout.Session) {
    console.log('Processing checkout.session.completed:', session.id);

    // Get subscription ID from session
    const subscriptionId = session.subscription as string;

    if (!subscriptionId) {
        console.error('No subscription ID in checkout session');
        return;
    }

    // Get metadata from session
    const metadata = session.metadata || {};
    const plan = metadata.plan;
    const studentName = metadata.studentName;
    const studentEmail = metadata.studentEmail || session.customer_email;
    const studentYear = metadata.studentYear;
    const courses = metadata.courses ? JSON.parse(metadata.courses) : [];
    const sessionsPerWeek = metadata.sessionsPerWeek ? parseInt(metadata.sessionsPerWeek) : null;

    // Calculate amount from session
    const amountTotal = session.amount_total || 0;
    const monthlyAmount = amountTotal / 100; // Convert from pence to pounds

    try {
        // Check if user already exists with this email
        const existingUser = await prisma.users.findUnique({
            where: { email: studentEmail || '' },
        });

        // Create or update subscription in database
        const subscription = await prisma.subscriptions.upsert({
            where: {
                stripeSubscriptionId: subscriptionId,
            },
            update: {
                status: 'active',
                studentEmail: studentEmail || '',
                stripeCustomerId: session.customer as string,
                userId: existingUser?.id, // Link to user if exists
            },
            create: {
                plan: plan || 'steady',
                studentName: studentName || '',
                studentEmail: studentEmail || '',
                studentYear: studentYear || '',
                courses: courses,
                sessionsPerWeek: sessionsPerWeek,
                monthlyAmount: monthlyAmount,
                stripeCustomerId: session.customer as string,
                stripeSubscriptionId: subscriptionId,
                status: 'active',
                userId: existingUser?.id, // Link to user if exists
            },
        });

        console.log('Subscription saved to database:', subscriptionId);

        // If user doesn't exist, send welcome email with account setup link
        if (!existingUser && studentEmail) {
            const { generateToken } = await import('@/lib/tokens');
            const { sendWelcomeEmail } = await import('@/lib/email');

            // Create verification token for account setup
            const token = generateToken();
            const expiresAt = new Date();
            expiresAt.setDate(expiresAt.getDate() + 7); // 7 days to set up account

            await prisma.verification_tokens.create({
                data: {
                    identifier: studentEmail,
                    token: token,
                    expires: expiresAt,
                },
            });

            // Send welcome email with setup link
            const setupLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/setup?token=${token}`;

            await sendWelcomeEmail({
                email: studentEmail,
                studentName: studentName || 'Student',
                setupLink,
            });

            console.log('Welcome email sent to:', studentEmail);
        } else if (existingUser) {
            console.log('User already exists, subscription linked to:', existingUser.email);
        }
    } catch (error) {
        console.error('Failed to save subscription:', error);
        throw error;
    }
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
    console.log('Processing customer.subscription.updated:', subscription.id);

    try {
        await prisma.subscriptions.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                status: subscription.status,
            },
        });

        console.log('Subscription status updated:', subscription.id, subscription.status);
    } catch (error) {
        console.error('Failed to update subscription:', error);
        // Don't throw - subscription might not exist yet
    }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
    console.log('Processing customer.subscription.deleted:', subscription.id);

    try {
        await prisma.subscriptions.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                status: 'canceled',
            },
        });

        console.log('Subscription marked as canceled:', subscription.id);
    } catch (error) {
        console.error('Failed to cancel subscription:', error);
    }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
    console.log('Processing invoice.payment_failed:', invoice.id);

    const subscriptionId = invoice.subscription as string;

    if (!subscriptionId) {
        return;
    }

    try {
        await prisma.subscriptions.update({
            where: {
                stripeSubscriptionId: subscriptionId,
            },
            data: {
                status: 'past_due',
            },
        });

        console.log('Subscription marked as past_due:', subscriptionId);
    } catch (error) {
        console.error('Failed to update subscription payment status:', error);
    }
}
