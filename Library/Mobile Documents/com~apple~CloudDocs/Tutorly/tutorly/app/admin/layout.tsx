'use client';

import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AdminLayoutProps {
    children: React.ReactNode;
}

const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/students', label: 'Students', icon: '👨‍🎓' },
    { href: '/admin/homework', label: 'Homework', icon: '📝' },
    { href: '/admin/tests', label: 'Tests', icon: '📋' },
    { href: '/admin/sessions', label: 'Sessions', icon: '📅' },
    { href: '/admin/messages', label: 'Messages', icon: '💬' },
    { href: '/admin/reports', label: 'Reports', icon: '📈' },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [currentPath, setCurrentPath] = useState('');

    useEffect(() => {
        setCurrentPath(window.location.pathname);
    }, []);

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            router.push('/auth/signin');
            return;
        }

        const role = session.user?.role;
        if (role !== 'ADMIN' && role !== 'TUTOR') {
            router.push('/dashboard');
        }
    }, [session, status, router]);

    if (status === 'loading') {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '100vh',
                background: 'var(--color-gray-50)'
            }}>
                <div style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    color: 'var(--color-gray-600)'
                }}>
                    Loading...
                </div>
            </div>
        );
    }

    if (!session || (session.user?.role !== 'ADMIN' && session.user?.role !== 'TUTOR')) {
        return null;
    }

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: 'var(--color-gray-50)'
        }}>
            {/* Sidebar */}
            <aside style={{
                width: '260px',
                background: 'var(--color-royal-blue)',
                color: 'var(--color-white)',
                padding: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                position: 'fixed',
                top: 0,
                left: 0,
                height: '100vh',
                zIndex: 100
            }}>
                {/* Logo */}
                <Link href="/admin" style={{ textDecoration: 'none', marginBottom: 'var(--spacing-2xl)' }}>
                    <h2 style={{
                        color: 'var(--color-white)',
                        marginBottom: 'var(--spacing-xs)',
                        fontSize: 'var(--font-size-2xl)'
                    }}>
                        <span style={{ color: 'var(--color-bright-yellow)' }}>Tutor</span>ly
                    </h2>
                    <span style={{
                        fontSize: 'var(--font-size-sm)',
                        color: 'rgba(255,255,255,0.7)',
                        fontWeight: 'var(--font-weight-semibold)'
                    }}>
                        Admin Dashboard
                    </span>
                </Link>

                {/* Navigation */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                    {navItems.map((item) => {
                        const isActive = currentPath === item.href ||
                            (item.href !== '/admin' && currentPath.startsWith(item.href));

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setCurrentPath(item.href)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-md)',
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    borderRadius: 'var(--border-radius-md)',
                                    background: isActive ? 'rgba(255,255,255,0.2)' : 'transparent',
                                    color: 'var(--color-white)',
                                    textDecoration: 'none',
                                    fontWeight: isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                                    transition: 'all 0.2s',
                                    fontSize: 'var(--font-size-base)'
                                }}
                            >
                                <span style={{ fontSize: 'var(--font-size-lg)' }}>{item.icon}</span>
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                {/* User Info */}
                <div style={{ marginTop: 'auto', paddingTop: 'var(--spacing-xl)', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                        <div style={{ fontWeight: 'var(--font-weight-bold)', marginBottom: 'var(--spacing-xs)' }}>
                            {session.user?.name || 'Tutor'}
                        </div>
                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'rgba(255,255,255,0.7)' }}>
                            {session.user?.email}
                        </div>
                    </div>
                    <Link
                        href="/"
                        style={{
                            display: 'block',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: 'var(--border-radius-sm)',
                            color: 'var(--color-white)',
                            textDecoration: 'none',
                            textAlign: 'center',
                            fontWeight: 'var(--font-weight-semibold)',
                            fontSize: 'var(--font-size-sm)'
                        }}
                    >
                        ← Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                marginLeft: '260px',
                padding: 'var(--spacing-2xl)',
                background: 'var(--color-gray-50)',
                minHeight: '100vh'
            }}>
                {children}
            </main>
        </div>
    );
}
