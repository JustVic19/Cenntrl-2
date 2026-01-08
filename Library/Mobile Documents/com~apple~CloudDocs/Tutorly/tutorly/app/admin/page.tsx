'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface DashboardStats {
    totalStudents: number;
    activeStudents: number;
    pendingHomework: number;
    upcomingSessions: number;
    unreadMessages: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalStudents: 0,
        activeStudents: 0,
        pendingHomework: 0,
        upcomingSessions: 0,
        unreadMessages: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch stats:', error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Students', value: stats.totalStudents, icon: '👨‍🎓', color: 'var(--color-royal-blue)', href: '/admin/students' },
        { label: 'Active Students', value: stats.activeStudents, icon: '✅', color: 'var(--color-mint-green)', href: '/admin/students' },
        { label: 'Pending Homework', value: stats.pendingHomework, icon: '📝', color: 'var(--color-bright-yellow)', href: '/admin/homework' },
        { label: 'Upcoming Sessions', value: stats.upcomingSessions, icon: '📅', color: 'var(--color-vibrant-pink)', href: '/admin/sessions' },
    ];

    const quickActions = [
        { label: 'Add New Student', icon: '➕', href: '/admin/students/new', variant: 'primary' as const },
        { label: 'Upload Homework', icon: '📎', href: '/admin/homework/new', variant: 'outline' as const },
        { label: 'Create Test', icon: '📋', href: '/admin/tests/new', variant: 'outline' as const },
        { label: 'Schedule Session', icon: '📅', href: '/admin/sessions/new', variant: 'outline' as const },
        { label: 'Send Message', icon: '💬', href: '/admin/messages/new', variant: 'outline' as const },
    ];

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-gray-900)'
                }}>
                    Welcome Back! 👋
                </h1>
                <p style={{
                    fontSize: 'var(--font-size-lg)',
                    color: 'var(--color-gray-600)'
                }}>
                    Here's what's happening with your students today.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: 'var(--spacing-lg)',
                marginBottom: 'var(--spacing-2xl)'
            }}>
                {statCards.map((stat, index) => (
                    <Card
                        key={index}
                        style={{
                            cursor: 'pointer',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                        }}
                        onClick={() => window.location.href = stat.href}
                    >
                        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-lg)' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: 'var(--border-radius-md)',
                                background: stat.color,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 'var(--font-size-2xl)',
                                border: '3px solid var(--color-black)'
                            }}>
                                {stat.icon}
                            </div>
                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-3xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    color: 'var(--color-gray-900)',
                                    lineHeight: 1
                                }}>
                                    {loading ? '...' : stat.value}
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-600)',
                                    fontWeight: 'var(--font-weight-medium)'
                                }}>
                                    {stat.label}
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    marginBottom: 'var(--spacing-lg)',
                    color: 'var(--color-gray-900)'
                }}>
                    Quick Actions
                </h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--spacing-md)'
                }}>
                    {quickActions.map((action, index) => (
                        <Button
                            key={index}
                            variant={action.variant}
                            size="md"
                            href={action.href}
                        >
                            {action.icon} {action.label}
                        </Button>
                    ))}
                </div>
            </Card>

            {/* Recent Activity & Upcoming */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: 'var(--spacing-xl)'
            }}>
                {/* Recent Activity */}
                <Card>
                    <h2 style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: 'var(--font-weight-bold)',
                        marginBottom: 'var(--spacing-lg)',
                        color: 'var(--color-gray-900)'
                    }}>
                        Recent Activity
                    </h2>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)',
                        color: 'var(--color-gray-600)'
                    }}>
                        <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                            No recent activity yet. Start by adding students!
                        </p>
                    </div>
                </Card>

                {/* Upcoming Sessions */}
                <Card>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        <h2 style={{
                            fontSize: 'var(--font-size-xl)',
                            fontWeight: 'var(--font-weight-bold)',
                            color: 'var(--color-gray-900)'
                        }}>
                            Upcoming Sessions
                        </h2>
                        <Button variant="outline" size="sm" href="/admin/sessions">
                            View All
                        </Button>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-md)',
                        color: 'var(--color-gray-600)'
                    }}>
                        <p style={{ textAlign: 'center', padding: 'var(--spacing-xl)' }}>
                            No upcoming sessions. Schedule one to get started!
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
}
