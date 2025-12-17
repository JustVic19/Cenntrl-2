import React from 'react';
import Card from './Card';
import Button from './Button';

export interface ClassCardProps {
    title: string;
    subject: string;
    description: string;
    price: number;
    ageGroup?: string;
    schedule?: string;
    stripeProductId?: string;
}

export default function ClassCard({
    title,
    subject,
    description,
    price,
    ageGroup,
    schedule,
}: ClassCardProps) {
    return (
        <Card className="flex flex-col" style={{ height: '100%' }}>
            <div className="badge mb-md">{subject}</div>

            <h3 style={{ marginBottom: 'var(--spacing-md)' }}>
                {title}
            </h3>

            <p style={{
                color: 'var(--color-gray-700)',
                fontSize: 'var(--font-size-base)',
                marginBottom: 'var(--spacing-lg)',
                flexGrow: 1
            }}>
                {description}
            </p>

            {/* Details */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--spacing-sm)',
                marginBottom: 'var(--spacing-xl)'
            }}>
                {ageGroup && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <span style={{ fontSize: 'var(--font-size-base)' }}>👥</span>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                            {ageGroup}
                        </span>
                    </div>
                )}

                {schedule && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)' }}>
                        <span style={{ fontSize: 'var(--font-size-base)' }}>📅</span>
                        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-gray-700)' }}>
                            {schedule}
                        </span>
                    </div>
                )}
            </div>
        </Card>
    );
}
