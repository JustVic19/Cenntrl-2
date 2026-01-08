'use client';

import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Student {
    id: string;
    name: string | null;
    email: string;
    username: string | null;
    year: string | null;
    ageGroup: string | null;
    onboarded: boolean;
    createdAt: string;
    subscriptions: Array<{
        plan: string;
        status: string;
        courses: unknown;
    }>;
    _count: {
        homeworkSubmissions: number;
        testSubmissions: number;
        live_sessions: number;
    };
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchStudents();
    }, [search, yearFilter, statusFilter]);

    async function fetchStudents() {
        try {
            const params = new URLSearchParams();
            if (search) params.set('search', search);
            if (yearFilter) params.set('year', yearFilter);
            if (statusFilter) params.set('status', statusFilter);

            const res = await fetch(`/api/admin/students?${params}`);
            if (res.ok) {
                const data = await res.json();
                setStudents(data.students);
            }
        } catch (error) {
            console.error('Failed to fetch students:', error);
        } finally {
            setLoading(false);
        }
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
                        Students 👨‍🎓
                    </h1>
                    <p style={{ color: 'var(--color-gray-600)' }}>
                        Manage all your students in one place
                    </p>
                </div>
                <Button
                    variant="primary"
                    size="lg"
                    onClick={() => setShowAddModal(true)}
                >
                    ➕ Add Student
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
                            placeholder="Search by name, email..."
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
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="input"
                        style={{ minWidth: '150px' }}
                    >
                        <option value="">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </Card>

            {/* Students Table */}
            <Card>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-gray-600)' }}>
                        Loading students...
                    </div>
                ) : students.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                        <div style={{ fontSize: '48px', marginBottom: 'var(--spacing-lg)' }}>👨‍🎓</div>
                        <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-lg)' }}>
                            No students found. Add your first student to get started!
                        </p>
                        <Button variant="primary" onClick={() => setShowAddModal(true)}>
                            Add Student
                        </Button>
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-200)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Name</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Email</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Year</th>
                                    <th style={{ textAlign: 'center', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Status</th>
                                    <th style={{ textAlign: 'center', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Sessions</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((student) => (
                                    <tr key={student.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                                {student.name || 'No name'}
                                            </div>
                                            {student.username && (
                                                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                                                    @{student.username}
                                                </div>
                                            )}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-gray-600)' }}>
                                            {student.email}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            {student.year || '-'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                            <span style={{
                                                display: 'inline-block',
                                                padding: 'var(--spacing-xs) var(--spacing-sm)',
                                                borderRadius: 'var(--border-radius-sm)',
                                                fontSize: 'var(--font-size-xs)',
                                                fontWeight: 'var(--font-weight-bold)',
                                                background: student.onboarded ? 'var(--color-mint-green)' : 'var(--color-gray-200)',
                                                border: '2px solid var(--color-black)'
                                            }}>
                                                {student.onboarded ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                            {student._count.live_sessions}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: 'var(--spacing-sm)', justifyContent: 'flex-end' }}>
                                                <Button variant="outline" size="sm" href={`/admin/students/${student.id}`}>
                                                    View
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Add Student Modal */}
            {showAddModal && (
                <AddStudentModal
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => {
                        setShowAddModal(false);
                        fetchStudents();
                    }}
                />
            )}
        </div>
    );
}

function AddStudentModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        year: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/admin/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to create student');
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
            <Card style={{ width: '100%', maxWidth: '500px', margin: 'var(--spacing-xl)' }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 'var(--spacing-xl)'
                }}>
                    <h2 style={{ fontSize: 'var(--font-size-xl)', fontWeight: 'var(--font-weight-bold)' }}>
                        Add New Student
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
                                Student Name *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="input"
                                required
                                placeholder="John Smith"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Email Address *
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="input"
                                required
                                placeholder="student@email.com"
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Year Group
                            </label>
                            <select
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                className="input"
                            >
                                <option value="">Select year...</option>
                                {Array.from({ length: 13 }, (_, i) => (
                                    <option key={i + 1} value={`Year ${i + 1}`}>Year {i + 1}</option>
                                ))}
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Adding...' : 'Add Student'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
