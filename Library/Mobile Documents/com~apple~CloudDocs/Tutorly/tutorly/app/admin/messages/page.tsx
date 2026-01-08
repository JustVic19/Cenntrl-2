'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Message {
    id: string;
    subject: string;
    content: string;
    sentTo: string;
    yearGroup: string | null;
    createdAt: string;
    recipientCount: number;
    readCount: number;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);
    const [showComposeModal, setShowComposeModal] = useState(false);

    useEffect(() => {
        fetchMessages();
    }, []);

    async function fetchMessages() {
        try {
            const res = await fetch('/api/admin/messages');
            if (res.ok) {
                const data = await res.json();
                setMessages(data.messages);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    return (
        <div>
            {/* Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--spacing-xl)'
            }}>
                <div>
                    <h1 style={{
                        fontSize: 'var(--font-size-3xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-xs)',
                        color: 'var(--color-gray-900)'
                    }}>
                        Messages 💬
                    </h1>
                    <p style={{ color: 'var(--color-gray-600)' }}>
                        Send announcements and messages to students
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowComposeModal(true)}
                >
                    ✉️ Compose Message
                </Button>
            </div>

            {/* Messages List */}
            {loading ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-gray-600)' }}>
                        Loading messages...
                    </div>
                </Card>
            ) : messages.length === 0 ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-lg)' }}>💬</div>
                        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-lg)' }}>
                            No messages sent yet. Compose your first message!
                        </p>
                        <Button variant="primary" onClick={() => setShowComposeModal(true)}>
                            Compose Message
                        </Button>
                    </div>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {messages.map((message) => (
                        <Card key={message.id}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--spacing-sm)' }}>
                                    <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 'var(--font-weight-bold)', margin: 0 }}>
                                        {message.subject}
                                    </h3>
                                    <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                                        {formatDate(message.createdAt)}
                                    </span>
                                </div>

                                <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-md)', lineHeight: 1.6 }}>
                                    {message.content}
                                </p>

                                <div style={{ display: 'flex', gap: 'var(--spacing-xl)', fontSize: 'var(--font-size-sm)' }}>
                                    <span style={{ color: 'var(--color-gray-500)' }}>
                                        📤 To: {message.sentTo === 'all' ? 'All Students' : message.sentTo}
                                    </span>
                                    <span style={{ color: 'var(--color-gray-500)' }}>
                                        👥 Recipients: {message.recipientCount}
                                    </span>
                                    <span style={{ color: 'var(--color-gray-500)' }}>
                                        ✓ Read: {message.readCount}/{message.recipientCount}
                                    </span>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Compose Modal */}
            {showComposeModal && (
                <ComposeModal
                    onClose={() => setShowComposeModal(false)}
                    onSuccess={() => {
                        setShowComposeModal(false);
                        fetchMessages();
                    }}
                />
            )}
        </div>
    );
}

function ComposeModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [students, setStudents] = useState<Array<{ id: string; name: string | null; email: string }>>([]);
    const [formData, setFormData] = useState({
        subject: '',
        content: '',
        sentTo: 'all',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    async function fetchStudents() {
        try {
            const res = await fetch('/api/admin/students');
            if (res.ok) {
                const data = await res.json();
                setStudents(data.students);
            }
        } catch (error) {
            console.error('Failed to fetch students:', error);
        }
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to send message');
            }

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <Card style={{ width: '100%', maxWidth: '700px', margin: 'var(--spacing-xl)', maxHeight: '90vh', overflow: 'auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                        Compose Message
                    </h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: 'var(--font-size-xl)', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>

                {error && (
                    <div style={{
                        padding: 'var(--spacing-md)',
                        background: '#fee',
                        border: '2px solid #f88',
                        borderRadius: 'var(--border-radius-md)',
                        color: '#c00',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Send To *
                            </label>
                            <select
                                value={formData.sentTo}
                                onChange={(e) => setFormData({ ...formData, sentTo: e.target.value })}
                                className="input"
                                required
                            >
                                <option value="all">All Students</option>
                                <optgroup label="By Year">
                                    {Array.from({ length: 13 }, (_, i) => (
                                        <option key={i + 1} value={`Year ${i + 1}`}>Year {i + 1}</option>
                                    ))}
                                </optgroup>
                                <optgroup label="Individual Students">
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.name || student.email}
                                        </option>
                                    ))}
                                </optgroup>
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="input"
                                required
                                placeholder="e.g., Weekly Update, Homework Reminder"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Message *
                            </label>
                            <textarea
                                value={formData.content}
                                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                className="input"
                                rows={8}
                                required
                                placeholder="Write your message..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Sending...' : 'Send Message'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
