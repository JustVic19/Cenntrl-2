'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Session {
    id: string;
    courseName: string;
    scheduledAt: string;
    meetingLink: string | null;
    status: string;
    notes: string | null;
    createdAt: string;
    users: {
        id: string;
        name: string | null;
        email: string;
        year: string | null;
    };
}

export default function SessionsPage() {
    const [sessions, setSessions] = useState<Session[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('upcoming');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchSessions();
    }, [filter]);

    async function fetchSessions() {
        try {
            const params = new URLSearchParams();
            if (filter === 'upcoming') params.set('upcoming', 'true');
            if (filter === 'completed') params.set('status', 'completed');

            const res = await fetch(`/api/admin/sessions?${params}`);
            if (res.ok) {
                const data = await res.json();
                setSessions(data.sessions);
            }
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string) {
        return new Date(dateString).toLocaleDateString('en-GB', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function isPast(dateString: string) {
        return new Date(dateString) < new Date();
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
                        Sessions 📅
                    </h1>
                    <p style={{ color: 'var(--color-gray-600)' }}>
                        Schedule and manage tutoring sessions
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowAddModal(true)}
                >
                    ➕ Schedule Session
                </Button>
            </div>

            {/* Filter Tabs */}
            <div style={{ marginBottom: 'var(--spacing-xl)', display: 'flex', gap: 'var(--spacing-md)' }}>
                {(['upcoming', 'all', 'completed'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        style={{
                            padding: 'var(--spacing-sm) var(--spacing-lg)',
                            background: filter === f ? 'var(--color-royal-blue)' : 'var(--color-white)',
                            color: filter === f ? 'var(--color-white)' : 'var(--color-gray-700)',
                            border: '3px solid var(--color-black)',
                            borderRadius: 'var(--border-radius-md)',
                            fontWeight: 'var(--font-weight-bold)',
                            cursor: 'pointer',
                            textTransform: 'capitalize'
                        }}
                    >
                        {f}
                    </button>
                ))}
            </div>

            {/* Sessions List */}
            {loading ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-gray-600)' }}>
                        Loading sessions...
                    </div>
                </Card>
            ) : sessions.length === 0 ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-lg)' }}>📅</div>
                        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-lg)' }}>
                            No {filter} sessions. Schedule one to get started!
                        </p>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            Schedule Session
                        </Button>
                    </div>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {sessions.map((session) => (
                        <Card key={session.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                                        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0 }}>
                                            {session.courseName}
                                        </h3>
                                        <span style={{
                                            padding: 'var(--spacing-xs) var(--spacing-sm)',
                                            background: session.status === 'completed' ? 'var(--color-mint-green)' :
                                                session.status === 'cancelled' ? '#fee' : 'var(--color-bright-yellow)',
                                            color: session.status === 'cancelled' ? '#c00' : 'var(--color-black)',
                                            borderRadius: 'var(--border-radius-sm)',
                                            fontSize: 'var(--font-size-xs)',
                                            fontWeight: 'var(--font-weight-bold)',
                                            border: '2px solid var(--color-black)',
                                            textTransform: 'capitalize'
                                        }}>
                                            {session.status}
                                        </span>
                                        {isPast(session.scheduledAt) && session.status === 'scheduled' && (
                                            <span style={{
                                                padding: 'var(--spacing-xs) var(--spacing-sm)',
                                                background: '#fee',
                                                color: '#c00',
                                                borderRadius: 'var(--border-radius-sm)',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-bold)',
                                                border: '2px solid #c00'
                                            }}>
                                                Overdue
                                            </span>
                                        )}
                                    </div>

                                    <div style={{ marginBottom: 'var(--spacing-md)' }}>
                                        <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                            👨‍🎓 {session.users.name || 'Unknown Student'}
                                        </div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                                            {session.users.email} {session.users.year && `• ${session.users.year}`}
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', gap: 'var(--spacing-xl)', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)', flexWrap: 'wrap' }}>
                                        <span>📅 {formatDate(session.scheduledAt)}</span>
                                        {session.meetingLink && (
                                            <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-royal-blue)' }}>
                                                🔗 Join Meeting
                                            </a>
                                        )}
                                        {session.notes && <span>📝 Has notes</span>}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)', flexDirection: 'column' }}>
                                    {session.status === 'scheduled' && !isPast(session.scheduledAt) && session.meetingLink && (
                                        <Button variant="primary" size="sm" href={session.meetingLink} target="_blank">
                                            Join Now
                                        </Button>
                                    )}
                                    <Button variant="outline" size="sm" href={`/admin/sessions/${session.id}`}>
                                        Edit
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Session Modal */}
            {showAddModal && (
                <AddSessionModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        fetchSessions();
                    }}
                />
            )}
        </div>
    );
}

function AddSessionModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [students, setStudents] = useState<Array<{ id: string; name: string | null; email: string }>>([]);
    const [formData, setFormData] = useState({
        userId: '',
        courseName: '',
        scheduledAt: '',
        meetingLink: '',
        notes: '',
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
            const res = await fetch('/api/admin/sessions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create session');
            }

            onSuccess();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Something went wrong');
        } finally {
            setLoading(false);
        }
    }

    // Set default date to tomorrow at 10 AM
    useEffect(() => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(10, 0, 0, 0);
        setFormData(prev => ({ ...prev, scheduledAt: tomorrow.toISOString().slice(0, 16) }));
    }, []);

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
            <Card style={{ width: '100%', maxWidth: '600px', margin: 'var(--spacing-xl)', maxHeight: '90vh', overflow: 'auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                        Schedule Session
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
                                Student *
                            </label>
                            <select
                                value={formData.userId}
                                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                                className="input"
                                required
                            >
                                <option value="">Select student...</option>
                                {students.map((student) => (
                                    <option key={student.id} value={student.id}>
                                        {student.name || student.email}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Course/Subject *
                            </label>
                            <input
                                type="text"
                                value={formData.courseName}
                                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                                className="input"
                                required
                                placeholder="e.g., Math, English, Science"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                value={formData.scheduledAt}
                                onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                className="input"
                                required
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Meeting Link
                            </label>
                            <input
                                type="url"
                                value={formData.meetingLink}
                                onChange={(e) => setFormData({ ...formData, meetingLink: e.target.value })}
                                className="input"
                                placeholder="https://zoom.us/j/..."
                            />
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--spacing-xs)' }}>
                                Zoom, Google Meet, or other video call link
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Notes
                            </label>
                            <textarea
                                value={formData.notes}
                                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                                className="input"
                                rows={3}
                                placeholder="Optional notes about the session..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Scheduling...' : 'Schedule Session'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
