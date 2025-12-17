'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function DashboardPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [dashboardData, setDashboardData] = useState<any>(null);
    const [sessionsData, setSessionsData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const ageGroup = session?.user?.ageGroup || 'years_4_plus';
    const isYoung = ageGroup === 'years_1_4';

    // Fetch dashboard data
    useEffect(() => {
        if (session?.user?.id) {
            Promise.all([
                fetch('/api/user/dashboard').then(res => res.json()),
                fetch('/api/user/sessions').then(res => res.json())
            ]).then(([dash, sess]) => {
                setDashboardData(dash);
                setSessionsData(sess);
                setLoading(false);
            }).catch(err => {
                console.error('Failed to fetch data:', err);
                setLoading(false);
            });
        }
    }, [session]);

    // Redirect if not authenticated
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/signin');
        }
    }, [status, router]);

    if (status === 'loading') {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
        }}>
            {/* Hero Section */}
            <div style={{
                marginBottom: 'var(--spacing-2xl)',
                padding: 'var(--spacing-2xl)',
                background: isYoung ? 'linear-gradient(135deg, #FFE5F1 0%, #FFF5CC 100%)' : 'linear-gradient(135deg, var(--color-light-blue) 0%, var(--color-light-beige) 100%)',
                border: '4px solid var(--color-gray-900)',
                borderRadius: 'var(--border-radius-lg)',
                boxShadow: '8px 8px 0 var(--color-gray-900)'
            }}>
                <h1 style={{
                    fontSize: isYoung ? 'var(--font-size-4xl)' : 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-gray-900)'
                }}>
                    {isYoung ? `👋 Welcome back, ${session.user.name}!` : `Welcome back, ${session.user.name}!`}
                </h1>
                <p style={{
                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                    color: 'var(--color-gray-700)'
                }}>
                    {isYoung ? "You're doing great! Keep learning! 🌟" : "Ready to continue your learning journey?"}
                </p>
            </div>

            {/* Quick Stats */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                <Card style={{
                    padding: 'var(--spacing-xl)',
                    textAlign: 'center',
                    background: isYoung ? '#FFE5F1' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: '4px solid var(--color-gray-900)'
                }}>
                    <div style={{ fontSize: isYoung ? '48px' : '36px', marginBottom: 'var(--spacing-sm)' }}>
                        📚
                    </div>
                    <h3 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-xs)',
                        color: isYoung ? 'var(--color-royal-blue)' : 'white'
                    }}>
                        {loading ? '...' : (dashboardData?.courses?.length || 0)}
                    </h3>
                    <p style={{
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        color: isYoung ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.9)',
                        fontWeight: 'var(--font-weight-semibold)'
                    }}>
                        Active Courses
                    </p>
                </Card>

                <Card style={{
                    padding: 'var(--spacing-xl)',
                    textAlign: 'center',
                    background: isYoung ? '#FFF5CC' : 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                    border: '4px solid var(--color-gray-900)'
                }}>
                    <div style={{ fontSize: isYoung ? '48px' : '36px', marginBottom: 'var(--spacing-sm)' }}>
                        ⏰
                    </div>
                    <h3 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-xs)',
                        color: isYoung ? 'var(--color-royal-blue)' : 'white'
                    }}>
                        Today
                    </h3>
                    <p style={{
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        color: isYoung ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.9)',
                        fontWeight: 'var(--font-weight-semibold)'
                    }}>
                        {loading ? 'Loading...' : (sessionsData?.nextSession ?
                            `Next: ${new Date(sessionsData.nextSession.scheduledAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` :
                            'No sessions scheduled'
                        )}
                    </p>
                </Card>

                <Card style={{
                    padding: 'var(--spacing-xl)',
                    textAlign: 'center',
                    background: isYoung ? '#E5F1FF' : 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                    border: '4px solid var(--color-gray-900)'
                }}>
                    <div style={{ fontSize: isYoung ? '48px' : '36px', marginBottom: 'var(--spacing-sm)' }}>
                        🏆
                    </div>
                    <h3 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-xs)',
                        color: isYoung ? 'var(--color-royal-blue)' : 'white'
                    }}>
                        0
                    </h3>
                    <p style={{
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        color: isYoung ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.9)',
                        fontWeight: 'var(--font-weight-semibold)'
                    }}>
                        Badges Earned
                    </p>
                </Card>

                <Card style={{
                    padding: 'var(--spacing-xl)',
                    textAlign: 'center',
                    background: isYoung ? '#E5FFE5' : 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
                    border: '4px solid var(--color-gray-900)'
                }}>
                    <div style={{ fontSize: isYoung ? '48px' : '36px', marginBottom: 'var(--spacing-sm)' }}>
                        🔥
                    </div>
                    <h3 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-xs)',
                        color: isYoung ? 'var(--color-royal-blue)' : 'white'
                    }}>
                        0 days
                    </h3>
                    <p style={{
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        color: isYoung ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.9)',
                        fontWeight: 'var(--font-weight-semibold)'
                    }}>
                        Learning Streak
                    </p>
                </Card>
            </div>

            {/* My Courses Section */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    <h2 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        color: 'var(--color-gray-900)'
                    }}>
                        {isYoung ? '📚 My Courses' : 'My Courses'}
                    </h2>
                    <Button variant="outline" size="md" href="/dashboard/courses">
                        View All →
                    </Button>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 'var(--spacing-lg)'
                }}>
                    {loading ? (
                        <p>Loading courses...</p>
                    ) : dashboardData?.courses?.length > 0 ? (
                        dashboardData.courses.slice(0, 3).map((course: any) => (
                            <Card key={course.id} style={{ padding: 'var(--spacing-xl)' }}>
                                <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-md)' }}>
                                    {course.subject === 'Maths' ? '🧮' : course.subject === 'English' ? '📖' : '🔬'}
                                </div>
                                <h3 style={{
                                    fontSize: 'var(--font-size-xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    marginBottom: 'var(--spacing-sm)',
                                    color: 'var(--color-royal-blue)'
                                }}>
                                    {course.name}
                                </h3>
                                <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-gray-600)',
                                        marginBottom: 'var(--spacing-xs)'
                                    }}>
                                        Progress: {course.progress}%
                                    </p>
                                    <div style={{
                                        height: '12px',
                                        background: 'var(--color-gray-200)',
                                        border: '2px solid var(--color-gray-900)',
                                        borderRadius: 'var(--border-radius-sm)',
                                        overflow: 'hidden'
                                    }}>
                                        <div style={{
                                            width: `${course.progress}%`,
                                            height: '100%',
                                            background: 'var(--color-bright-yellow)'
                                        }} />
                                    </div>
                                </div>
                                <Button variant="primary" size="sm" style={{ width: '100%' }}>
                                    Continue Learning →
                                </Button>
                            </Card>
                        ))
                    ) : (
                        <Card style={{ padding: 'var(--spacing-xl)' }}>
                            <p style={{ textAlign: 'center', color: 'var(--color-gray-600)' }}>
                                No courses enrolled yet. Complete your payment to get started!
                            </p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Next Session */}
            {sessionsData?.nextSession && (
                <Card style={{
                    padding: 'var(--spacing-2xl)',
                    background: isYoung ? '#E5F1FF' : 'var(--color-light-blue)'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                        <div style={{ fontSize: '64px' }}>⏰</div>
                        <div style={{ flex: 1 }}>
                            <h3 style={{
                                fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                                fontWeight: 'var(--font-weight-black)',
                                marginBottom: 'var(--spacing-sm)',
                                color: 'var(--color-gray-900)'
                            }}>
                                Next Session: {sessionsData.nextSession.courseName}
                            </h3>
                            <p style={{
                                fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                color: 'var(--color-gray-700)',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                {new Date(sessionsData.nextSession.scheduledAt).toLocaleString()}
                            </p>
                            {sessionsData.nextSession.meetingLink ? (
                                <Button variant="royal" size="lg" href={sessionsData.nextSession.meetingLink} target="_blank">
                                    Join Session →
                                </Button>
                            ) : (
                                <Button variant="royal" size="lg" disabled>
                                    Meeting link will be available soon
                                </Button>
                            )}
                        </div>
                    </div>
                </Card>
            )}
        </div>
    );
}
