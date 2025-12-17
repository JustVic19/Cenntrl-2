'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import bcrypt from 'bcryptjs';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function SignUpPage() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

        // Validation
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
            // Create account via API
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create account');
            }

            // Auto sign in after registration
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

    const handleGoogleSignUp = () => {
        signIn('google', { callbackUrl: '/onboarding' });
    };

    const handleAppleSignUp = () => {
        signIn('apple', { callbackUrl: '/onboarding' });
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
                maxWidth: '450px',
                width: '100%',
                padding: 'var(--spacing-2xl)'
            }}>
                <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-2xl)' }}>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-royal-blue)'
                    }}>
                        Join Tutorly! 🎉
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-gray-700)'
                    }}>
                        Create your account to start learning
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

                {/* Social Sign Up */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleGoogleSignUp}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-sm)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M19.6 10.23c0-.82-.07-1.43-.21-2.05H10v3.71h5.51c-.11.95-.71 2.37-2.03 3.33l-.02.12 2.95 2.29.2.02c1.88-1.73 2.97-4.28 2.97-7.42z" fill="#4285F4" />
                            <path d="M10 20c2.7 0 4.96-.89 6.62-2.42l-3.15-2.43c-.84.58-1.96 1-3.47 1a6.02 6.02 0 01-5.69-4.17l-.12.01-3.07 2.37-.04.11A10 10 0 0010 20z" fill="#34A853" />
                            <path d="M4.31 11.98A6.11 6.11 0 014 10c0-.69.12-1.35.31-1.98l-.01-.12L1.21 5.5l-.11.05A10 10 0 000 10c0 1.61.39 3.13 1.1 4.48l3.21-2.5z" fill="#FBBC05" />
                            <path d="M10 3.85c1.79 0 3 .77 3.69 1.42l2.69-2.62C14.95 1.19 12.7 0 10 0 6.09 0 2.71 2.24 1.1 5.5l3.2 2.5A6.02 6.02 0 0110 3.85z" fill="#EB4335" />
                        </svg>
                        Sign up with Google
                    </Button>

                    <Button
                        variant="outline"
                        size="lg"
                        onClick={handleAppleSignUp}
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-sm)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M15.5 10.28c-.02-2.02 1.64-2.99 1.72-3.04-1.01-1.42-2.56-1.61-3.07-1.63-1.3-.13-2.55.76-3.21.76-.66 0-1.68-.75-2.76-.73-1.42.02-2.74.83-3.47 2.11-1.48 2.57-.38 6.37.94 8.46.65.97 1.44 2.07 2.48 2.03.99-.04 1.36-.64 2.56-.64 1.19 0 1.53.64 2.74.62 1.14-.02 1.76-.99 2.41-1.97.76-1.12 1.07-2.2 1.08-2.26-.02-.01-2.07-.79-2.09-3.14l.01.01z" />
                            <path d="M13.09 2.77C13.64 2.11 14.02 1.23 13.91.3c-.77.03-1.7.52-2.26 1.17-.5.57-.93 1.5-.82 2.38.86.06 1.75-.43 2.26-1.08z" />
                        </svg>
                        Sign up with Apple
                    </Button>
                </div>

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    margin: 'var(--spacing-xl) 0',
                    gap: 'var(--spacing-md)'
                }}>
                    <div style={{ flex: 1, height: '2px', background: 'var(--color-gray-300)' }} />
                    <span style={{ color: 'var(--color-gray-500)', fontSize: 'var(--font-size-sm)' }}>OR</span>
                    <div style={{ flex: 1, height: '2px', background: 'var(--color-gray-300)' }} />
                </div>

                {/* Email/Password Form */}
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
                            Your Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="Emma Smith"
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
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="your@email.com"
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
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            minLength={8}
                            className="input"
                            placeholder="••••••••"
                            disabled={loading}
                        />
                        <p style={{
                            marginTop: 'var(--spacing-xs)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-gray-600)'
                        }}>
                            At least 8 characters
                        </p>
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
                            placeholder="••••••••"
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
                        {loading ? 'Creating account...' : 'Create Account'}
                    </Button>
                </form>

                <div style={{
                    marginTop: 'var(--spacing-xl)',
                    textAlign: 'center',
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-gray-700)'
                }}>
                    Already have an account?{' '}
                    <Link
                        href="/auth/signin"
                        style={{
                            color: 'var(--color-royal-blue)',
                            fontWeight: 'var(--font-weight-semibold)',
                            textDecoration: 'none'
                        }}
                    >
                        Sign in
                    </Link>
                </div>

                <div style={{
                    marginTop: 'var(--spacing-md)',
                    textAlign: 'center'
                }}>
                    <Link
                        href="/"
                        style={{
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-gray-600)',
                            textDecoration: 'none'
                        }}
                    >
                        ← Back to home
                    </Link>
                </div>
            </Card>
        </div>
    );
}
