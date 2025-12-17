import React from 'react';
import Link from 'next/link';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-royal" style={{ padding: 'var(--spacing-4xl) 0 var(--spacing-xl) 0' }}>
            <div className="container">
                <div className="grid grid-3" style={{ marginBottom: 'var(--spacing-3xl)' }}>
                    {/* Brand */}
                    <div>
                        <h3 style={{ color: 'var(--color-white)', marginBottom: 'var(--spacing-md)' }}>
                            <span style={{ color: 'var(--color-bright-yellow)' }}>Tutor</span>
                            <span style={{ color: 'var(--color-vibrant-pink)' }}>ly</span>
                        </h3>
                        <p style={{ color: 'var(--color-gray-200)', fontSize: 'var(--font-size-base)' }}>
                            Premium tutoring for students who want to excel.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                            Quick Links
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            <Link href="/" style={{ color: 'var(--color-gray-200)' }}>Home</Link>
                            <Link href="/classes" style={{ color: 'var(--color-gray-200)' }}>Classes</Link>
                            <Link href="/prices" style={{ color: 'var(--color-gray-200)' }}>Prices</Link>
                            <Link href="/about" style={{ color: 'var(--color-gray-200)' }}>About</Link>
                            <Link href="/contact" style={{ color: 'var(--color-gray-200)' }}>Contact</Link>
                        </div>
                    </div>

                    {/* Legal */}
                    <div>
                        <h4 style={{ color: 'var(--color-white)', fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-md)' }}>
                            Legal
                        </h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                            <Link href="/privacy" style={{ color: 'var(--color-gray-200)' }}>Privacy Policy</Link>
                            <Link href="/terms" style={{ color: 'var(--color-gray-200)' }}>Terms of Service</Link>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div
                    style={{
                        borderTop: '2px solid rgba(255, 255, 255, 0.2)',
                        paddingTop: 'var(--spacing-lg)',
                        textAlign: 'center',
                    }}
                >
                    <p style={{ color: 'var(--color-gray-300)', fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                        © {currentYear} Tutorly. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
