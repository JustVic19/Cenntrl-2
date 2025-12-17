import React from 'react';
import Card from '../ui/Card';

const testimonials = [
    {
        name: 'Sarah Johnson',
        role: 'High School Student',
        content: 'My grades improved dramatically! The personalized attention and clear explanations made all the difference. Highly recommended!',
        rating: 5,
    },
    {
        name: 'Michael Chen',
        role: 'Parent',
        content: 'Excellent tutor! My son went from struggling in math to getting A\'s. The progress tracking keeps us informed every step of the way.',
        rating: 5,
    },
    {
        name: 'Emma Williams',
        role: 'College Student',
        content: 'The best tutoring experience I\'ve had. Patient, knowledgeable, and always prepared. Worth every penny!',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-2xl">
                    <h2 className="mb-md">What Students Say</h2>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-gray-700)',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Don't just take our word for it — hear from students and parents.
                    </p>
                </div>

                <div className="grid grid-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            {/* Star Rating */}
                            <div style={{
                                marginBottom: 'var(--spacing-lg)',
                                fontSize: 'var(--font-size-xl)',
                                color: 'var(--color-bright-yellow)'
                            }}>
                                {'⭐'.repeat(testimonial.rating)}
                            </div>

                            {/* Content */}
                            <p style={{
                                fontSize: 'var(--font-size-base)',
                                color: 'var(--color-gray-700)',
                                marginBottom: 'var(--spacing-xl)',
                                fontStyle: 'italic',
                                lineHeight: 'var(--line-height-relaxed)'
                            }}>
                                "{testimonial.content}"
                            </p>

                            {/* Author */}
                            <div>
                                <div style={{
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-black)',
                                    marginBottom: 'var(--spacing-xs)'
                                }}>
                                    {testimonial.name}
                                </div>
                                <div style={{
                                    fontSize: 'var(--font-size-sm)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    {testimonial.role}
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
