import React from 'react';
import Card from '../ui/Card';

const features = [
    {
        icon: '🎯',
        title: 'Personalized Learning',
        description: 'Tailored lesson plans designed specifically for your learning goals and pace.',
    },
    {
        icon: '💡',
        title: 'Expert Instruction',
        description: 'Learn from an experienced tutor with proven track records of student success.',
    },
    {
        icon: '📈',
        title: 'Track Progress',
        description: 'Monitor your improvement with detailed analytics and regular performance reviews.',
    },
    {
        icon: '🎓',
        title: 'Exam Preparation',
        description: 'Focused preparation for standardized tests, finals, and entrance exams.',
    },
    {
        icon: '⏰',
        title: 'Flexible Scheduling',
        description: 'Easily keep track of scheduled classes so you never miss a thing.',
    },
    {
        icon: '📝',
        title: 'Homework Help',
        description: 'Get guidance on assignments and projects to ensure you understand every concept.',
    },
];

export default function Features() {
    return (
        <section className="section">
            <div className="container">
                <div className="text-center mb-2xl">
                    <h2 className="mb-md">What Tutorly Offers</h2>
                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-gray-700)',
                        maxWidth: '700px',
                        margin: '0 auto'
                    }}>
                        Everything you need to succeed academically, all in one platform.
                    </p>
                </div>

                <div className="grid grid-3">
                    {features.map((feature, index) => (
                        <Card key={index}>
                            <div style={{
                                fontSize: '3rem',
                                marginBottom: 'var(--spacing-lg)',
                            }}>
                                {feature.icon}
                            </div>
                            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                                {feature.title}
                            </h3>
                            <p style={{
                                color: 'var(--color-gray-700)',
                                fontSize: 'var(--font-size-base)',
                                marginBottom: 0
                            }}>
                                {feature.description}
                            </p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
