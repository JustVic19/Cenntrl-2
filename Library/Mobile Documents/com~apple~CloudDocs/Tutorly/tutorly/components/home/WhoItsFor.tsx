import React from 'react';
import Card from '../ui/Card';

const audiences = [
    {
        emoji: '🧑‍🎓',
        title: 'Students',
        description: 'Whether you\'re struggling with a subject or looking to get ahead, our personalized tutoring helps you achieve your academic goals.',
        benefits: ['Build confidence', 'Master difficult topics', 'Improve grades'],
        bgColor: 'var(--color-sky-blue)',
    },
    {
        emoji: '👨‍👩‍👧',
        title: 'Parents',
        description: 'Give your child the academic support they need with transparent progress tracking and expert instruction from qualified tutors.',
        benefits: ['Track progress', 'Regular updates', 'Proven results'],
        bgColor: 'var(--color-vibrant-pink)',
    },
];

export default function WhoItsFor() {
    return (
        <section className="section bg-gray-50">
            <div className="container">
                <div className="text-center mb-2xl">
                    <h2 className="mb-md">Who It's For</h2>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-gray-700)',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Tutorly is designed for students and parents who demand excellence.
                    </p>
                </div>

                <div className="grid grid-2">
                    {audiences.map((audience, index) => (
                        <Card key={index}>
                            <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>
                                {audience.emoji}
                            </div>

                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                {audience.title}
                            </h3>

                            <p style={{
                                color: 'var(--color-gray-700)',
                                fontSize: 'var(--font-size-base)',
                                marginBottom: 'var(--spacing-xl)'
                            }}>
                                {audience.description}
                            </p>

                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 'var(--spacing-sm)'
                            }}>
                                {audience.benefits.map((benefit, idx) => (
                                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                        <span style={{
                                            color: audience.bgColor,
                                            fontSize: 'var(--font-size-xl)',
                                            fontWeight: 'var(--font-weight-bold)'
                                        }}>
                                            ✓
                                        </span>
                                        <span style={{
                                            fontSize: 'var(--font-size-base)',
                                            fontWeight: 'var(--font-weight-medium)'
                                        }}>
                                            {benefit}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
