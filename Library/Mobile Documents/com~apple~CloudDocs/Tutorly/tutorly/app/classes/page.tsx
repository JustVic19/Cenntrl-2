import React from 'react';
import ClassCard from '@/components/ui/ClassCard';

// UK-based courses data (will eventually come from database)
const classes = [
    {
        id: '1',
        title: 'KS1 Foundation Programme',
        subject: 'Foundation',
        description: 'Build strong foundational skills in Maths, English, and SPaG. Our engaging sessions make learning fun and effective, setting your child up for academic success from the very beginning.',
        price: 25,
        ageGroup: 'Years 1-3',
        schedule: '1-hour sessions',
    },
    {
        id: '2',
        title: 'KS2 Core Skills Programme',
        subject: 'Primary',
        description: 'Master essential Maths, English, Science, and SPaG concepts. Tailored lessons that build confidence and prepare students for the transition to secondary school with comprehensive subject coverage.',
        price: 40,
        ageGroup: 'Years 4-6',
        schedule: '2-hour sessions',
    },
    {
        id: '3',
        title: 'KS3 Academic Programme',
        subject: 'Secondary',
        description: 'Comprehensive tutoring in Maths, English, and all three sciences (Biology, Physics, Chemistry). Perfect for students building their knowledge base and developing critical thinking skills for GCSE preparation.',
        price: 40,
        ageGroup: 'Years 7-9',
        schedule: '2-hour sessions',
    },
    {
        id: '4',
        title: '11 Plus Entrance Exam Preparation',
        subject: 'Exam Prep',
        description: 'Intensive preparation covering Maths, English, Verbal & Non-verbal Reasoning, Creative Writing, SPaG, and CATS. Proven strategies and practice materials to maximize your child\'s chances of grammar school admission.',
        price: 40,
        ageGroup: 'Years 4-6',
        schedule: '2-hour sessions',
    },
    {
        id: '5',
        title: 'Private School Entrance Preparation',
        subject: 'Exam Prep',
        description: 'Specialized coaching for competitive private school entry exams. Covers Maths, English, CATs, and school-specific assessments. Personalized preparation tailored to your target schools\' requirements.',
        price: 40,
        ageGroup: 'Years 4-6 & Years 8-11',
        schedule: '2-hour sessions',
    },
    {
        id: '6',
        title: 'GCSE Exam Preparation',
        subject: 'GCSE',
        description: 'Expert GCSE tutoring in Maths, English, Biology, Chemistry, and Physics. Focused exam technique, comprehensive syllabus coverage, and proven revision strategies to achieve top grades.',
        price: 40,
        ageGroup: 'Years 7-11',
        schedule: '2-hour sessions',
    },
    {
        id: '7',
        title: 'SAT Exam Preparation',
        subject: 'Test Prep',
        description: 'Comprehensive SAT preparation covering all key curriculum areas. Build confidence and master the skills needed to excel in these important national assessments with targeted practice and exam strategies.',
        price: 40,
        ageGroup: 'Years 6-7',
        schedule: '2-hour sessions',
    },
];

export default function ClassesPage() {
    return (
        <>
            {/* Hero Section */}
            <section className="section bg-cream">
                <div className="container">
                    <div className="text-center" style={{ maxWidth: '800px', margin: '0 auto' }}>
                        <div className="badge mb-lg">📚 Our Classes</div>

                        <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>
                            Find the Perfect Class for Your Goals
                        </h1>

                        <p style={{
                            fontSize: 'var(--font-size-xl)',
                            color: 'var(--color-gray-700)',
                            marginBottom: 0
                        }}>
                            Expert-led tutoring sessions designed to help you master any subject. Choose from our range of specialized courses tailored to your academic level.
                        </p>
                    </div>
                </div>
            </section>

            {/* Classes Grid */}
            <section className="section">
                <div className="container">
                    <div className="grid grid-3">
                        {classes.map((classItem) => (
                            <ClassCard
                                key={classItem.id}
                                title={classItem.title}
                                subject={classItem.subject}
                                description={classItem.description}
                                price={classItem.price}
                                ageGroup={classItem.ageGroup}
                                schedule={classItem.schedule}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="section bg-pink">
                <div className="container text-center">
                    <h2 style={{ color: 'var(--color-white)', marginBottom: 'var(--spacing-lg)' }}>
                        Don't See What You're Looking For?
                    </h2>

                    <p style={{
                        fontSize: 'var(--font-size-xl)',
                        color: 'var(--color-white)',
                        marginBottom: 'var(--spacing-2xl)',
                        maxWidth: '700px',
                        margin: '0 auto var(--spacing-2xl)'
                    }}>
                        We offer custom tutoring programs tailored to your specific needs. Contact us to discuss your goals!
                    </p>

                    <div style={{ display: 'flex', gap: 'var(--spacing-lg)', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/contact" className="btn btn-primary btn-lg">
                            Contact Us
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
