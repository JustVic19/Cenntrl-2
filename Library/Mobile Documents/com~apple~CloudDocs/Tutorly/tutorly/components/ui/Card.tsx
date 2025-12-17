import React from 'react';

export interface CardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    style?: React.CSSProperties;
}

export default function Card({ children, className = '', hover = true, style }: CardProps) {
    const classes = `card ${hover ? '' : 'no-hover'} ${className}`.trim();

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    );
}
