import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/prisma"
import GoogleProvider from "next-auth/providers/google"
import AppleProvider from "next-auth/providers/apple"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify",
        newUser: "/onboarding",
    },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        AppleProvider({
            clientId: process.env.APPLE_CLIENT_ID!,
            clientSecret: process.env.APPLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Invalid credentials");
                }

                const user = await prisma.users.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                });

                if (!user || !user.password) {
                    throw new Error("Invalid credentials");
                }

                const isCorrectPassword = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!isCorrectPassword) {
                    throw new Error("Invalid credentials");
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    username: user.username,
                    year: user.year,
                    ageGroup: user.ageGroup,
                    onboarded: user.onboarded,
                };
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.username = token.username as string | undefined;
                session.user.year = token.year as string | undefined;
                session.user.ageGroup = token.ageGroup as string | undefined;
                session.user.onboarded = token.onboarded as boolean;
            }
            return session;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
                token.username = user.username;
                token.year = user.year;
                token.ageGroup = user.ageGroup;
                token.onboarded = user.onboarded;
            }

            // Update token if session was updated
            if (trigger === "update" && session) {
                token = { ...token, ...session.user };
            }

            return token;
        },
        async signIn({ user, account }) {
            // For OAuth providers, create user if doesn't exist
            if (account?.provider !== "credentials") {
                const existingUser = await prisma.users.findUnique({
                    where: { email: user.email! },
                });

                if (!existingUser) {
                    // New user from OAuth - redirect to onboarding
                    return true;
                }
            }
            return true;
        },
    },
    events: {
        async linkAccount({ user }) {
            await prisma.users.update({
                where: { id: user.id },
                data: { emailVerified: new Date() },
            });
        },
    },
    debug: process.env.NODE_ENV === "development",
});
