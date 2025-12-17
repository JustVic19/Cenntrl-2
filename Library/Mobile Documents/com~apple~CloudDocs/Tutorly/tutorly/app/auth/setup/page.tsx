'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AccountSetupPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams?.get('token');

    const [formData, setFormData] = useState({
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [tokenValid, setTokenValid] = useState(false);

    useEffect(() => {
        if (!token) {
            setError('Invalid or missing setup link');
            setLoading(false);
            return;
        }

        // Verify token and get subscription info
        fetch(`/api/auth/verify-token?token=${token}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.valid) {
                    setTokenValid(true);
                    setFormData((prev) => ({
                        ...prev,
                        email: data.email || '',
                        name: data.name || '',
                    }));
                } else {
                    setError(data.error || 'Invalid or expired setup link');
                }
                setLoading(false);
            })
            .catch(() => {
                setError('Failed to verify setup link');
                setLoading(false);
            });
    }, [token]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        if (formData.password.length < 8) {
            setError('Password must be at least 8 characters');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/auth/setup-account', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    token,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create account');
            }

            // Auto sign in
            const result = await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                setError('Account created but sign-in failed. Please try signing in.');
                setLoading(false);
            } else {
                router.push('/onboarding');
            }
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setLoading(false);
        }
    };

    if (loading && !error) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-light-beige)'
            }}>
                <Card style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                    <p>Verifying your setup link...</p>
                </Card>
            </div>
        );
    }

    if (error && !tokenValid) {
        return (
            <div style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-light-beige)'
            }}>
                <Card style={{ padding: 'var(--spacing-2xl)', maxWidth: '500px' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-md)',
                        color: 'var(--color-gray-900)'
                    }}>
                        ⚠️ Invalid Link
                    </h1>
                    <p style={{ marginBottom: 'var(--spacing-lg)', color: 'var(--color-gray-700)' }}>
                        {error}
                    </p>
                    <Button variant="primary" size="lg" href="/auth/signin">
                        Go to Sign In
                    </Button>
                </Card>
            </div>
        );
    }

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
                    <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>🎓</div>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-royal-blue)'
                    }}>
                        Set Up Your Account
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-gray-700)'
                    }}>
                        Welcome to Tutorly! Create your password to get started.
                    </p>
                </div>

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
                            Name
                        </label>
                        <input
                            type="text"
                            value={formData.name}
                            disabled
                            className="input"
                            style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Email
                        </label>
                        <input
                            type="email"
                            value={formData.email}
                            disabled
                            className="input"
                            style={{ background: '#f5f5f5', cursor: 'not-allowed' }}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Create Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="input"
                            placeholder="Min. 8 characters"
                            disabled={loading}
                        />
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="Re-enter password"
                            disabled={loading}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading}
                        style={{ width: '100%' }}
                    >
                        {loading ? 'Creating Account...' : 'Create Account & Continue'}
                    </Button>
                </form>
            </Card>
        </div>
    );
}
