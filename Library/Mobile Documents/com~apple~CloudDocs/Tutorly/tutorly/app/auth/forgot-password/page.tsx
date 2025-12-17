'use client';

import { useState } from 'react';
import Link from 'next/link';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess(true);
                setEmail('');
            } else {
                setError(data.error || 'Something went wrong');
            }
        } catch (err) {
            setError('Failed to send reset email');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 'var(--spacing-lg)',
            background: 'var(--color-light-beige)'
        }}>
            <Card style={{
                maxWidth: '500px',
                width: '100%',
                padding: 'var(--spacing-2xl)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>🔐</div>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-royal-blue)'
                    }}>
                        Forgot Password?
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-gray-700)'
                    }}>
                        Enter your email and we'll send you a reset link
                    </p>
                </div>

                {success && (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-lg)',
                        background: '#e5ffe5',
                        border: '3px solid #5c5',
                        borderRadius: 'var(--border-radius-md)',
                        color: '#060'
                    }}>
                        ✓ If an account exists with that email, we've sent a password reset link.
                    </div>
                )}

                {error && (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        marginBottom: 'var(--spacing-lg)',
                        background: '#fee',
                        border: '3px solid #f88',
                        borderRadius: 'var(--border-radius-md)',
                        color: '#c00'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="input"
                            placeholder="your@email.com"
                            disabled={loading || success}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading || success}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Sending...' : 'Send Reset Link'}
                    </Button>
                </form>

                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    textAlign: 'center',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-gray-600)'
                }}>
                    Remember your password?{' '}
                    <Link href="/auth/signin" style={{
                        color: 'var(--color-royal-blue)',
                        fontWeight: 'var(--font-weight-semibold)',
                        textDecoration: 'none'
                    }}>
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    );
}
