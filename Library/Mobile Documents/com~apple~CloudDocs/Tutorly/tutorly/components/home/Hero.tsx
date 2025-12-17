import React from 'react';
import Button from '../ui/Button';

export default function Hero() {
    return (
        <section className="section bg-cream">
            <div className="container">
                <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-4xl)' }}>
                    {/* Left Column - Text Content */}
                    <div className="animate-slide-in-left">
                        <div className="badge mb-lg">🎓 Premium Online Tutoring</div>

                        <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Excel in Your Studies with Expert Tutoring
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            color: 'var(--color-gray-700)',
                            marginBottom: 'var(--spacing-2xl)',
                            lineHeight: 'var(--line-height-relaxed)'
                        }}>
                            Personalized group sessions designed to help you achieve academic excellence. Master challenging subjects with confidence.
                        </p>

                        <div style={{ display: 'flex', gap: 'var(--spacing-lg)', flexWrap: 'wrap' }}>
                            <Button variant="primary" size="lg" href="/classes">
                                Browse Classes
                            </Button>
                            <Button variant="outline" size="lg" href="/contact">
                                Contact Me
                            </Button>
                        </div>

                        {/* Stats */}
                        <div
                            className="grid grid-3"
                            style={{
                                marginTop: 'var(--spacing-3xl)',
                                gap: 'var(--spacing-xl)'
                            }}
                        >
                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-4xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    color: 'var(--color-royal-blue)',
                                    marginBottom: 'var(--spacing-xs)'
                                }}>
                                    100+
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-700)',
                                    fontWeight: 'var(--font-weight-semibold)'
                                }}>
                                    Students Taught
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-4xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    color: 'var(--color-vibrant-pink)',
                                    marginBottom: 'var(--spacing-xs)'
                                }}>
                                    95%
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-700)',
                                    fontWeight: 'var(--font-weight-semibold)'
                                }}>
                                    Success Rate
                                </div>
                            </div>

                            <div>
                                <div style={{
                                    fontSize: 'var(--font-size-4xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    color: 'var(--color-bright-yellow)',
                                    marginBottom: 'var(--spacing-xs)'
                                }}>
                                    8+
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-700)',
                                    fontWeight: 'var(--font-weight-semibold)'
                                }}>
                                    Years Experience
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Visual Element */}
                    <div className="animate-slide-in-right" style={{ position: 'relative' }}>
                        <div
                            className="card"
                            style={{
                                background: 'var(--color-royal-blue)',
                                borderColor: 'var(--color-black)',
                                padding: 'var(--spacing-3xl)',
                                textAlign: 'center',
                                minHeight: '400px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <div style={{
                                fontSize: '120px',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                📚
                            </div>
                            <h3 style={{ color: 'var(--color-white)', marginBottom: 'var(--spacing-md)' }}>
                                Interactive Learning
                            </h3>
                            <p style={{ color: 'var(--color-gray-200)', fontSize: 'var(--font-size-lg)', marginBottom: 0 }}>
                                Engaging sessions tailored to your learning style
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
