# Cloudflare R2 Storage Setup

This guide walks you through setting up Cloudflare R2 for file uploads in Tutorly.

## 1. Create Cloudflare Account

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Sign up or log in

## 2. Create R2 Bucket

1. In the sidebar, click **R2 Object Storage**
2. Click **Create Bucket**
3. Name: `tutorly` (or your preferred name)
4. Click **Create bucket**

## 3. Create API Token

1. In R2 dashboard, click **Manage R2 API Tokens**
2. Click **Create API token**
3. Token name: `tutorly-upload`
4. Permissions: **Object Read & Write**
5. Specify buckets: Select your `tutorly` bucket
6. Click **Create API Token**
7. **Save the Access Key ID and Secret Access Key** (shown only once!)

## 4. Get Account ID

1. Go to R2 dashboard
2. Your Account ID is shown in the URL: `dash.cloudflare.com/<ACCOUNT_ID>/r2/`
3. Or find it on the right sidebar under "Account ID"

## 5. Enable Public Access (Optional)

For public file access (homework downloads, etc.):

1. Click on your bucket
2. Go to **Settings**
3. Under **Public Access**, click **Allow Access**
4. You'll get a public URL like: `https://pub-<hash>.r2.dev`

Alternatively, use a custom domain:
1. Go to **Custom Domains**
2. Add your domain (e.g., `files.tutorly.com`)
3. Follow DNS instructions

## 6. Add Environment Variables

Add these to your `.env.local`:

```env
# Cloudflare R2 Storage
R2_ACCOUNT_ID=your_account_id_here
R2_ACCESS_KEY_ID=your_access_key_id_here
R2_SECRET_ACCESS_KEY=your_secret_access_key_here
R2_BUCKET_NAME=tutorly
R2_PUBLIC_URL=https://pub-xxxx.r2.dev
```

## 7. Test Upload

After setup, test by:
1. Going to Admin Dashboard
2. Creating a homework assignment with a file
3. Checking R2 dashboard to see the uploaded file

## Pricing

Cloudflare R2 has a generous free tier:
- **Storage**: 10 GB/month free
- **Class A operations** (writes): 1 million/month free
- **Class B operations** (reads): 10 million/month free
- **No egress fees!** (unlike AWS S3)

For a tutoring platform, you'll likely stay within the free tier.

## CORS Configuration (If needed)

If you get CORS errors during upload, configure CORS in your bucket settings:

```json
[
  {
    "AllowedOrigins": ["http://localhost:3000", "https://yourdomain.com"],
    "AllowedMethods": ["GET", "PUT", "POST", "DELETE"],
    "AllowedHeaders": ["*"],
    "MaxAgeSeconds": 3000
  }
]
```

## Troubleshooting

**Upload fails:**
- Check environment variables are set correctly
- Verify API token has correct permissions
- Check CORS settings if using browser uploads

**Files not accessible:**
- Enable public access on bucket
- Check public URL is correct in env vars

---

Once configured, your admin dashboard can upload homework PDFs, test files, and other resources that students can download!
