import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function EnrollCancelPage() {
    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
                <div className="text-center mb-2xl">
                    <div style={{ fontSize: '4rem', marginBottom: 'var(--spacing-lg)' }}>😔</div>
                    <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Payment Canceled
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-gray-700)' }}>
                        Your enrollment was not completed.
                    </p>
                </div>

                <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>What happened?</h3>
                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-lg)' }}>
                        You canceled the payment process or closed the payment window. No charges have been made to your account.
                    </p>
                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 0 }}>
                        If you encountered any issues or have questions about enrollment, please don't hesitate to contact me directly.
                    </p>
                </Card>

                <Card style={{ marginBottom: 'var(--spacing-xl)', background: 'var(--color-blue-50)' }}>
                    <h3 style={{ marginBottom: 'var(--spacing-md)' }}>Still Interested?</h3>
                    <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-lg)' }}>
                        You can try enrolling again anytime. If you have questions about the process or need help choosing a plan, I'm here to help!
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                        <div>
                            <strong>Email:</strong> stella.adeniyi@hotmail.com or vadeniyi1409@gmail.com
                        </div>
                        <div>
                            <strong>WhatsApp:</strong> +44 7934 235202
                        </div>
                    </div>
                </Card>

                <div style={{ display: 'flex', gap: 'var(--spacing-md)', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Button variant="primary" size="lg" href="/prices">
                        View Pricing Plans
                    </Button>
                    <Button variant="outline" size="lg" href="/contact">
                        Contact Me
                    </Button>
                </div>
            </div>
        </div>
    );
}
