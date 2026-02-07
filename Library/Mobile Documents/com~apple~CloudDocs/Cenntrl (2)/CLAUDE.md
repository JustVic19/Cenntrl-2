# CENNTRL - PROJECT CONTEXT

> **CRITICAL:** This file is the source of truth. Read it BEFORE every task.
> Update the relevant sections after completing each milestone.
> Never deviate from specifications without explicit user approval.

---

## PROJECT OVERVIEW

**Name:** Cenntrl
**Purpose:** AI-native unified command center for busy professionals
**Core Domains:** Goals, Finance, Health, Network
**Status:** 🔴 In Development - Week 1/12

---

## DESIGN SYSTEM (NON-NEGOTIABLE)

### Visual Identity
**CRITICAL:** Dashboard must look EXACTLY like Panze dashboard design.
- Reference image: `/design-references/panze-dashboard.png`
- Clean light slate grey background (slate-50)
- White cards with subtle shadows and rounded corners (12px)
- Match spacing, typography, colors EXACTLY

### Color Palette
```css
/* Background - Clean slate grey */
--dashboard-bg: #F8FAFC; /* slate-50 */
--card-bg: #FFFFFF;      /* white */

/* Domain Colors */
--goals-purple: #8B5CF6;
--finance-green: #10B981;
--health-orange: #F59E0B;
--network-sky: #0EA5E9;

/* Neutrals */
--navy: #0F172A;
--gray-800: #1E293B;
--gray-600: #475569;
--gray-400: #94A3B8;
--gray-200: #E2E8F0;
--gray-100: #F1F5F9;
--white: #FFFFFF;

/* Progress Bar Colors (from Panze) */
--overdue: #A855F7;    /* Purple */
--not-paid: #EF4444;   /* Red */
--partial: #3B82F6;    /* Blue */
--paid: #10B981;       /* Green */
--draft: #F59E0B;      /* Orange */
```

### Typography
```css
--font-primary: 'Inter', sans-serif;
--font-mono: 'JetBrains Mono', monospace;

/* Sizes - Match Panze exactly */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 2rem;      /* 32px */

/* Weights */
--font-regular: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Spacing (8px base)
```css
--space-1: 0.25rem;  /* 4px */
--space-2: 0.5rem;   /* 8px */
--space-3: 0.75rem;  /* 12px */
--space-4: 1rem;     /* 16px */
--space-5: 1.25rem;  /* 20px */
--space-6: 1.5rem;   /* 24px */
--space-8: 2rem;     /* 32px */
--space-12: 3rem;    /* 48px */
```

### Layout Structure
```
┌───────┬──────────────────────────────────────────┐
│ SIDE  │ MAIN CONTENT (gradient background)      │
│ BAR   │                                          │
│ 60px  │ ┌─────────────┬────────────┬──────────┐ │
│ icons │ │ Widget 1    │ Widget 2   │ Widget 3 │ │
│       │ │ (340px)     │ (500px)    │ (340px)  │ │
│ 🎯    │ │             │            │          │ │
│ 💰    │ │             │ ┌────────┐ │          │ │
│ 🏃    │ │             │ │ Chart  │ │          │ │
│ 🤝    │ │             │ └────────┘ │          │ │
│       │ │             │            │          │ │
│ ───   │ └─────────────┴────────────┴──────────┘ │
│ 📊    │                                          │
│ ⚙️    │                                          │
└───────┴──────────────────────────────────────────┘
```

---

## TECH STACK (LOCKED)

### Frontend
- **Framework:** Next.js 14.1+ (App Router)
- **Language:** TypeScript 5.3+
- **Styling:** TailwindCSS 3.4+ + shadcn/ui
- **Charts:** Recharts 2.10+
- **Icons:** Lucide React
- **Fonts:** Inter (body), JetBrains Mono (mono)
- **State:** Zustand + React Query
- **Forms:** React Hook Form + Zod
- **Animation:** Framer Motion (subtle only)

### Backend
- **Auth:** Better Auth (TypeScript-first)
- **Database:** Railway PostgreSQL 16
- **ORM:** Prisma 5.9+
- **Cache:** Railway Redis
- **File Storage:** Cloudflare R2

### External APIs
- **AI:** Anthropic Claude API
- **Finance:** Plaid API
- **Email:** Resend

---

## ARCHITECTURE PRINCIPLES

### File Structure (STRICT)
```
/app                    # Next.js App Router
  /(auth)              # Auth pages
  /(dashboard)         # Protected pages
  /api                 # API routes
