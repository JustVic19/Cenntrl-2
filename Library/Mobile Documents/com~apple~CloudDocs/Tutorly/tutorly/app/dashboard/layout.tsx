'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const ageGroup = session?.user?.ageGroup || 'years_4_plus';

    // Age-appropriate styling
    const isYoung = ageGroup === 'years_1_4';

    const navItems = [
        { href: '/dashboard', label: '🏠 Home', icon: '🏠' },
        { href: '/dashboard/courses', label: '📚 My Courses', icon: '📚' },
        { href: '/dashboard/schedule', label: '📅 Schedule', icon: '📅' },
        { href: '/dashboard/progress', label: '🏆 Progress', icon: '🏆' },
        { href: '/dashboard/profile', label: '👤 Profile', icon: '👤' },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-light-beige)' }}>
            {/* Sidebar */}
            <aside style={{
                width: '280px',
                background: isYoung ? '#FFE5F1' : 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                borderRight: '4px solid var(--color-gray-900)',
                padding: 'var(--spacing-xl)',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-lg)'
            }}>
                {/* Logo/Brand */}
                <Link href="/dashboard" style={{
                    textDecoration: 'none',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    <h1 style={{
                        fontSize: isYoung ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        color: isYoung ? 'var(--color-royal-blue)' : 'white',
                        textAlign: 'center'
                    }}>
                        {isYoung ? '🎓 Tutorly' : 'Tutorly'}
                    </h1>
                </Link>

                {/* Welcome Message */}
                <div style={{
                    padding: 'var(--spacing-md)',
                    background: isYoung ? '#FFF5CC' : 'rgba(255,255,255,0.2)',
                    border: '3px solid var(--color-gray-900)',
                    borderRadius: 'var(--border-radius-md)',
                    marginBottom: 'var(--spacing-md)',
                    backdropFilter: 'blur(10px)'
                }}>
                    <p style={{
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        color: isYoung ? 'var(--color-gray-900)' : 'white'
                    }}>
                        {isYoung ? `👋 Hi ${session?.user?.name?.split(' ')[0] || 'there'}!` : `Welcome back, ${session?.user?.name?.split(' ')[0] || 'Student'}!`}
                    </p>
                </div>

                {/* Navigation */}
                <nav style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 'var(--spacing-sm)'
                }}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                style={{
                                    textDecoration: 'none',
                                    padding: 'var(--spacing-md)',
                                    background: isActive
                                        ? (isYoung ? 'var(--color-bright-yellow)' : 'rgba(255,255,255,0.25)')
                                        : 'transparent',
                                    color: isActive
                                        ? (isYoung ? 'var(--color-gray-900)' : 'white')
                                        : (isYoung ? 'var(--color-gray-700)' : 'rgba(255,255,255,0.8)'),
                                    border: isActive ? '3px solid var(--color-gray-900)' : '3px solid transparent',
                                    borderRadius: 'var(--border-radius-md)',
                                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                                    fontWeight: isActive ? 'var(--font-weight-bold)' : 'var(--font-weight-semibold)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    transition: 'all 0.2s ease',
                                    backdropFilter: isActive && !isYoung ? 'blur(10px)' : 'none'
                                }}
                            >
                                {isYoung ? item.icon : ''} {item.label.replace(item.icon + ' ', '')}
                            </Link>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    style={{
                        padding: 'var(--spacing-md)',
                        background: 'transparent',
                        color: 'var(--color-gray-600)',
                        border: '3px solid var(--color-gray-300)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-semibold)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    🚪 Logout
                </button>
            </aside>

            {/* Main Content */}
            <main style={{
                flex: 1,
                padding: 'var(--spacing-2xl)',
                overflowY: 'auto'
            }}>
                {children}
            </main>
        </div>
    );
}
