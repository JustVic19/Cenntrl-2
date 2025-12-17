import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';


const pricingTiers = [
    {
        name: 'Steady',
        price: 25,
        period: 'per hour',
        description: 'Perfect for early years students (Years 1-4). Weekly 1-hour sessions to build strong foundations.',
        features: [
            '1 hour per session',
            'Years 1-4 students',
            'Weekly lessons',
            'Personalized lesson plan',
            'Progress assessment',
            'Homework help',
        ],
        popular: false,
        color: 'var(--color-sky-blue)',
    },
    {
        name: 'Focus',
        price: 40,
        period: 'per hour',
        description: 'Ideal for older students (Years 4+). Intensive 2-hour sessions for exam preparation and advanced learning.',
        features: [
            '2 hours per session',
            'Years 4+ students',
            '2-3 sessions per week',
            'Classroom teaching',
            'Weekly progress review',
            'Priority scheduling',
            'Homework support',
            'Test prep materials',
        ],
        popular: true,
        color: 'var(--color-vibrant-pink)',
    },
    {
        name: 'Intensive',
        price: null,
        period: '',
        description: 'For students with specific needs. Tailored support and flexible arrangements.',
        features: [
            'Custom session frequency',
            'Tailored curriculum',
            'One-on-one attention',
            'Flexible scheduling',
            'Specialized support',
        ],
        popular: false,
        color: 'var(--color-royal-blue)',
        isCustom: true,
    },
];

export default function PricesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="badge mb-lg">💰 Pricing</div>

                        <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Transparent, Fair Pricing
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            color: 'var(--color-gray-700)',
                            marginBottom: 0
                        }}>
                            Choose a plan that fits your learning goals and budget. All packages include personalized attention and proven results.
                        </p>
                    </div>
                </div>
            </section>

            {/* Pricing Cards */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-3">
                        {pricingTiers.map((tier, index) => (
                            <Card
                                key={index}
                                className="flex flex-col"
                                style={{
                                    position: 'relative',
                                    height: '100%',
                                    borderColor: tier.popular ? tier.color : 'var(--color-black)',
                                    borderWidth: tier.popular ? '6px' : '4px'
                                }}
                            >
                                {tier.popular && (
                                    <div
                                        style={{
                                            position: 'absolute',
                                            top: '-20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            background: tier.color,
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
                                        ⭐ MOST POPULAR
                                    </div>
                                )}

                                <div style={{ marginBottom: 'var(--spacing-lg)' }}>
                                    <h3 style={{ marginBottom: 'var(--spacing-sm)' }}>{tier.name}</h3>
                                    <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                        {tier.description}
                                    </p>
                                </div>

                                <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                                    <div style={{
                                        fontSize: tier.isCustom ? 'var(--font-size-3xl)' : 'var(--font-size-5xl)',
                                        fontWeight: 'var(--font-weight-black)',
                                        color: tier.color,
                                        lineHeight: 1
                                    }}>
                                        {tier.isCustom ? 'Get in touch!' : `£${tier.price}`}
                                    </div>
                                    {!tier.isCustom && (
                                        <div style={{
                                            fontSize: 'var(--font-size-sm)',
                                            color: 'var(--color-gray-700)',
                                            marginTop: 'var(--spacing-xs)'
                                        }}>
                                            {tier.period}
                                        </div>
                                    )}
                                </div>

                                <div style={{
                                    flexGrow: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-xl)'
                                }}>
                                    {tier.features.map((feature, idx) => (
                                        <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                                            <span style={{ color: tier.color, fontSize: 'var(--font-size-lg)', fontWeight: 'bold' }}>✓</span>
                                            <span style={{ fontSize: 'var(--font-size-base)' }}>{feature}</span>
                                        </div>
                                    ))}
                                </div>

                                <Button
                                    variant={tier.popular ? "royal" : "primary"}
                                    size="md"
                                    href={tier.isCustom ? "/contact" : `/enroll?plan=${tier.name.toLowerCase()}`}
                                    style={{ width: '100%', marginTop: 'auto' }}
                                >
                                    {tier.isCustom ? 'Contact Me' : 'Get Started'}
                                </Button>
                            </Card>
                        ))}
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
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Do you offer group sessions?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Yes! I offer group sessions for students at similar levels. Group sessions provide collaborative learning opportunities while maintaining personalized attention.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Can I cancel my package anytime?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Absolutely. You can cancel your monthly package at any time with 7 days notice.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>What payment methods do you accept?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                We accept all major credit cards, debit cards, and digital payment methods through our secure Stripe integration.
                            </p>
                        </Card>

                        <Card>
                            <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Can I switch between packages?</h4>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                                Yes! You can upgrade or downgrade your package at any time to better fit your needs.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}
