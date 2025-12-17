'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function EnrollSuccessPage() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading state
        if (sessionId) {
            setTimeout(() => setLoading(false), 1000);
        } else {
            setLoading(false);
        }
    }, [sessionId]);

    if (loading) {
        return (
            <div className="section">
                <div className="container text-center">
                    <h2>Processing your enrollment...</h2>
                </div>
            </div>
        );
    }

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="text-center mb-2xl">
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>🎉</div>
                    <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Welcome to Tutorly!
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-gray-700)' }}>
                        Your subscription has been successfully created.
                    </p>
                </div>

                <Card style={{ marginBottom: 'var(--spacing-xl)', background: 'var(--color-green-50)', borderColor: 'var(--color-green-500)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)', color: 'var(--color-green-700)' }}>
                        ✓ Payment Confirmed
                    </h3>
                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                        Your payment has been processed successfully. You'll receive a confirmation email shortly with your subscription details.
                    </p>
                </Card>

                <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>What's Next?</h3>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: 'var(--font-size-2xl)' }}>🎓</div>
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Set Up Your Student Account</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-sm)' }}>
                                    Check your email for a welcome message with a link to create your student account. This will give your child access to:
                                </p>
                                <ul style={{ marginLeft: 'var(--spacing-lg)', color: 'var(--color-gray-700)' }}>
                                    <li>Personalized dashboard</li>
                                    <li>Course materials and progress tracking</li>
                                    <li>Session schedule and recordings</li>
                                    <li>Interactive learning tools</li>
                                </ul>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: 'var(--font-size-2xl)' }}>📧</div>
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Check Your Email</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                    Look for an email from Tutorly with the subject "Welcome to Tutorly - Set Up Your Account". If you don't see it, check your spam folder.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: 'var(--font-size-2xl)' }}>📅</div>
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Schedule Your First Session</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                    I'll contact you within 24 hours to schedule your first session and answer any questions.
                                </p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                            <div style={{ fontSize: 'var(--font-size-2xl)' }}>💬</div>
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Get in Touch</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                    Have questions? Feel free to reach out via email or WhatsApp anytime.
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="primary" size="lg" href="/">
                        Back to Home
                    </Button>
                    <Button variant="outline" size="lg" href="/contact">
                        Contact Me
                    </Button>
                </div>
            </div>
        </div>
    );
}
