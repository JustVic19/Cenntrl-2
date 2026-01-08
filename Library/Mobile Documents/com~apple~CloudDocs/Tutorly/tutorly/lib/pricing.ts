// Pricing utility functions for Tutorly subscriptions

export type PlanType = 'contact';

export interface PlanDetails {
    name: string;
    tagline: string;
    description: string;
    features: string[];
    cta: string;
    ctaLink: string;
}

export const PLANS: Record<PlanType, PlanDetails> = {
    contact: {
        name: 'Contact Me',
        tagline: 'Personalized Tutoring Tailored to Your Needs',
        description: 'Get in touch to discuss a customized learning plan for your child.',
        features: [
            '2-3 sessions per week',
            'Personalized learning path',
            'Progress tracking & reports',
            'Regular parent updates',
            'Homework support',
            'Exam preparation',
            'Flexible scheduling',
            'One-on-one attention',
        ],
        cta: 'Contact Me',
        ctaLink: '/contact',
    },
};

/**
 * Get plan details
 */
export function getPlanDetails(plan: PlanType): PlanDetails {
    return PLANS[plan];
}

/**
 * Validate plan type
 */
export function isValidPlan(plan: string): plan is PlanType {
    return plan === 'contact';
}
