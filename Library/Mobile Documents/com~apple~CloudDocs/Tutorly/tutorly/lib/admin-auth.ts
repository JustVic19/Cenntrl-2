import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export type AllowedRole = 'ADMIN' | 'TUTOR' | 'STUDENT' | 'PARENT';

/**
 * Check if user has required role(s)
 * Returns the session if authorized, throws redirect/error if not
 */
export async function requireRole(allowedRoles: AllowedRole | AllowedRole[]) {
    const session = await auth();

    if (!session?.user) {
        return {
            authorized: false,
            error: NextResponse.json(
                { error: 'Unauthorized - Please sign in' },
                { status: 401 }
            ),
            session: null,
        };
    }

    const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
    const userRole = session.user.role as AllowedRole;

    if (!roles.includes(userRole)) {
        return {
            authorized: false,
            error: NextResponse.json(
                { error: 'Forbidden - Insufficient permissions' },
                { status: 403 }
            ),
            session: null,
        };
    }

    return {
        authorized: true,
        error: null,
        session,
    };
}

/**
 * Shorthand for requiring admin or tutor role
 */
export async function requireAdminOrTutor() {
    return requireRole(['ADMIN', 'TUTOR']);
}

/**
 * Shorthand for requiring admin role only
 */
export async function requireAdmin() {
    return requireRole('ADMIN');
}

/**
 * Check if user is admin or tutor (for client-side)
 */
export function isAdminOrTutor(role: string | undefined): boolean {
    return role === 'ADMIN' || role === 'TUTOR';
}

/**
 * Check if user is admin (for client-side)
 */
export function isAdmin(role: string | undefined): boolean {
    return role === 'ADMIN';
}
