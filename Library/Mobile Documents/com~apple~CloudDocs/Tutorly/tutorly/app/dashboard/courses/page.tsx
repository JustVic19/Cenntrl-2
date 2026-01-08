'use client';

import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

export default function CoursesPage() {
    const { data: session } = useSession();
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const ageGroup = session?.user?.ageGroup || 'years_4_plus';
    const isYoung = ageGroup === 'years_1_4';

    const [filter, setFilter] = useState<'all' | 'in-progress' | 'completed'>('all');

    // Fetch courses from API
    useEffect(() => {
        if (session?.user?.id) {
            fetch('/api/user/dashboard')
                .then(res => res.json())
                .then(data => {
                    if (data.courses) {
                        // Map courses to include display properties
                        const mappedCourses = data.courses.map((course: any) => ({
                            ...course,
                            title: course.name,
                            icon: course.subject === 'Maths' ? '🧮' : course.subject === 'English' ? '📖' : '🔬',
                            description: `Master key concepts in ${course.subject}`,
                            lessonsTotal: course.totalLessons || 12,
                            lessonsCompleted: Math.floor((course.progress / 100) * (course.totalLessons || 12)),
                            nextLesson: course.nextLesson || 'To be scheduled',
                            color: course.subject === 'Maths' ? '#FFE5F1' : course.subject === 'English' ? '#FFF5CC' : '#E5FFE5',
                        }));
                        setCourses(mappedCourses);
                    }
                    setLoading(false);
                })
                .catch(err => {
                    console.error('Failed to fetch courses:', err);
                    setLoading(false);
                });
        }
    }, [session]);

    // Filter courses based on selection
    const filteredCourses = courses.filter((course) => {
        if (filter === 'in-progress') return course.progress > 0 && course.progress < 100;
        if (filter === 'completed') return course.progress === 100;
        return true;
    });

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: 'var(--spacing-2xl)' }}>
                <h1 style={{
                    fontSize: isYoung ? 'var(--font-size-4xl)' : 'var(--font-size-3xl)',
                    fontWeight: 'var(--font-weight-black)',
                    marginBottom: 'var(--spacing-md)',
                    color: 'var(--color-gray-900)'
                }}>
                    {isYoung ? '📚 My Courses' : 'My Courses'}
                </h1>
                <p style={{
                    fontSize: isYoung ? 'var(--font-size-xl)' : 'var(--font-size-lg)',
                    color: 'var(--color-gray-700)'
                }}>
                    {isYoung ? 'Keep learning and having fun! 🌟' : 'Track your progress across all courses'}
                </p>
            </div>

            {/* Filter Tabs */}
            <div style={{
                display: 'flex',
                gap: 'var(--spacing-md)',
                marginBottom: 'var(--spacing-2xl)',
                flexWrap: 'wrap'
            }}>
                <button
                    onClick={() => setFilter('all')}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: filter === 'all' ? 'var(--color-royal-blue)' : 'white',
                        color: filter === 'all' ? 'white' : 'var(--color-gray-700)',
                        border: '3px solid var(--color-gray-900)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-bold)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    All Courses ({courses.length})
                </button>
                <button
                    onClick={() => setFilter('in-progress')}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: filter === 'in-progress' ? 'var(--color-bright-yellow)' : 'white',
                        color: 'var(--color-gray-900)',
                        border: '3px solid var(--color-gray-900)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-bold)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    In Progress
                </button>
                <button
                    onClick={() => setFilter('completed')}
                    style={{
                        padding: 'var(--spacing-md) var(--spacing-xl)',
                        background: filter === 'completed' ? 'var(--color-mint-green)' : 'white',
                        color: 'var(--color-gray-900)',
                        border: '3px solid var(--color-gray-900)',
                        borderRadius: 'var(--border-radius-md)',
                        fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                        fontWeight: 'var(--font-weight-bold)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    Completed
                </button>
            </div>

            {/* Courses Grid */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: 'var(--spacing-xl)'
            }}>
                {filteredCourses.map((course) => (
                    <Card key={course.id} style={{
                        padding: 'var(--spacing-xl)',
                        background: isYoung ? course.color : 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--spacing-lg)'
                    }}>
                        {/* Course Icon & Title */}
                        <div>
                            <div style={{
                                fontSize: isYoung ? '64px' : '48px',
                                marginBottom: 'var(--spacing-md)'
                            }}>
                                {course.icon}
                            </div>
                            <h3 style={{
                                fontSize: isYoung ? 'var(--font-size-2xl)' : 'var(--font-size-xl)',
                                fontWeight: 'var(--font-weight-black)',
                                marginBottom: 'var(--spacing-xs)',
                                color: 'var(--color-royal-blue)'
                            }}>
                                {course.title}
                            </h3>
                            <p style={{
                                fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                color: 'var(--color-gray-600)'
                            }}>
                                {course.description}
                            </p>
                        </div>

                        {/* Progress Section */}
                        <div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: 'var(--color-gray-700)'
                                }}>
                                    Progress
                                </span>
                                <span style={{
                                    fontSize: isYoung ? 'var(--font-size-lg)' : 'var(--font-size-base)',
                                    fontWeight: 'var(--font-weight-bold)',
                                    color: 'var(--color-royal-blue)'
                                }}>
                                    {course.progress}%
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div style={{
                                height: isYoung ? '16px' : '12px',
                                background: 'var(--color-gray-200)',
                                border: '3px solid var(--color-gray-900)',
                                borderRadius: 'var(--border-radius-sm)',
                                overflow: 'hidden',
                                marginBottom: 'var(--spacing-sm)'
                            }}>
                                <div style={{
                                    width: `${course.progress}%`,
                                    height: '100%',
                                    background: course.progress === 100
                                        ? 'var(--color-mint-green)'
                                        : 'var(--color-bright-yellow)',
                                    transition: 'width 0.3s ease'
                                }} />
                            </div>

                            <p style={{
                                fontSize: 'var(--font-size-sm)',
                                color: 'var(--color-gray-600)'
                            }}>
                                {course.lessonsCompleted} of {course.lessonsTotal} lessons completed
                            </p>
                        </div>

                        {/* Next Lesson */}
                        {course.progress < 100 && (
                            <div style={{
                                padding: 'var(--spacing-md)',
                                background: isYoung ? 'rgba(255,255,255,0.5)' : 'var(--color-light-beige)',
                                border: '2px solid var(--color-gray-900)',
                                borderRadius: 'var(--border-radius-sm)'
                            }}>
                                <p style={{
                                    fontSize: 'var(--font-size-xs)',
                                    color: 'var(--color-gray-600)',
                                    marginBottom: 'var(--spacing-xs)',
                                    textTransform: 'uppercase',
                                    fontWeight: 'var(--font-weight-semibold)'
                                }}>
                                    Next Lesson
                                </p>
                                <p style={{
                                    fontSize: isYoung ? 'var(--font-size-base)' : 'var(--font-size-sm)',
                                    fontWeight: 'var(--font-weight-semibold)',
                                    color: 'var(--color-gray-900)'
                                }}>
                                    {course.nextLesson}
                                </p>
                            </div>
                        )}

                        {/* Actions */}
                        <div style={{ display: 'flex', gap: 'var(--spacing-sm)' }}>
                            <Button
                                variant={course.progress === 100 ? 'outline' : 'primary'}
                                size="md"
                                style={{ flex: 1 }}
                            >
                                {course.progress === 100 ? '✓ Review Course' : 'Continue Learning →'}
                            </Button>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Loading and Empty State */}
            {loading ? (
                <Card style={{ padding: 'var(--spacing-2xl)', textAlign: 'center' }}>
                    <p>Loading your courses...</p>
                </Card>
            ) : filteredCourses.length === 0 && (
                <Card style={{
                    padding: 'var(--spacing-2xl)',
                    textAlign: 'center'
                }}>
                    <div style={{ fontSize: '64px', marginBottom: 'var(--spacing-md)' }}>📚</div>
                    <h3 style={{
                        fontSize: 'var(--font-size-2xl)',
                        fontWeight: 'var(--font-weight-black)',
                        marginBottom: 'var(--spacing-sm)',
                        color: 'var(--color-gray-900)'
                    }}>
                        {courses.length === 0 ? 'No courses enrolled yet' : 'No courses found'}
                    </h3>
                    <p style={{
                        fontSize: 'var(--font-size-lg)',
                        color: 'var(--color-gray-600)',
                        marginBottom: 'var(--spacing-lg)'
                    }}>
                        {courses.length === 0
                            ? 'Complete your payment to start learning!'
                            : 'Try a different filter'}
                    </p>
                    {courses.length === 0 && (
                        <Button variant="primary" size="lg" href="/contact">
                            Browse Courses
                        </Button>
                    )}
                </Card>
            )}
        </div>
    );
}
