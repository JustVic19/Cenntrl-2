import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { getMonthlyPrice, isValidPlan, PlanType } from '@/lib/pricing';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { plan, courses, sessionsPerWeek, studentInfo } = body;

        // Validate inputs
        if (!plan || !isValidPlan(plan)) {
            return NextResponse.json(
                { error: 'Invalid plan selected' },
                { status: 400 }
            );
        }

        if (!courses || !Array.isArray(courses) || courses.length === 0) {
            return NextResponse.json(
                { error: 'Please select at least one course' },
                { status: 400 }
            );
        }

        if (!studentInfo?.name || !studentInfo?.email || !studentInfo?.year) {
            return NextResponse.json(
                { error: 'Student information is required' },
                { status: 400 }
            );
        }

        // Get flat monthly price
        const monthlyAmount = getMonthlyPrice(plan as PlanType);

        // Create Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'gbp',
                        product_data: {
                            name: `${plan === 'steady' ? 'Steady' : 'Focus'} Plan - Tutorly Subscription`,
                            description: `${plan === 'steady' ? 'Weekly 1-hour sessions' : 'Intensive 2-hour sessions'} - ${courses.length} course${courses.length > 1 ? 's' : ''}`,
                        },
                        unit_amount: monthlyAmount * 100, // Convert to pence
                        recurring: {
                            interval: 'month',
                        },
                    },
                    quantity: 1,
                },
            ],
            success_url: `${request.nextUrl.origin}/enroll/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${request.nextUrl.origin}/enroll/cancel`,
            customer_email: studentInfo.email,
            metadata: {
                plan,
                studentName: studentInfo.name,
                studentEmail: studentInfo.email,
                studentYear: studentInfo.year,
                courses: JSON.stringify(courses),
                sessionsPerWeek: sessionsPerWeek?.toString() || '1',
            },
        });

        return NextResponse.json({ url: session.url }, { status: 200 });
    } catch (error) {
        console.error('Stripe checkout error:', error);
        return NextResponse.json(
            { error: 'Failed to create checkout session' },
            { status: 500 }
        );
    }
}
