# Database Setup Required

## Current Status

✅ **Webhook handler created** at `/app/api/stripe/webhook/route.ts`
❌ **Database not configured** - Migration cannot run

## Issue

The Prisma migration failed because `DATABASE_URL` is not set in `.env.local`. Without a database connection, the webhook cannot save subscription data.

## Options

### Option 1: PostgreSQL (Recommended for Production)

**Setup PostgreSQL:**
- **Local**: Install PostgreSQL on your Mac
- **Hosted** (easier): Use one of these free services:
  - **Supabase**: supabase.com (free tier, very easy)
  - **Neon**: neon.tech (serverless PostgreSQL)
  - **Railway**: railway.app (simple setup)

**Add to `.env.local`:**
```env
DATABASE_URL="postgresql://username:password@host:5432/database"
```

**Then run:**
```bash
npx prisma migrate dev --name add_subscriptions
npx prisma generate
```

### Option 2: SQLite (Quick Testing)

**Change `prisma/schema.prisma`:**
```prisma
datasource db {
  provider = "sqlite"
  url      = "file:./dev.db"
}
```

**Then run:**
```bash
npx prisma migrate dev --name add_subscriptions
```

**Note:** SQLite is great for testing but not recommended for production.

### Option 3: Skip Database for Now

Continue building the student dashboard without database persistence. Set up database later. Subscriptions won't be saved until database is configured.

## What's Been Done

✅ Webhook handler fully coded  
✅ Subscription model defined in schema  
✅ Webhook handles all events:
- `checkout.session.completed` → Save subscription
- `customer.subscription.updated` → Update status
- `customer.subscription.deleted` → Mark as canceled
- `invoice.payment_failed` → Mark as past_due

## What's Needed

Database connection URL to:
- Run Prisma migration
- Create Subscription table
- Enable webhook to save data

## Recommendation

**Easiest path:** Use Supabase (5 minute setup)
1. Go to supabase.com
2. Create free project
3. Copy connection string
4. Add to `.env.local`
5. Run migration

Let me know which option you prefer!
