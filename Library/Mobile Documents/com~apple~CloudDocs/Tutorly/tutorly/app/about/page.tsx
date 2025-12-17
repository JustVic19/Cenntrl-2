import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function AboutPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="grid grid-2" style={{ alignItems: 'center', gap: 'var(--spacing-4xl)' }}>
                        <div>
                            <div className="badge mb-lg">👋 About Me</div>

                            <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                                Hi, I'm Your Dedicated Tutor
                            </h1>

                            <p style={{
                                fontSize: 'var(--font-size-xl)',
                                color: 'var(--color-gray-700)',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                With over 8 years of experience helping students achieve academic excellence, I'm passionate about making learning engaging, effective, and enjoyable.
                            </p>

                            <Button variant="primary" size="lg" href="/contact">
                                Schedule a Consultation
                            </Button>
                        </div>

                        <Card style={{
                            background: 'var(--color-royal-blue)',
                            textAlign: 'center',
                            padding: 'var(--spacing-4xl)'
                        }}>
                            <div style={{ fontSize: '120px', marginBottom: 'var(--spacing-lg)' }}>
                                👨‍🏫
                            </div>
                            <h3 style={{ color: 'var(--color-white)', marginBottom: 0 }}>
                                Expert Educator
                            </h3>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Qualifications */}
            <section className="section">
                <div className="container">
                    <div className="text-center mb-2xl">
                        <h2>Qualifications & Experience</h2>
                    </div>

                    <div className="grid grid-3">
                        <Card>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>🎓</div>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Education</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Two Master's degree's with honors from a top university. Specialized in curriculum development and student assessment.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>📜</div>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Experience</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                14 plus years teaching students of all ages from reception to year 11. Advanced Teaching Methods, Test Preparation, and Special Education. Continuously updating skills.
                            </p>
                        </Card>

                        <Card>
                            <div style={{ fontSize: '3rem', marginBottom: 'var(--spacing-lg)' }}>⭐</div>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Track Record</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                100+ students tutored with a 95% success rate. Students have gained admission to top colleges and achieved significant grade improvements.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Teaching Philosophy */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                        <div className="text-center mb-2xl">
                            <h2>My Teaching Philosophy</h2>
                        </div>

                        <Card>
                            <p style={{
                                fontSize: 'var(--font-size-lg)',
                                color: 'var(--color-gray-700)',
                                lineHeight: 'var(--line-height-relaxed)',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                I believe every student has the potential to excel when given the right support and encouragement. My approach focuses on understanding each student's unique learning style and adapting my teaching methods accordingly.
                            </p>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-royal-blue)' }}>
                                        🎯 Personalized Learning
                                    </h4>
                                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                        No two students learn the same way. I create customized lesson plans that address each student's strengths, weaknesses, and goals.
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-vibrant-pink)' }}>
                                        💪 Building Confidence
                                    </h4>
                                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                        Academic success is as much about confidence as it is about knowledge. I help students believe in their abilities and overcome challenges.
                                    </p>
                                </div>

                                <div>
                                    <h4 style={{ marginBottom: 'var(--spacing-sm)', color: 'var(--color-bright-yellow)' }}>
                                        📈 Measurable Progress
                                    </h4>
                                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                        I track progress meticulously and provide regular feedback to students and parents, ensuring everyone stays informed and motivated.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-royal">
                <div className="container text-center">
                    <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--spacing-lg)' }}>
                        Ready to Start Your Learning Journey?
                    </h2>

                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-gray-200)',
                        marginBottom: 'var(--spacing-2xl)',
                        maxWidth: '700px',
                        margin: '0 auto var(--spacing-2xl)'
                    }}>
                        Let's work together to achieve your academic goals. Contact me today for a free consultation.
                    </p>

                    <Button variant="primary" size="lg" href="/contact">
                        Get in Touch
                    </Button>
                </div>
            </section>
        </>
    );
}
