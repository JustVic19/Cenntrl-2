# Stripe Setup Instructions

You're ready to continue building the Stripe payment integration! Here's what's been set up:

## ✅ Completed

1. **Stripe SDK installed** - `stripe` and `@stripe/stripe-js` packages added
2. **Database schema updated** - `Subscription` model added to track:
   - Student information
   - Selected plan (Steady/Focus)
   - Courses (informational)
   - Session preferences
   - Stripe customer and subscription IDs
3. **Pricing utilities created** - `lib/pricing.ts` with flat-rate pricing:
   - Steady: £100/month
   - Focus: £320/month
4. **Stripe client initialized** - `lib/stripe.ts` for server-side operations

## 🔑 Next Step: Get Your Stripe API Keys

### 1. Create Stripe Account (if needed)
Go to: https://dashboard.stripe.com/register

### 2. Get Your Test API Keys
1. Log into Stripe Dashboard
2. Click **Developers** in the left sidebar
3. Click **API keys**
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`)
   - **Secret key** (starts with `sk_test_...`) - click "Reveal test key"

### 3. Add Keys to .env.local

Open or create `/Users/victor/Library/Mobile Documents/com~apple~CloudDocs/Tutorly/tutorly/.env.local` and add:

```env
# Stripe API Keys (Test Mode)
STRIPE_SECRET_KEY=sk_test_your_actual_key_here
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_actual_key_here
```

Replace the placeholder values with your actual keys from Stripe Dashboard.

### 4. Restart Dev Server

After adding the keys:
```bash
# Stop current server (Ctrl+C)
npm run dev
```

## 🚀 What's Next

Once your keys are added, I'll build:

1. **Enrollment page** (`/enroll`)
   - Course selection (7 courses)
   - Session preference (for Focus)
   - Student information form
   - Real-time pricing display

2. **Stripe Checkout integration**
   - Create checkout sessions
   - Redirect to Stripe payment page
   - Handle success/cancel redirects

3. **Confirmation pages**
   - Success page with enrollment details
   - Cancel page to return to enrollment

4. **Webhook handler**
   - Listen for Stripe events
   - Save subscriptions to database
   - Handle subscription updates

5. **Update pricing page**
   - Add "Get Started" buttons
   - Link to enrollment flow

## 📝 Notes

- **Test mode**: We're using test mode, so no real charges will occur
- **Test cards**: Use Stripe test cards like `4242 4242 4242 4242`
- **No database yet**: We haven't run migrations - I'll help with that after keys are added

Ready when you are! 🎉
