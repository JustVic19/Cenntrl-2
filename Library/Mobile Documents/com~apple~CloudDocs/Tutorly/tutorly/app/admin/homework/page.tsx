'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Homework {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string | null;
    fileType: string | null;
    dueDate: string | null;
    assignedTo: string;
    yearGroup: string | null;
    createdAt: string;
    creator: { name: string | null; email: string };
    submissionCount: number;
    gradedCount: number;
}

export default function HomeworkPage() {
    const [homework, setHomework] = useState<Homework[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchHomework();
    }, [search, yearFilter]);

    async function fetchHomework() {
        try {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (yearFilter) params.set('year', yearFilter);

            const res = await fetch(`/api/admin/homework?${params}`);
            if (res.ok) {
                const data = await res.json();
                setHomework(data.homework);
            }
        } catch (error) {
            console.error('Failed to fetch homework:', error);
        } finally {
            setLoading(false);
        }
    }

    function formatDate(dateString: string | null) {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    }

    function isOverdue(dateString: string | null) {
        if (!dateString) return false;
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
                        Homework 📝
                    </h1>
                    <p style={{ color: 'var(--color-gray-600)' }}>
                        Create and manage homework assignments
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowAddModal(true)}
                >
                    ➕ Create Homework
                </Button>
            </div>

            {/* Filters */}
            <Card style={{ marginBottom: 'var(--spacing-xl)' }}>
                <div style={{
                    display: 'flex',
                    gap: 'var(--spacing-lg)',
                    flexWrap: 'wrap',
                    alignItems: 'center'
                }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                        <input
                            type="text"
                            placeholder="Search homework..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="input"
                            style={{ width: '100%' }}
                        />
                    </div>
                    <select
                        value={yearFilter}
                        onChange={(e) => setYearFilter(e.target.value)}
                        className="input"
                        style={{ minWidth: '150px' }}
                    >
                        <option value="">All Years</option>
                        {Array.from({ length: 13 }, (_, i) => (
                            <option key={i + 1} value={`Year ${i + 1}`}>Year {i + 1}</option>
                        ))}
                    </select>
                </div>
            </Card>

            {/* Homework List */}
            {loading ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-gray-600)' }}>
                        Loading homework...
                    </div>
                </Card>
            ) : homework.length === 0 ? (
                <Card>
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-lg)' }}>📝</div>
                        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-lg)' }}>
                            No homework yet. Create your first assignment!
                        </p>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            Create Homework
                        </Button>
                    </div>
                </Card>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                    {homework.map((hw) => (
                        <Card key={hw.id}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 'var(--spacing-lg)' }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-sm)' }}>
                                        <h3 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)', margin: 0 }}>
                                            {hw.title}
                                        </h3>
                                        {hw.yearGroup && (
                                            <span style={{
                                                padding: 'var(--spacing-xs) var(--spacing-sm)',
                                                background: 'var(--color-sky-blue)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-bold)',
                                                border: '2px solid var(--color-black)'
                                            }}>
                                                {hw.yearGroup}
                                            </span>
                                        )}
                                        {hw.dueDate && isOverdue(hw.dueDate) && (
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

                                    {hw.description && (
                                        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-md)' }}>
                                            {hw.description}
                                        </p>
                                    )}

                                    <div style={{ display: 'flex', gap: 'var(--spacing-xl)', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                                        <span>📅 Due: {formatDate(hw.dueDate)}</span>
                                        <span>📄 Submissions: {hw.submissionCount}</span>
                                        <span>✅ Graded: {hw.gradedCount}</span>
                                        <span>📤 Created: {formatDate(hw.createdAt)}</span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                                    <Button variant="outline" size="sm" href={`/admin/homework/${hw.id}`}>
                                        View Submissions
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Homework Modal */}
            {showAddModal && (
                <AddHomeworkModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        fetchHomework();
                    }}
                />
            )}
        </div>
    );
}

function AddHomeworkModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        yearGroup: '',
        fileUrl: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/homework', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    assignedTo: formData.yearGroup || 'all',
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create homework');
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
            <Card style={{ width: '100%', maxWidth: '600px', margin: 'var(--spacing-xl)', maxHeight: '90vh', overflow: 'auto' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                        Create New Homework
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: 'var(--font-size-xl)',
                            cursor: 'pointer'
                        }}
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
                                Title *
                            </label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="input"
                                required
                                placeholder="e.g., Math Practice - Fractions"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Description
                            </label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="input"
                                rows={3}
                                placeholder="Instructions for the homework..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    Due Date
                                </label>
                                <input
                                    type="datetime-local"
                                    value={formData.dueDate}
                                    onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                                    className="input"
                                />
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    Assign To
                                </label>
                                <select
                                    value={formData.yearGroup}
                                    onChange={(e) => setFormData({ ...formData, yearGroup: e.target.value })}
                                    className="input"
                                >
                                    <option value="">All Students</option>
                                    {Array.from({ length: 13 }, (_, i) => (
                                        <option key={i + 1} value={`Year ${i + 1}`}>Year {i + 1}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                File Link (optional)
                            </label>
                            <input
                                type="url"
                                value={formData.fileUrl}
                                onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                                className="input"
                                placeholder="https://drive.google.com/file/..."
                            />
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--spacing-xs)' }}>
                                Paste a Google Drive, Dropbox, or other link to the homework file
                            </p>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Creating...' : 'Create Homework'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
