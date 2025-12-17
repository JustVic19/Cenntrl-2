'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SchedulePage() {
    const { data: session } = useSession();
    const [sessions, setSessions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const ageGroup = session?.user?.ageGroup || 'years_4_plus';
    const isYoung = ageGroup === 'years_1_4';

    // Fetch sessions from API
    useEffect(() => {
        if (session?.user?.id) {
            fetch('/api/user/sessions')
                .then(res => res.json())
                .then(data => {
                    if (data.upcoming) {
                        setSessions(data.upcoming);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch sessions:', err);
                    setLoading(false);
                });
        }
    }, [session]);

    // Get current week dates
    const today = new Date();
    const currentDayOfWeek = today.getDay() || 7; // Make Sunday = 7
    const monday = new Date(today);
    monday.setDate(today.getDate() - currentDayOfWeek + 1);

    const getWeekDates = () => {
        return weekDays.map((_, index) => {
            const date = new Date(monday);
            date.setDate(monday.getDate() + index);
            return date;
        });
    };

    const weekDates = getWeekDates();
    const currentDay = weekDays[today.getDay() === 0 ? 6 : today.getDay() - 1];

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: isYoung ? 'var(--font-size-4xl)' : 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-gray-900)'
                }}>
                    {isYoung ? '📅 My Schedule' : 'My Schedule'}
                </h1>
                <p style={{
                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                    color: 'var(--color-gray-700)'
                }}>
                    {isYoung ? 'See when your lessons are! 🎯' : 'Your weekly tutoring sessions'}
                </p>
            </div>

            {/* Weekly Calendar */}
            <Card style={{
                padding: 'var(--spacing-xl)',
                marginBottom: 'var(--spacing-2xl)',
                overflow: 'auto'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(7, 1fr)',
                    gap: 'var(--spacing-md)',
                    minWidth: '800px'
                }}>
                    {weekDays.map((day, index) => {
                        const date = weekDates[index];
                        const isToday = day === currentDay;
                        // Match sessions to calendar days by date
                        const sessionsForDay = sessions.filter(s => {
                            const sessionDate = new Date(s.scheduledAt);
                            return sessionDate.toDateString() === date.toDateString();
                        });

                        return (
                            <div
                                key={day}
                                style={{
                                    padding: 'var(--spacing-md)',
                                    background: isToday
                                        ? (isYoung ? 'var(--color-bright-yellow)' : 'var(--color-light-blue)')
                                        : 'var(--color-light-beige)',
                                    border: isToday ? '3px solid var(--color-gray-900)' : '2px solid var(--color-gray-300)',
                                    borderRadius: 'var(--border-radius-md)',
                                    minHeight: '150px'
                                }}
                            >
                                {/* Day Header */}
                                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                                    <h3 style={{
                                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                        fontWeight: 'var(--font-weight-black)',
                                        color: 'var(--color-gray-900)',
                                        marginBottom: 'var(--spacing-xs)'
                                    }}>
                                        {isYoung ? day.substring(0, 3) : day}
                                    </h3>
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-gray-600)'
                                    }}>
                                        {date.getDate()}/{date.getMonth() + 1}
                                    </p>
                                </div>

                                {/* Sessions for this day */}
                                {sessionsForDay.map((s: any) => {
                                    const sessionTime = new Date(s.scheduledAt);
                                    return (
                                        <div
                                            key={s.id}
                                            style={{
                                                padding: 'var(--spacing-sm)',
                                                background: 'white',
                                                border: '2px solid var(--color-gray-900)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                marginBottom: 'var(--spacing-xs)'
                                            }}
                                        >
                                            <div style={{
                                                fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                                marginBottom: 'var(--spacing-xs)'
                                            }}>
                                                {s.courseName.includes('Maths') ? '🧮' : s.courseName.includes('English') ? '📖' : '🔬'}
                                            </div>
                                            <p style={{
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                                color: 'var(--color-gray-900)',
                                                marginBottom: 'var(--spacing-xs)'
                                            }}>
                                                {sessionTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                            <p style={{
                                                fontSize: 'var(--font-size-xs)',
                                                color: 'var(--color-gray-600)'
                                            }}>
                                                {s.courseName}
                                            </p>
                                        </div>
                                    );
                                })}

                                {/* No sessions */}
                                {sessionsForDay.length === 0 && (
                                    <p style={{
                                        fontSize: 'var(--font-size-sm)',
                                        color: 'var(--color-gray-400)',
                                        fontStyle: 'italic',
                                        textAlign: 'center',
                                        marginTop: 'var(--spacing-md)'
                                    }}>
                                        No sessions
                                    </p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </Card>

            {/* Upcoming Sessions List */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 style={{
                    fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--color-gray-900)'
                }}>
                    {isYoung ? '⏰ Coming Up' : 'Upcoming Sessions'}
                </h2>

                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-lg)'
                }}>
                    {loading ? (
                        <Card style={{ padding: 'var(--spacing-xl)', textAlign: 'center' }}>
                            <p>Loading sessions...</p>
                        </Card>
                    ) : sessions.length > 0 ? (
                        sessions.map((s: any) => {
                            const sessionDate = new Date(s.scheduledAt);
                            return (
                                <Card key={s.id} style={{
                                    padding: 'var(--spacing-xl)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-xl)',
                                    flexWrap: 'wrap'
                                }}>
                                    <div style={{
                                        fontSize: isYoung ? '64px' : '48px'
                                    }}>
                                        {s.courseName.includes('Maths') ? '🧮' : s.courseName.includes('English') ? '📖' : '🔬'}
                                    </div>

                                    <div style={{ flex: 1, minWidth: '200px' }}>
                                        <h3 style={{
                                            fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                                            fontWeight: 'var(--font-weight-black)',
                                            marginBottom: 'var(--spacing-xs)',
                                            color: 'var(--color-royal-blue)'
                                        }}>
                                            {s.courseName}
                                        </h3>
                                        <p style={{
                                            fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                            color: 'var(--color-gray-700)',
                                            marginBottom: 'var(--spacing-xs)'
                                        }}>
                                            {sessionDate.toLocaleDateString()} at {sessionDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                        <p style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-gray-600)'
                                        }}>
                                            Status: {s.status}
                                        </p>
                                    </div>

                                    <div style={{
                                        display: 'flex',
                                        gap: 'var(--spacing-sm)',
                                        alignItems: 'center'
                                    }}>
                                        {s.meetingLink ? (
                                            <Button
                                                variant="primary"
                                                size="md"
                                                href={s.meetingLink}
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                Join Session →
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="outline"
                                                size="md"
                                                disabled
                                                style={{ whiteSpace: 'nowrap' }}
                                            >
                                                Link will be available soon
                                            </Button>
                                        )}
                                    </div>
                                </Card>
                            );
                        })
                    ) : (
                        <Card style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                            <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>📅</div>
                            <h3 style={{
                                fontSize: 'var(--font-size-2xl)',
                                fontWeight: 'var(--font-weight-black)',
                                marginBottom: 'var(--spacing-sm)',
                                color: 'var(--color-gray-900)'
                            }}>
                                No upcoming sessions
                            </h3>
                            <p style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-gray-600)'
                            }}>
                                Your tutor will schedule sessions soon!
                            </p>
                        </Card>
                    )}
                </div>
            </div>

            {/* Info Card */}
            <Card style={{
                padding: 'var(--spacing-xl)',
                background: isYoung ? '#FFF5CC' : 'var(--color-light-blue)'
            }}>
                <div style={{ display: 'flex', gap: 'var(--spacing-lg)', alignItems: 'flex-start' }}>
                    <div style={{ fontSize: '48px' }}>💡</div>
                    <div>
                        <h3 style={{
                            fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                            fontWeight: 'var(--font-weight-black)',
                            marginBottom: 'var(--spacing-sm)',
                            color: 'var(--color-gray-900)'
                        }}>
                            {isYoung ? 'Tips for sessions!' : 'Session Tips'}
                        </h3>
                        <ul style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0
                        }}>
                            <li style={{
                                fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                color: 'var(--color-gray-700)',
                                marginBottom: 'var(--spacing-sm)',
                                paddingLeft: 'var(--spacing-lg)',
                                position: 'relative'
                            }}>
                                <span style={{ position: 'absolute', left: 0 }}>✓</span>
                                Join 2-3 minutes early to test your audio and video
                            </li>
                            <li style={{
                                fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                color: 'var(--color-gray-700)',
                                marginBottom: 'var(--spacing-sm)',
                                paddingLeft: 'var(--spacing-lg)',
                                position: 'relative'
                            }}>
                                <span style={{ position: 'absolute', left: 0 }}>✓</span>
                                Have a notebook and pen ready
                            </li>
                            <li style={{
                                fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                color: 'var(--color-gray-700)',
                                paddingLeft: 'var(--spacing-lg)',
                                position: 'relative'
                            }}>
                                <span style={{ position: 'absolute', left: 0 }}>✓</span>
                                Find a quiet place for your session
                            </li>
                        </ul>
                    </div>
                </div>
            </Card>
        </div>
    );
}
