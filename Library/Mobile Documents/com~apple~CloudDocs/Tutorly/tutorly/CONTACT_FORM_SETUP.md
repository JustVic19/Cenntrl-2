# Contact Form Email Setup Instructions

Your contact form is now configured to send emails to **stella.adeniyi@hotmail.com** using Resend!

## ✅ What's Been Done

1. ✅ Installed Resend package
2. ✅ Created API route at `/app/api/contact/route.ts`
3. ✅ Updated contact form to call the API
4. ✅ Added success and error message displays

## 🔑 Required: Get Your Resend API Key

To make the contact form work, you need to set up a Resend account and add your API key:

### Step 1: Sign up for Resend

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account (no credit card required)
3. Verify your email address

### Step 2: Get Your API Key

1. Log into your Resend dashboard
2. Go to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Tutorly Contact Form")
5. Copy the API key (it starts with `re_...`)

### Step 3: Add API Key to Your Project

1. In your project root, create a file called `.env.local` (if it doesn't exist)
2. Add this line to the file:

```
RESEND_API_KEY=re_your_actual_api_key_here
```

3. Replace `re_your_actual_api_key_here` with your actual Resend API key
4. Save the file

### Step 4: Restart the Development Server

1. Stop the current dev server (Ctrl+C or Cmd+C)
2. Run `npm run dev` again
3. The contact form will now send emails!

## 📧 How It Works

When someone fills out the contact form at `/contact`:

1. Form data is sent to `/api/contact`
2. Your API route validates the data
3. Resend sends a formatted email to **stella.adeniyi@hotmail.com**
4. The email includes:
   - Sender's name
   - Sender's email address (set as reply-to)
   - Subject line
   - Message content
   - Beautiful HTML formatting

## 🚀 Testing the Form

1. Go to http://localhost:3001/contact
2. Fill out the form with test data
3. Click "Send Message"
4. Check **stella.adeniyi@hotmail.com** for the email!

## ⚠️ Important Notes

### Free Tier Limits
- Resend free tier: **3,000 emails per month**
- **100 emails per day**
- This should be more than enough for a contact form!

### Email Sender Address
Currently using Resend's default: `onboarding@resend.dev`

**To use a custom email address (e.g., contact@tutorly.com):**
1. You need to own a domain
2. Verify your domain in Resend settings
3. Update the `from` field in `/app/api/contact/route.ts`

### Security
- **Never commit `.env.local` to git** (it's already in `.gitignore`)
- Your API key should remain secret
- The API route only accepts POST requests

## 🔧 Troubleshooting

**"Failed to send message" error?**
- Check that `RESEND_API_KEY` is set in `.env.local`
- Verify the API key is correct
- Restart the dev server after adding the key
- Check browser console for error details

**Not receiving emails?**
- Check spam/junk folder
- Verify stella.adeniyi@hotmail.com is correct
- Check Resend dashboard for delivery logs

## 📝 Next Steps (Optional)

If you want to also **save** contact form submissions to the database:

1. Add a `ContactMessage` model to Prisma schema
2. Save the message data in the API route before sending email
3. Create an admin page to view submissions

Let me know if you'd like help implementing this!

---

**Need help?** Let me know if you have any issues setting up Resend or if emails aren't working!
