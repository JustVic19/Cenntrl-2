# Supabase Setup Instructions

## Step 1: Create Supabase Account & Project (5 minutes)

1. **Go to:** https://supabase.com
2. **Sign up** with GitHub or email (free account)
3. **Click "New Project"**
4. **Fill in details:**
   - **Name**: `Tutorly` (or anything you like)
   - **Database Password**: Create a strong password and **save it**
   - **Region**: Choose closest to you (e.g., London for UK)
   - **Pricing Plan**: Free (includes 500MB storage, 2GB bandwidth)
5. **Click "Create new project"**
6. **Wait ~2 minutes** for project to initialize

## Step 2: Get Database Connection String

1. Once project is ready, click **"Connect"** button (top right)
2. Click **"Connection string"** tab
3. Select **"URI"** or **"Connection string"**
4. You'll see something like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```
5. **Replace `[YOUR-PASSWORD]`** with the database password you created
6. **Copy the complete connection string**

## Step 3: Add to Your Project

Once you have the connection string, send it to me and I'll:
1. Add it to `.env.local`
2. Update Prisma schema to use PostgreSQL
3. Run the migration
4. Generate Prisma Client

## What You'll Get

✅ Production-ready PostgreSQL database  
✅ Automatic backups  
✅ Web dashboard to view data  
✅ 500MB free storage  
✅ Ready to deploy

## Next Steps

**When you have your Supabase connection string, paste it here and I'll configure everything!**

The connection string looks like:
```
postgresql://postgres.xxxxx:password@aws-0-eu-west-1.pooler.supabase.com:6543/postgres
```

**Ready? Create your Supabase project now!** 🚀
