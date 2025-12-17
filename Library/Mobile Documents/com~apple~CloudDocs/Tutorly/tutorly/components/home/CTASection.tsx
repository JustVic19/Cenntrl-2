import React from 'react';
import Button from '../ui/Button';

export default function CTASection() {
    return (
        <section className="section bg-royal">
            <div className="container text-center">
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{
                        color: 'var(--color-white)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        Ready to Excel in Your Studies?
                    </h2>

                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-gray-200)',
                        marginBottom: 'var(--spacing-2xl)',
                        lineHeight: 'var(--line-height-relaxed)'
                    }}>
                        Join hundreds of successful students who have transformed their academic performance with expert tutoring. Start your journey today!
                    </p>

                    <div style={{
                        display: 'flex',
                        gap: 'var(--spacing-lg)',
                        justifyContent: 'center',
                        flexWrap: 'wrap'
                    }}>
                        <Button variant="primary" size="lg" href="/classes">
                            View Classes
                        </Button>
                        <Button variant="secondary" size="lg" href="/contact">
                            Schedule a Consultation
                        </Button>
                    </div>

                    {/* Trust Indicators */}
                    <div style={{
                        marginTop: 'var(--spacing-3xl)',
                        display: 'flex',
                        justifyContent: 'center',
                        gap: 'var(--spacing-2xl)',
                        flexWrap: 'wrap'
                    }}>
                        <div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                marginBottom: 'var(--spacing-xs)'
                            }}>
                                ⭐⭐⭐⭐⭐
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                fontWeight: 'var(--font-weight-semibold)'
                            }}>
                                5.0 Rating
                            </div>
                        </div>

                        <div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                marginBottom: 'var(--spacing-xs)'
                            }}>
                                ✓
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                fontWeight: 'var(--font-weight-semibold)'
                            }}>
                                Money-Back Guarantee
                            </div>
                        </div>

                        <div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                marginBottom: 'var(--spacing-xs)'
                            }}>
                                🔒
                            </div>
                            <div style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-300)',
                                fontWeight: 'var(--font-weight-semibold)'
                            }}>
                                Secure Payment
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