/components
  /ui                  # shadcn/ui only
  /goals              # Goals components
  /finance            # Finance components
  /health             # Health components
  /network            # Network components
  /dashboard          # Dashboard components
/lib
  /auth               # Better Auth config
  /db                 # Prisma client
  /api                # API client functions (centralized)
  /utils              # Helper functions
/prisma               # Database schema
/types                # TypeScript types
/hooks                # Custom hooks
```

### Code Standards
- **TypeScript:** Strict mode, no `any` types
- **Components:** Functional, React Server Components default
- **Naming:** camelCase (variables), PascalCase (components), kebab-case (files)
- **Imports:** Absolute paths with `@/` prefix
- **Comments:** TSDoc format for functions, inline for complex logic
- **Error Handling:** Try-catch blocks, user-friendly messages

### Database Principles
- **Naming:** snake_case for tables/columns
- **Relations:** Cascade deletes where appropriate
- **Indexes:** Add for frequently queried fields
- **Migrations:** Always use Prisma Migrate
- **Soft Deletes:** Use `deleted_at` timestamp, don't hard delete user data

---

## CURRENT PROGRESS

### ✅ Completed
- [x] Project initialization
- [ ] Better Auth setup
- [ ] Database schema (Goals module)
- [ ] Sidebar navigation
- [ ] Dashboard layout (Panze style)

### 🔄 In Progress
- [ ] Goals module UI
- [ ] Goals CRUD API

### 📋 Upcoming
- [ ] Finance module
- [ ] Health module
- [ ] Network module
- [ ] AI insights

---

## BUILD SESSIONS (TRACK PROGRESS)

### Session 1: Project Setup ✅ Completed
**Goal:** Initialize Next.js + TailwindCSS + shadcn/ui
**Files:** All config files
**Completion:** [x]

### Session 2: Better Auth Setup ⚪ Not Started
**Goal:** Authentication system
**Files:** /lib/auth/*, /app/api/auth/*
**Completion:** [ ]

### Session 3: Database Schema (Goals) ⚪ Not Started
**Goal:** Prisma schema for Goals module
**Files:** /prisma/schema.prisma
**Completion:** [ ]

### Session 4: Dashboard Layout ⚪ Not Started
**Goal:** Panze-style layout with sidebar
**Files:** /app/(dashboard)/layout.tsx, /components/dashboard/*
**Completion:** [ ]

### Session 5: Goals Module UI ⚪ Not Started
**Goal:** Goals list and detail pages
**Files:** /app/(dashboard)/goals/*, /components/goals/*
**Completion:** [ ]

### Session 6: Goals API ⚪ Not Started
**Goal:** CRUD endpoints for goals
**Files:** /app/api/goals/*, /lib/api/goals.ts
**Completion:** [ ]

### Session 7: Finance Module ⚪ Not Started
**Goal:** Plaid integration + UI
**Files:** /app/(dashboard)/finance/*, /app/api/finance/*
**Completion:** [ ]

### Session 8: Health Module ⚪ Not Started
**Goal:** Manual health logging
**Files:** /app/(dashboard)/health/*, /app/api/health/*
**Completion:** [ ]

### Session 9: Network Module ⚪ Not Started
**Goal:** Contact management
**Files:** /app/(dashboard)/network/*, /app/api/network/*
**Completion:** [ ]

### Session 10: AI Insights ⚪ Not Started
**Goal:** Cross-domain insights with Claude API
**Files:** /app/api/ai/*, /components/dashboard/insights.tsx
**Completion:** [ ]

---

## ANTI-PATTERNS (NEVER DO THIS)

❌ **DON'T:**
- Deviate from Panze design without explicit approval
- Use Supabase (we use Railway + Better Auth)
- Use NextAuth (we use Better Auth)
- Create API routes that bypass the `/lib/api/*` abstraction
- Add features not in the current session scope
- Use inline styles (TailwindCSS only)
- Create components without TypeScript types
- Skip error handling
- Hard-code values (use env vars)
- Commit without testing

✅ **DO:**
- Match Panze design exactly
- Ask for clarification if scope is unclear
- Update CLAUDE.md after completing each session
- Test authentication flow after changes
- Run `prisma generate` after schema changes
- Use React Server Components by default
- Add loading states for async operations
- Validate user input with Zod
- Log errors for debugging

---

## DECISION LOG

### 2026-02-06: Tech Stack Finalized
- Switched from Supabase to Railway + Better Auth
- Reason: Better TypeScript support, no vendor lock-in
- Impact: More control, easier FastAPI migration later

### 2026-02-06: Design Locked to Panze
- Using Panze dashboard as exact reference
- Reason: Professional aesthetic, proven UX, matches brand
- Impact: No design decisions needed, just implementation

### 2026-02-06: Session 1 Completed
- Next.js 14.2.35 initialized with TypeScript, TailwindCSS, and shadcn/ui
- All UI components installed manually (due to npm cache permissions)
- Complete folder structure created per spec
- Prisma 7.3.0 installed successfully after npm cache fix
- Dev server runs successfully, no TypeScript or ESLint errors
- Impact: Ready for Session 2 (Better Auth setup)

### 2026-02-06: Design System Correction
- Corrected background from gradient to clean slate-50 (light grey)
- Updated to white cards with subtle shadows on slate background
- Reason: Accurate match to actual Panze dashboard aesthetic
- Impact: All future components will use clean, professional design

---

## NOTES FOR CLAUDE CODE

### When Starting a New Session:
1. Read this file completely
2. Identify which session you're working on
3. Review the design specs for that component
4. Check completed sessions for context
5. Ask user to confirm scope before starting

### When You're Unsure:
1. **STOP** - Don't guess
2. Ask the user for clarification
3. Reference this file or Panze design
4. Wait for explicit approval

### After Completing a Session:
1. Update "Current Progress" section
2. Mark session as ✅ Completed
3. Add any important decisions to Decision Log
4. Notify user of completion

### Red Flags to Watch For:
- User asks for feature not in current session → Confirm if we should add to backlog or do now
- Design differs from Panze → Clarify with user
- API pattern doesn't match `/lib/api/*` structure → Refactor
- TypeScript errors → Fix before proceeding
- No error handling → Add it

---

## QUICK REFERENCE

### Run Commands
```bash
# Development
npm run dev

# Database
npx prisma generate
npx prisma migrate dev
npx prisma studio

# Build
npm run build

# Lint
npm run lint
```

### Environment Variables Required
```bash
DATABASE_URL=
REDIS_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
ANTHROPIC_API_KEY=
PLAID_CLIENT_ID=
PLAID_SECRET=
CLOUDFLARE_R2_ENDPOINT=
CLOUDFLARE_R2_ACCESS_KEY=
CLOUDFLARE_R2_SECRET_KEY=
```

### Important URLs
- Design Reference: `/design-references/panze-dashboard.png`
- Docs: https://docs.cenntrl.app (coming soon)
- Staging: https://staging.cenntrl.app (coming soon)

---

## CONTACT

**Builder:** Victor
**Claude Code Version:** Verify you're using latest
**Project Start:** February 6, 2026
**Target Launch:** April 2026 (12 weeks)

---

**Last Updated:** 2026-02-06
**Updated By:** Victor
**Version:** 1.0.0
