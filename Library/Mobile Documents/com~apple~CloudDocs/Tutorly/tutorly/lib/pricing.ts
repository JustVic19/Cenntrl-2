// Pricing utility functions for Tutorly subscriptions

export type PlanType = 'steady' | 'focus';

export interface PlanDetails {
    name: string;
    monthlyPrice: number;
    hourlyRate: number;
    sessionDuration: number; // in hours
    description: string;
    target: string;
}

export const PLANS: Record<PlanType, PlanDetails> = {
    steady: {
        name: 'Steady',
        monthlyPrice: 100,
        hourlyRate: 25,
        sessionDuration: 1,
        description: 'Perfect for early years students (Years 1-4). Weekly 1-hour sessions to build strong foundations.',
        target: 'Years 1-4',
    },
    focus: {
        name: 'Focus',
        monthlyPrice: 320,
        hourlyRate: 40,
        sessionDuration: 2,
        description: 'Ideal for older students (Years 4+). Intensive 2-hour sessions for exam preparation and advanced learning.',
        target: 'Years 4+',
    },
};

/**
 * Get the monthly price for a plan (flat rate)
 */
export function getMonthlyPrice(plan: PlanType): number {
    return PLANS[plan].monthlyPrice;
}

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
    return plan === 'steady' || plan === 'focus';
}

/**
 * Format price for display
 */
export function formatPrice(amount: number): string {
    return `£${amount.toFixed(2)}`;
}
