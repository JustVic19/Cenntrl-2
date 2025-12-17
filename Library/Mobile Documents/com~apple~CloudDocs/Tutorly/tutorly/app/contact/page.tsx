'use client';

import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setSubmitStatus('success');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Reset success message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } catch (error) {
            console.error('Error submitting form:', error);
            setSubmitStatus('error');

            // Reset error message after 5 seconds
            setTimeout(() => setSubmitStatus('idle'), 5000);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            {/* Hero Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="badge mb-lg">📧 Get in Touch</div>

                        <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Let's Start Your Learning Journey
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            color: 'var(--color-gray-700)',
                            marginBottom: 0
                        }}>
                            Have questions? Ready to enroll? I'd love to hear from you. Reach out using the form below or contact me directly via WhatsApp.
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-2" style={{ gap: 'var(--spacing-3xl)' }}>
                        {/* Contact Form */}
                        <Card>
                            <h3 style={{ marginBottom: 'var(--spacing-xl)' }}>Send Me a Message</h3>

                            {submitStatus === 'success' && (
                                <div style={{
                                    background: '#D1FAE5',
                                    border: '3px solid #059669',
                                    borderRadius: 'var(--border-radius-md)',
                                    padding: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-lg)',
                                    color: '#065F46',
                                    fontWeight: 'var(--font-weight-semibold)',
                                }}>
                                    ✓ Message sent successfully! I'll get back to you within 24 hours.
                                </div>
                            )}

                            {submitStatus === 'error' && (
                                <div style={{
                                    background: '#FEE2E2',
                                    border: '3px solid #DC2626',
                                    borderRadius: 'var(--border-radius-md)',
                                    padding: 'var(--spacing-md)',
                                    marginBottom: 'var(--spacing-lg)',
                                    color: '#991B1B',
                                    fontWeight: 'var(--font-weight-semibold)',
                                }}>
                                    ✗ Failed to send message. Please try again or contact me directly via email.
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                                    <div>
                                        <label
                                            htmlFor="name"
                                            style={{
                                                display: 'block',
                                                marginBottom: 'var(--spacing-sm)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                            }}
                                        >
                                            Name *
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="input"
                                            placeholder="Your full name"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            style={{
                                                display: 'block',
                                                marginBottom: 'var(--spacing-sm)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                            }}
                                        >
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="input"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="subject"
                                            style={{
                                                display: 'block',
                                                marginBottom: 'var(--spacing-sm)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                            }}
                                        >
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            required
                                            className="input"
                                            placeholder="What can I help you with?"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="message"
                                            style={{
                                                display: 'block',
                                                marginBottom: 'var(--spacing-sm)',
                                                fontWeight: 'var(--font-weight-semibold)',
                                            }}
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            className="input textarea"
                                            placeholder="Tell me about your learning goals..."
                                            rows={6}
                                        />
                                    </div>

                                    <Button
                                        variant="primary"
                                        size="lg"
                                        type="submit"
                                        disabled={isSubmitting}
                                        style={{ width: '100%' }}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </Card>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                            <Card>
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>💬</div>
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>WhatsApp</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-lg)' }}>
                                    Prefer instant messaging? Reach out on WhatsApp for quick questions and scheduling.
                                </p>
                                <Button variant="royal" size="md" href="https://wa.me/447934235202" style={{ width: '100%' }}>
                                    Chat on WhatsApp
                                </Button>
                            </Card>

                            <Card>
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>📧</div>
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Email</h4>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-sm)' }}>
                                    stella.adeniyi@hotmail.com
                                </p>
                                <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-md)' }}>
                                    vadeniyi1409@gmail.com
                                </p>
                                <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--font-size-sm)', marginBottom: 0 }}>
                                    I typically respond within 24 hours
                                </p>
                            </Card>

                            <Card>
                                <div style={{ fontSize: '2.5rem', marginBottom: 'var(--spacing-md)' }}>⏰</div>
                                <h4 style={{ marginBottom: 'var(--spacing-md)' }}>Availability</h4>
                                <div style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-gray-700)' }}>
                                    <p style={{ marginBottom: 'var(--spacing-sm)' }}><strong>Weekdays:</strong> 17:00 - 22:00</p>
                                    <p style={{ marginBottom: 0 }}><strong>Saturdays:</strong> 09:00 - 22:00</p>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="section bg-gray-50">
                <div className="container">
                    <div className="text-center mb-2xl">
                        <h2>Quick Questions</h2>
                    </div>

                    <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <Card>
                            <h5 style={{ marginBottom: 'var(--spacing-sm)' }}>How quickly will you respond?</h5>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0, fontSize: 'var(--font-size-base)' }}>
                                I aim to respond to all inquiries within 24 hours during business days.
                            </p>
                        </Card>

                        <Card>
                            <h5 style={{ marginBottom: 'var(--spacing-sm)' }}>Can I schedule a free consultation?</h5>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0, fontSize: 'var(--font-size-base)' }}>
                                Yes! The first 15-minute consultation is always free to discuss your needs.
                            </p>
                        </Card>

                        <Card>
                            <h5 style={{ marginBottom: 'var(--spacing-sm)' }}>Do you offer group tutoring?</h5>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 0, fontSize: 'var(--font-size-base)' }}>
                                Yes, I offer small group sessions (2-4 students) at discounted rates. Contact me for details.
                            </p>
                        </Card>
                    </div>
                </div>
            </section >
        </>
    );
}
