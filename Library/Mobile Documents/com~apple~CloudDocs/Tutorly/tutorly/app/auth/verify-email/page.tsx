'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!token) {
            setError('Missing verification token');
            setLoading(false);
            return;
        }

        // Verify the email
        fetch(`/api/auth/verify-email?token=${token}`, { method: 'POST' })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    setSuccess(true);
                    // Redirect to dashboard after 3 seconds
                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 3000);
                } else {
                    setError(data.error || 'Verification failed');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Something went wrong');
                setLoading(false);
            });
    }, [token, router]);

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-light-beige)',
            padding: 'var(--spacing-lg)'
        }}>
            <Card style={{
                maxWidth: '500px',
                width: '100%',
                padding: 'var(--spacing-2xl)',
                textAlign: 'center'
            }}>
                {loading && (
                    <>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>⏳</div>
                        <h1 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: 'var(--font-weight-black)',
                            marginBottom: 'var(--spacing-sm)',
                            color: 'var(--color-gray-900)'
                        }}>
                            Verifying Your Email...
                        </h1>
                        <p style={{ color: 'var(--color-gray-700)' }}>
                            Please wait while we verify your email address.
                        </p>
                    </>
                )}

                {success && (
                    <>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>✅</div>
                        <h1 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: 'var(--font-weight-black)',
                            marginBottom: 'var(--spacing-sm)',
                            color: 'var(--color-mint-green)'
                        }}>
                            Email Verified!
                        </h1>
                        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-700)' }}>
                            Your email has been successfully verified. Redirecting to dashboard...
                        </p>
                    </>
                )}

                {error && !loading && (
                    <>
                        <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>❌</div>
                        <h1 style={{
                            fontSize: 'var(--font-size-3xl)',
                            fontWeight: 'var(--font-weight-black)',
                            marginBottom: 'var(--spacing-sm)',
                            color: '#c00'
                        }}>
                            Verification Failed
                        </h1>
                        <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-700)' }}>
                            {error}
                        </p>
                        <Button variant="primary" size="lg" href="/dashboard">
                            Go to Dashboard
                        </Button>
                    </>
                )}
            </Card>
        </div>
    );
}
