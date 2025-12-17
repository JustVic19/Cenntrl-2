'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '../ui/Button';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/classes', label: 'Classes' },
        { href: '/prices', label: 'Prices' },
        { href: '/about', label: 'About' },
        { href: '/contact', label: 'Contact' },
    ];

    return (
        <nav
            className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 50,
                transition: 'all 0.3s ease',
                background: isScrolled ? '#FFFEF9' : 'transparent',
                borderBottom: isScrolled ? '3px solid #000' : '3px solid transparent',
                padding: '1rem 0',
            }}
        >
            <div className="container">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="logo">
                        <h2 style={{ marginBottom: 0, fontSize: 'var(--font-size-2xl)' }}>
                            <span style={{ color: 'var(--color-royal-blue)' }}>Tutor</span>
                            <span style={{ color: 'var(--color-vibrant-pink)' }}>ly</span>
                        </h2>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="nav-links-desktop" style={{ display: 'flex', gap: 'var(--spacing-xl)', alignItems: 'center' }}>
                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)' }}>
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    style={{
                                        fontSize: 'var(--font-size-base)',
                                        fontWeight: 'var(--font-weight-semibold)',
                                        color: 'var(--color-gray-900)',
                                        transition: 'color 0.2s',
                                    }}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        <Button variant="primary" size="sm" href="/contact">
                            Get Started
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="mobile-menu-button"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        style={{
                            display: 'none',
                            background: 'var(--color-black)',
                            color: 'var(--color-white)',
                            border: 'none',
                            padding: 'var(--spacing-sm) var(--spacing-md)',
                            borderRadius: 'var(--border-radius-sm)',
                            cursor: 'pointer',
                            fontWeight: 'var(--font-weight-bold)',
                        }}
                    >
                        {mobileMenuOpen ? '✕' : '☰'}
                    </button>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div
                        className="mobile-menu"
                        style={{
                            display: 'none',
                            flexDirection: 'column',
                            gap: 'var(--spacing-md)',
                            marginTop: 'var(--spacing-lg)',
                            padding: 'var(--spacing-lg)',
                            background: 'var(--color-white)',
                            border: '3px solid var(--color-black)',
                            borderRadius: 'var(--border-radius-md)',
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    fontSize: 'var(--font-size-lg)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: 'var(--color-gray-900)',
                                    padding: 'var(--spacing-sm) 0',
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Button variant="primary" size="sm" href="/contact">
                            Get Started
                        </Button>
                    </div>
                )}
            </div>
        </nav>
    );
}
