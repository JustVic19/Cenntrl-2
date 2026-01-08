'use client';

import { useSession, signOut } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ProfilePage() {
    const { data: session, update } = useSession();
    const [subscriptionData, setSubscriptionData] = useState<any>(null);
    const [loadingSubscription, setLoadingSubscription] = useState(true);
    const ageGroup = session?.user?.ageGroup || 'years_4_plus';
    const isYoung = ageGroup === 'years_1_4';

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: session?.user?.name || '',
        username: session?.user?.username || '',
        year: session?.user?.year || '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    // Fetch subscription data
    useEffect(() => {
        if (session?.user?.id) {
            fetch('/api/user/dashboard')
                .then(res => res.json())
                .then(data => {
                    setSubscriptionData(data);
                    setLoadingSubscription(false);
                })
                .catch(err => {
                    console.error('Failed to fetch subscription:', err);
                    setLoadingSubscription(false);
                });
        }
    }, [session]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSave = async () => {
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update profile');
            }

            // Update session
            await update({
                user: {
                    ...session?.user,
                    ...formData,
                },
            });

            setMessage('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            setMessage('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: session?.user?.name || '',
            username: session?.user?.username || '',
            year: session?.user?.year || '',
        });
        setIsEditing(false);
        setMessage('');
    };

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: isYoung ? 'var(--font-size-4xl)' : 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-gray-900)'
                }}>
                    {isYoung ? '👤 My Profile' : 'My Profile'}
                </h1>
                <p style={{
                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                    color: 'var(--color-gray-700)'
                }}>
                    {isYoung ? 'All about you! ✨' : 'Manage your account settings'}
                </p>
            </div>

            {/* Success/Error Message */}
            {message && (
                <div style={{
                    padding: 'var(--spacing-md)',
                    marginBottom: 'var(--spacing-lg)',
                    background: message.includes('success') ? '#e5ffe5' : '#fee',
                    border: `3px solid ${message.includes('success') ? '#5c5' : '#f88'}`,
                    borderRadius: 'var(--border-radius-md)',
                    color: message.includes('success') ? '#060' : '#c00'
                }}>
                    {message}
                </div>
            )}

            {/* Profile Information */}
            <Card style={{
                padding: 'var(--spacing-2xl)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{
                        fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-black)',
                        color: 'var(--color-gray-900)'
                    }}>
                        Personal Information
                    </h2>
                    {!isEditing && (
                        <Button
                            variant="outline"
                            size="md"
                            onClick={() => setIsEditing(true)}
                        >
                            ✏️ Edit
                        </Button>
                    )}
                </div>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                }}>
                    {/* Name */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Full Name
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="input"
                                disabled={loading}
                            />
                        ) : (
                            <p style={{
                                fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                color: 'var(--color-gray-900)'
                            }}>
                                {session?.user?.name || 'Not set'}
                            </p>
                        )}
                    </div>

                    {/* Username */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Username
                        </label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                className="input"
                                disabled={loading}
                                pattern="[a-zA-Z0-9_]{3,20}"
                            />
                        ) : (
                            <p style={{
                                fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                color: 'var(--color-gray-900)'
                            }}>
                                {session?.user?.username || 'Not set'}
                            </p>
                        )}
                    </div>

                    {/* Year */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Year Group
                        </label>
                        {isEditing ? (
                            <select
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="input"
                                disabled={loading}
                                style={{ cursor: 'pointer' }}
                            >
                                <option value="">Select your year...</option>
                                {Array.from({ length: 13 }, (_, i) => (
                                    <option key={i + 1} value={`Year ${i + 1}`}>Year {i + 1}</option>
                                ))}
                            </select>
                        ) : (
                            <p style={{
                                fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                color: 'var(--color-gray-900)'
                            }}>
                                {session?.user?.year || 'Not set'}
                            </p>
                        )}
                    </div>

                    {/* Email (read-only) */}
                    <div>
                        <label style={{
                            display: 'block',
                            marginBottom: 'var(--spacing-sm)',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                            color: 'var(--color-gray-800)'
                        }}>
                            Email
                        </label>
                        <p style={{
                            fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                            color: 'var(--color-gray-600)'
                        }}>
                            {session?.user?.email}
                        </p>
                        <p style={{
                            fontSize: 'var(--font-size-xs)',
                            color: 'var(--color-gray-500)',
                            marginTop: 'var(--spacing-xs)'
                        }}>
                            Email cannot be changed
                        </p>
                    </div>

                    {/* Action Buttons (when editing) */}
                    {isEditing && (
                        <div style={{
                            display: 'flex',
                            gap: 'var(--spacing-md)',
                            marginTop: 'var(--spacing-lg)'
                        }}>
                            <Button
                                variant="primary"
                                size="lg"
                                onClick={handleSave}
                                disabled={loading}
                                style={{ flex: 1 }}
                            >
                                {loading ? 'Saving...' : 'Save Changes'}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                onClick={handleCancel}
                                disabled={loading}
                                style={{ flex: 1 }}
                            >
                                Cancel
                            </Button>
                        </div>
                    )}
                </div>
            </Card>

            {/* Subscription Info */}
            <Card style={{
                padding: 'var(--spacing-2xl)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <h2 style={{
                    fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--color-gray-900)'
                }}>
                    Subscription
                </h2>

                {loadingSubscription ? (
                    <p style={{ textAlign: 'center', color: 'var(--color-gray-600)' }}>Loading subscription...</p>
                ) : subscriptionData?.hasSubscription ? (
                    <>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 'var(--spacing-md)'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    Plan:
                                </span>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-royal-blue)'
                                }}>
                                    {subscriptionData.subscription.plan}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    Status:
                                </span>
                                <span style={{
                                    padding: 'var(--spacing-xs) var(--spacing-md)',
                                    background: subscriptionData.subscription.status === 'active' ? 'var(--color-mint-green)' : 'var(--color-gray-200)',
                                    border: '2px solid var(--color-gray-900)',
                                    borderRadius: 'var(--border-radius-sm)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-gray-900)'
                                }}>
                                    {subscriptionData.subscription.status === 'active' ? '✓ Active' : subscriptionData.subscription.status}
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    Monthly Cost:
                                </span>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-gray-900)'
                                }}>
                                    £{subscriptionData.subscription.monthlyAmount}/month
                                </span>
                            </div>

                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    Courses:
                                </span>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                    color: 'var(--color-gray-600)'
                                }}>
                                    {subscriptionData.subscription.courses.join(', ')}
                                </span>
                            </div>
                        </div>

                        <Button
                            variant="outline"
                            size="md"
                            style={{ width: '100%', marginTop: 'var(--spacing-lg)' }}
                        >
                            Manage Subscription
                        </Button>
                    </>
                ) : (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                        <p style={{
                            fontSize: 'var(--font-size-lg)',
                            color: 'var(--color-gray-600)',
                            marginBottom: 'var(--spacing-lg)'
                        }}>
                            No active subscription
                        </p>
                        <Button variant="primary" size="lg" href="/contact">
                            Browse Plans
                        </Button>
                    </div>
                )}
            </Card>

            {/* Danger Zone */}
            <Card style={{
                padding: 'var(--spacing-2xl)',
                border: '3px solid var(--color-coral-pink)'
            }}>
                <h2 style={{
                    fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-md)',
                    color: '#c00'
                }}>
                    Account Actions
                </h2>
                <p style={{
                    fontSize: 'var(--font-size-base)',
                    color: 'var(--color-gray-700)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    Need to take a break or have a question? Talk to your parent or contact us.
                </p>
                <Button
                    variant="outline"
                    size="md"
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                        borderColor: '#c00',
                        color: '#c00'
                    }}
                >
                    Sign Out
                </Button>
            </Card>
        </div>
    );
}
