import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function PricesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="badge mb-lg">💰 Pricing</div>

                        <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Personalized Tutoring
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            color: 'var(--color-gray-700)',
                            marginBottom: 0
                        }}>
                            Get in touch to discuss a customized learning plan tailored to your child's needs and goals.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Card */}
            <section className="section">
                <div className="container">
                    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                        <Card
                            className="flex flex-col"
                            style={{
                                position: 'relative',
                                borderColor: 'var(--color-royal-blue)',
                                borderWidth: '6px'
                            }}
                        >
                            <div
                                style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    background: 'var(--color-royal-blue)',
                                    color: 'white',
                                    padding: 'var(--spacing-xs) var(--spacing-xl)',
                                    borderRadius: 'var(--border-radius-full)',
                                    border: '3px solid var(--color-black)',
                                    fontSize: 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    whiteSpace: 'nowrap',
                                    boxShadow: 'var(--shadow-sm)',
                                }}
                            >
                                ⭐ PERSONALIZED PLAN
                            </div>

                            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                                <div style={{
                                    fontSize: 'var(--font-size-3xl)',
                                    fontWeight: 'var(--font-weight-black)',
                                    color: 'var(--color-royal-blue)',
                                    lineHeight: 1
                                }}>
                                    Get in touch!
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-700)',
                                    marginTop: 'var(--spacing-xs)'
                                }}>
                                    Custom pricing based on your needs
                                </div>
                            </div>

                            <div style={{
                                flexGrow: 1,
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-md)',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                {[
                                    'Flexible session frequency (1-3 per week)',
                                    'Available for Years 1-13',
                                    'Personalized learning path',
                                    'Classroom teaching methods',
                                    'Progress tracking & reports',
                                    'Regular parent updates',
                                    'Homework support',
                                    'Exam preparation',
                                    'Test prep materials',
                                    'Flexible scheduling',
                                    'One-on-one attention',
                                ].map((feature, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                        <span style={{ color: 'var(--color-royal-blue)', fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>✓</span>
                                        <span style={{ fontSize: 'var(--font-size-base)' }}>{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                variant="royal"
                                size="lg"
                                href="/contact"
                                style={{ width: '100%', marginTop: 'auto' }}
                            >
                                Contact Me →
                            </Button>
                        </Card>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="text-center mb-2xl">
                        <h2>Frequently Asked Questions</h2>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>How do I get started?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Simply click "Contact Me" above or visit the contact page to get in touch. We'll discuss your child's needs and create a customized learning plan together.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>What subjects do you cover?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                I offer tutoring in Maths, English, and Science for students from Year 1 to Year 13, with specialized exam preparation for GCSEs and A-Levels.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Do you offer group sessions?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Yes! I offer group sessions for students at similar levels. Group sessions provide collaborative learning opportunities while maintaining personalized attention.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>What is your cancellation policy?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                I require 24 hours notice for cancellations. Sessions cancelled with less notice will be charged at the full rate.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}
