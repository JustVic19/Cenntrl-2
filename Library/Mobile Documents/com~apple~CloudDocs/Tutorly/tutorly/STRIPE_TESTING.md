# Stripe Payment Testing Guide

## ✅ Prerequisites  
- Stripe CLI installed
- Dev server running at http://localhost:3000
- Database connected

## Step 1: Start Stripe Webhook Listener

Open a **new terminal** and run:

```bash
cd "/Users/victor/Library/Mobile Documents/com~apple~CloudDocs/Tutorly/tutorly"
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

**What this does:**
- Forwards Stripe webhook events to your local endpoint
- Gives you a webhook signing secret (`whsec_...`)
- **Keep this terminal open** during testing

**Copy the webhook secret** that's displayed (starts with `whsec_`)

## Step 2: Add Webhook Secret

Add the webhook secret to `.env.local`:

```env
STRIPE_WEBHOOK_SECRET=whsec_your_secret_here
```

Then restart your dev server.

## Step 3: Test the Payment Flow

1. **Go to:** http://localhost:3000/prices
2. **Click "Get Started"** on Steady or Focus plan
3. **Select courses** (any courses you want)
4. **Enter student info:**
   - Student Name: Test Student
   - Parent Email: test@example.com
   - Year Group: Year 5
5. **Click "Proceed to Payment"**
6. **Use Stripe test card:**
   - Card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
7. **Complete payment**
8. **Check:**
   - Success page shows ✅
   - Webhook terminal shows event received
   - Subscription saved to Supabase

## Step 4: Verify in Supabase

1. Go to https://supabase.com/dashboard
2. Click your **Tutorly** project
3. Click **Table Editor** in sidebar
4. Select **subscriptions** table
5. **You should see your test subscription!**

## Test Card Numbers

- **Success:** `4242 4242 4242 4242`
- **Requires authentication:** `4000 0025 0000 3155`
- **Declined:** `4000 0000 0000 0002`

## Expected Results

✅ Payment succeeds in Stripe
✅ Redirects to success page
✅ Webhook receives `checkout.session.completed`
✅ Subscription saves to database with:
- Student name, email, year
- Plan (steady/focus)
- Courses selected
- Monthly amount (£100 or £320)
- Stripe customer ID
- Stripe subscription ID
- Status: "active"

## Troubleshooting

**"Failed to send message"** → Check webhook secret in `.env.local`  
**Not saving to DB** → Check webhook terminal for errors  
**"Can't reach webhook"** → Make sure `stripe listen` is running  

---

**Ready to test? Follow the steps above!** 🚀
