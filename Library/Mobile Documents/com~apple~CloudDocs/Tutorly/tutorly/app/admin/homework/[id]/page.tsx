'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface Submission {
    id: string;
    fileUrl: string | null;
    submittedAt: string;
    grade: string | null;
    feedback: string | null;
    graded: boolean;
    student: {
        id: string;
        name: string | null;
        email: string;
        year: string | null;
    };
}

interface Homework {
    id: string;
    title: string;
    description: string | null;
    fileUrl: string | null;
    dueDate: string | null;
    yearGroup: string | null;
    createdAt: string;
    submissions: Submission[];
}

export default function HomeworkDetailPage() {
    const params = useParams();
    const [homework, setHomework] = useState<Homework | null>(null);
    const [loading, setLoading] = useState(true);
    const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null);

    useEffect(() => {
        fetchHomework();
    }, [params.id]);

    async function fetchHomework() {
        try {
            const res = await fetch(`/api/admin/homework/${params.id}`);
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
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    if (loading) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)', color: 'var(--color-gray-600)' }}>
                Loading...
            </div>
        );
    }

    if (!homework) {
        return (
            <Card>
                <div style={{ textAlign: 'center', padding: 'var(--spacing-2xl)' }}>
                    <p>Homework not found</p>
                    <Button variant="primary" href="/admin/homework">Back to Homework</Button>
                </div>
            </Card>
        );
    }

    return (
        <div>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
                <Button variant="outline" size="sm" href="/admin/homework" style={{ marginBottom: 'var(--spacing-md)' }}>
                    ← Back to Homework
                </Button>
                <h1 style={{
                    fontSize: 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-sm)',
                    color: 'var(--color-gray-900)'
                }}>
                    {homework.title}
                </h1>
                {homework.description && (
                    <p style={{ color: 'var(--color-gray-600)', marginBottom: 'var(--spacing-md)' }}>
                        {homework.description}
                    </p>
                )}
                <div style={{ display: 'flex', gap: 'var(--spacing-xl)', fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                    <span>📅 Due: {formatDate(homework.dueDate)}</span>
                    {homework.yearGroup && <span>👨‍🎓 Assigned to: {homework.yearGroup}</span>}
                    {homework.fileUrl && (
                        <a href={homework.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-royal-blue)' }}>
                            📎 View Attachment
                        </a>
                    )}
                </div>
            </div>

            {/* Submissions */}
            <Card>
                <h2 style={{
                    fontSize: 'var(--font-size-xl)',
                    fontWeight: 'var(--font-weight-bold)',
                    marginBottom: 'var(--spacing-lg)'
                }}>
                    Submissions ({homework.submissions.length})
                </h2>

                {homework.submissions.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: 'var(--spacing-xl)', color: 'var(--color-gray-600)' }}>
                        No submissions yet
                    </div>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid var(--color-gray-200)' }}>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Student</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Year</th>
                                    <th style={{ textAlign: 'left', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Submitted</th>
                                    <th style={{ textAlign: 'center', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>File</th>
                                    <th style={{ textAlign: 'center', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Grade</th>
                                    <th style={{ textAlign: 'right', padding: 'var(--spacing-md)', fontWeight: 'var(--font-weight-bold)' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {homework.submissions.map((sub) => (
                                    <tr key={sub.id} style={{ borderBottom: '1px solid var(--color-gray-100)' }}>
                                        <td style={{ padding: 'var(--spacing-md)' }}>
                                            <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>
                                                {sub.student.name || 'Unknown'}
                                            </div>
                                            <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>
                                                {sub.student.email}
                                            </div>
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-gray-600)' }}>
                                            {sub.student.year || '-'}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', color: 'var(--color-gray-600)' }}>
                                            {formatDate(sub.submittedAt)}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                            {sub.fileUrl ? (
                                                <a href={sub.fileUrl} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-royal-blue)' }}>
                                                    📎 View
                                                </a>
                                            ) : (
                                                <span style={{ color: 'var(--color-gray-400)' }}>-</span>
                                            )}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'center' }}>
                                            {sub.graded ? (
                                                <span style={{
                                                    padding: 'var(--spacing-xs) var(--spacing-sm)',
                                                    background: 'var(--color-mint-green)',
                                                    borderRadius: 'var(--border-radius-sm)',
                                                    fontWeight: 'var(--font-weight-bold)',
                                                    border: '2px solid var(--color-black)'
                                                }}>
                                                    {sub.grade}
                                                </span>
                                            ) : (
                                                <span style={{ color: 'var(--color-gray-400)' }}>Not graded</span>
                                            )}
                                        </td>
                                        <td style={{ padding: 'var(--spacing-md)', textAlign: 'right' }}>
                                            <Button
                                                variant={sub.graded ? "outline" : "primary"}
                                                size="sm"
                                                onClick={() => setGradingSubmission(sub)}
                                            >
                                                {sub.graded ? 'Edit Grade' : 'Grade'}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </Card>

            {/* Grading Modal */}
            {gradingSubmission && (
                <GradeModal
                    submission={gradingSubmission}
                    homeworkId={homework.id}
                    onClose={() => setGradingSubmission(null)}
                    onSuccess={() => {
                        setGradingSubmission(null);
                        fetchHomework();
                    }}
                />
            )}
        </div>
    );
}

function GradeModal({
    submission,
    homeworkId,
    onClose,
    onSuccess
}: {
    submission: Submission;
    homeworkId: string;
    onClose: () => void;
    onSuccess: () => void
}) {
    const [grade, setGrade] = useState(submission.grade || '');
    const [feedback, setFeedback] = useState(submission.feedback || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch(`/api/admin/homework/${homeworkId}/submissions/${submission.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ grade, feedback }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || 'Failed to save grade');
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
                        Grade Submission
                    </h2>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: 'var(--font-size-xl)', cursor: 'pointer' }}
                    >
                        ✕
                    </button>
                </div>

                <div style={{ marginBottom: 'var(--spacing-lg)', padding: 'var(--spacing-md)', background: 'var(--color-gray-50)', borderRadius: 'var(--border-radius-md)' }}>
                    <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{submission.student.name}</div>
                    <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)' }}>{submission.student.email}</div>
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
                                Grade
                            </label>
                            <input
                                type="text"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="input"
                                placeholder="e.g., A+, 85%, Good work!"
                            />
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-500)', marginTop: 'var(--spacing-xs)' }}>
                                Enter any grade format you prefer
                            </p>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                Feedback
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="input"
                                rows={4}
                                placeholder="Comments for the student..."
                                style={{ resize: 'vertical' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-md)' }}>
                            <Button type="button" variant="outline" onClick={onClose} style={{ flex: 1 }}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" disabled={loading} style={{ flex: 1 }}>
                                {loading ? 'Saving...' : 'Save Grade'}
                            </Button>
                        </div>
                    </div>
                </form>
            </Card>
        </div>
    );
}
