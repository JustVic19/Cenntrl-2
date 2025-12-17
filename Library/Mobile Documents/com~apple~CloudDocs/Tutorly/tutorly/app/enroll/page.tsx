'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { PLANS, PlanType, isValidPlan, formatPrice } from '@/lib/pricing';

// Course options
const COURSES = [
    { id: 'ks1', name: 'KS1 Foundation Programme', years: 'Years 1-3' },
    { id: 'ks2', name: 'KS2 Core Skills Programme', years: 'Years 4-6' },
    { id: 'ks3', name: 'KS3 Academic Programme', years: 'Years 7-9' },
    { id: '11plus', name: '11 Plus Entrance Exam Preparation', years: 'Years 4-6' },
    { id: 'private-school', name: 'Private School Entrance Preparation', years: 'Years 4-6 & 8-11' },
    { id: 'gcse', name: 'GCSE Exam Preparation', years: 'Years 7-11' },
    { id: 'sat', name: 'SAT Exam Preparation', years: 'Years 6-7' },
];

export default function EnrollPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const planParam = searchParams.get('plan') as PlanType;

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [sessionsPerWeek, setSessionsPerWeek] = useState(2);
    const [studentInfo, setStudentInfo] = useState({
        name: '',
        email: '',
        year: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Validate plan
    useEffect(() => {
        if (!planParam || !isValidPlan(planParam)) {
            router.push('/prices');
        }
    }, [planParam, router]);

    if (!planParam || !isValidPlan(planParam)) {
        return null;
    }

    const plan = PLANS[planParam];

    const handleCourseToggle = (courseId: string) => {
        setSelectedCourses(prev =>
            prev.includes(courseId)
                ? prev.filter(id => id !== courseId)
                : [...prev, courseId]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (selectedCourses.length === 0) {
            alert('Please select at least one course');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/stripe/create-checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    plan: planParam,
                    courses: selectedCourses,
                    sessionsPerWeek: planParam === 'focus' ? sessionsPerWeek : 1,
                    studentInfo,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to create checkout session');
            }

            // Redirect to Stripe Checkout
            window.location.href = data.url;
        } catch (error) {
            console.error('Enrollment error:', error);
            alert('Failed to start checkout. Please try again.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section">
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
                {/* Header */}
                <div className="text-center mb-2xl">
                    <div className="badge mb-lg">Enrollment</div>
                    <h1 style={{ marginBottom: 'var(--spacing-lg)' }}>
                        Enroll in {plan.name} Plan
                    </h1>
                    <p style={{ fontSize: 'var(--font-size-xl)', color: 'var(--color-gray-700)' }}>
                        {plan.description}
                    </p>
                </div>

                {/* Plan Summary Card */}
                <Card style={{ marginBottom: 'var(--spacing-2xl)', background: 'var(--color-royal-blue)', color: 'white' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <h3 style={{ marginBottom: 'var(--spacing-sm)', color: 'white' }}>{plan.name} Plan</h3>
                            <p style={{ marginBottom: 0, opacity: 0.9 }}>{plan.target}</p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 'var(--font-size-4xl)', fontWeight: 'var(--font-weight-black)' }}>
                                {formatPrice(plan.monthlyPrice)}
                            </div>
                            <div style={{ opacity: 0.9 }}>per month</div>
                        </div>
                    </div>
                </Card>

                <form onSubmit={handleSubmit}>
                    {/* Course Selection */}
                    <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Select Courses</h3>
                        <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-xl)' }}>
                            Choose the subjects you need help with. Price remains {formatPrice(plan.monthlyPrice)}/month regardless of courses selected.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-md)' }}>
                            {COURSES.map(course => (
                                <label
                                    key={course.id}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 'var(--spacing-md)',
                                        padding: 'var(--spacing-md)',
                                        border: selectedCourses.includes(course.id)
                                            ? '3px solid var(--color-royal-blue)'
                                            : '3px solid var(--color-gray-300)',
                                        borderRadius: 'var(--border-radius-md)',
                                        cursor: 'pointer',
                                        background: selectedCourses.includes(course.id)
                                            ? 'var(--color-blue-50)'
                                            : 'white',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedCourses.includes(course.id)}
                                        onChange={() => handleCourseToggle(course.id)}
                                        style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                    />
                                    <div style={{ flexGrow: 1 }}>
                                        <div style={{ fontWeight: 'var(--font-weight-semibold)' }}>{course.name}</div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-600)' }}>
                                            {course.years}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </Card>

                    {/* Session Frequency (Focus only) */}
                    {planParam === 'focus' && (
                        <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
                            <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Sessions Per Week</h3>
                            <p style={{ color: 'var(--color-gray-700)', marginBottom: 'var(--spacing-xl)' }}>
                                Choose your preferred session frequency. This is a preference and doesn't affect pricing.
                            </p>

                            <div style={{ display: 'flex', gap: 'var(--spacing-md)' }}>
                                {[2, 3].map(num => (
                                    <label
                                        key={num}
                                        style={{
                                            flex: 1,
                                            padding: 'var(--spacing-lg)',
                                            border: sessionsPerWeek === num
                                                ? '4px solid var(--color-vibrant-pink)'
                                                : '3px solid var(--color-gray-300)',
                                            borderRadius: 'var(--border-radius-md)',
                                            cursor: 'pointer',
                                            textAlign: 'center',
                                            background: sessionsPerWeek === num
                                                ? 'var(--color-pink-50)'
                                                : 'white',
                                            transition: 'all 0.2s',
                                        }}
                                    >
                                        <input
                                            type="radio"
                                            name="sessions"
                                            value={num}
                                            checked={sessionsPerWeek === num}
                                            onChange={() => setSessionsPerWeek(num)}
                                            style={{ display: 'none' }}
                                        />
                                        <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 'var(--font-weight-black)' }}>
                                            {num}
                                        </div>
                                        <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                                            sessions per week
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </Card>
                    )}

                    {/* Student Information */}
                    <Card style={{ marginBottom: 'var(--spacing-2xl)' }}>
                        <h3 style={{ marginBottom: 'var(--spacing-lg)' }}>Student Information</h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    Student Name *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={studentInfo.name}
                                    onChange={e => setStudentInfo({ ...studentInfo, name: e.target.value })}
                                    placeholder="Full name"
                                />
                            </div>

                            <div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                        Parent Email *
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        className="input"
                                        value={studentInfo.email}
                                        onChange={e => setStudentInfo({ ...studentInfo, email: e.target.value })}
                                        placeholder="parent@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label style={{ display: 'block', marginBottom: 'var(--spacing-sm)', fontWeight: 'var(--font-weight-semibold)' }}>
                                    Year Group *
                                </label>
                                <input
                                    type="text"
                                    required
                                    className="input"
                                    value={studentInfo.year}
                                    onChange={e => setStudentInfo({ ...studentInfo, year: e.target.value })}
                                    placeholder="e.g., Year 5"
                                />
                            </div>
                        </div>
                    </Card>

                    {/* Submit Button */}
                    <Card style={{ background: 'var(--color-bright-yellow)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-lg)' }}>
                            <div>
                                <h4 style={{ marginBottom: 'var(--spacing-xs)' }}>Ready to Proceed?</h4>
                                <p style={{ marginBottom: 0, color: 'var(--color-gray-700)' }}>
                                    {selectedCourses.length} course{selectedCourses.length !== 1 ? 's' : ''} selected
                                </p>
                            </div>
                            <Button
                                variant="royal"
                                size="lg"
                                type="submit"
                                disabled={isSubmitting || selectedCourses.length === 0}
                            >
                                {isSubmitting ? 'Redirecting...' : `Proceed to Payment - ${formatPrice(plan.monthlyPrice)}/month`}
                            </Button>
                        </div>
                    </Card>
                </form>
            </div>
        </div>
    );
}
