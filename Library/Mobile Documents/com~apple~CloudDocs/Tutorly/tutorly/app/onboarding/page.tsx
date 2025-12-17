'use client';

import { useState, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

export default function OnboardingPage() {
    const { data: session, update } = useSession();
    const router = useRouter();

    const [formData, setFormData] = useState({
        username: '',
        year: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Redirect if already onboarded
    useEffect(() => {
        if (session?.user?.onboarded) {
            router.push('/dashboard');
        }
    }, [session, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        // Determine age group based on year
        const yearNum = parseInt(formData.year.replace('Year ', ''));
        const ageGroup = yearNum <= 4 ? 'years_1_4' : 'years_4_plus';

        try {
            const response = await fetch('/api/user/onboarding', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    year: formData.year,
                    ageGroup,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to update profile');
            }

            // Update session
            await update({
                user: {
                    ...session?.user,
                    username: formData.username,
                    year: formData.year,
                    ageGroup,
                    onboarded: true,
                },
            });

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message || 'Something went wrong');
            setLoading(false);
        }
    };

    const handleSkip = () => {
        signOut({ callbackUrl: '/' });
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
                    <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>🎉</div>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-royal-blue)'
                    }}>
                        Welcome to Tutorly!
                    </h1>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-gray-700)'
                    }}>
                        Let's set up your profile to get started
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
                    gap: 'var(--spacing-xl)'
                }}>
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Choose a username 🎮
                        </label>
                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="input"
                            placeholder="coolstudent123"
                            disabled={loading}
                            pattern="[a-zA-Z0-9_]{3,20}"
                            title="Username must be 3-20 characters, letters, numbers, and underscores only"
                        />
                        <p style={{
                            marginTop: 'var(--spacing-xs)',
                            fontSize: 'var(--font-size-sm)',
                            color: 'var(--color-gray-600)'
                        }}>
                            This is how you'll be known on Tutorly
                        </p>
                    </div>

                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-gray-800)'
                        }}>
                            What year are you in? 📚
                        </label>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                            className="input"
                            disabled={loading}
                            style={{ cursor: 'pointer' }}
                        >
                            <option value="">Select your year...</option>
                            <option value="Year 1">Year 1</option>
                            <option value="Year 2">Year 2</option>
                            <option value="Year 3">Year 3</option>
                            <option value="Year 4">Year 4</option>
                            <option value="Year 5">Year 5</option>
                            <option value="Year 6">Year 6</option>
                            <option value="Year 7">Year 7</option>
                            <option value="Year 8">Year 8</option>
                            <option value="Year 9">Year 9</option>
                            <option value="Year 10">Year 10</option>
                            <option value="Year 11">Year 11</option>
                            <option value="Year 12">Year 12</option>
                            <option value="Year 13">Year 13</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            disabled={loading}
                            style={{ flex: 1 }}
                        >
                            {loading ? 'Setting up...' : 'Continue to Dashboard →'}
                        </Button>
                    </div>

                    <button
                        type="button"
                        onClick={handleSkip}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--color-gray-600)',
                            fontSize: 'var(--font-size-sm)',
                            cursor: 'pointer',
                            textDecoration: 'underline',
                            marginTop: 'var(--spacing-md)'
                        }}
                    >
                        I'll do this later
                    </button>
                </form>
            </Card>
        </div>
    );
}
