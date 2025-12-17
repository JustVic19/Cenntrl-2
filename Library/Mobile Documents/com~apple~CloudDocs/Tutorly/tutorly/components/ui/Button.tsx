import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'royal' | 'pink' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    href?: string;
}

export default function Button({
    variant = 'primary',
    size = 'md',
    children,
    href,
    className = '',
    ...props
}: ButtonProps) {
    const variantClass = `btn-${variant}`;
    const sizeClass = size !== 'md' ? `btn-${size}` : '';
    const classes = `btn ${variantClass} ${sizeClass} ${className}`.trim();

    if (href) {
        return (
            <a href={href} className={classes}>
                {children}
            </a>
        );
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
