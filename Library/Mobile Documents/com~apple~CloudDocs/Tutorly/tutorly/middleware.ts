import { auth } from "@/auth"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Protected routes that require authentication
const protectedRoutes = ["/dashboard"]

export default async function middleware(request: NextRequest) {
    const session = await auth()
    const { pathname } = request.nextUrl

    // Check if the route is protected
    const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.startsWith(route)
    )

    // Redirect to sign-in if accessing protected route without session
    if (isProtectedRoute && !session) {
        const signInUrl = new URL("/auth/signin", request.url)
        signInUrl.searchParams.set("callbackUrl", pathname)
        return NextResponse.redirect(signInUrl)
    }

    // Redirect to onboarding if user hasn't completed onboarding
    if (
        session &&
        !session.user.onboarded &&
        !pathname.startsWith("/onboarding") &&
        !pathname.startsWith("/api") &&
        !pathname.startsWith("/auth")
    ) {
        return NextResponse.redirect(new URL("/onboarding", request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ["/((?!_next/static|_next/image|favicon.ico|public).*)"],
}
