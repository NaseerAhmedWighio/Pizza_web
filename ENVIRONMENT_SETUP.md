# Environment Variables Setup Guide

This guide explains how to set up environment variables for your Pizza Town application on Vercel.

## Required Environment Variables

Your application requires the following environment variables to function properly:

### 1. DATABASE_URL
Your PostgreSQL database connection string from Neon.

**Format:**
```
postgresql://username:password@host/database?sslmode=require
```

### 2. GEMINI_API_KEY
Your Google Gemini AI API key for AI-powered features.

**Format:**
```
AIzaSy...
```

---

## Setting Environment Variables in Vercel

### Step 1: Access Your Project Settings

1. Go to [vercel.com](https://vercel.com)
2. Select your project (`Pizza_web`)
3. Click on **Settings** tab
4. Navigate to **Environment Variables** in the left sidebar

### Step 2: Add Environment Variables

For each variable, follow these steps:

#### DATABASE_URL

1. Click **Add New** button
2. **Key:** `DATABASE_URL`
3. **Value:** Your Neon PostgreSQL connection string
   ```
   postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```
4. **Environment:** Select all (Production, Preview, Development)
5. Click **Save**

#### GEMINI_API_KEY

1. Click **Add New** button
2. **Key:** `GEMINI_API_KEY`
3. **Value:** Your Google Gemini API key
   ```
   AIzaSyBXz-XSNY8kdbXb2LAtYDkZ2yTZLwTOG6w
   ```
4. **Environment:** Select all (Production, Preview, Development)
5. Click **Save**

### Step 3: Redeploy Your Application

After adding environment variables:

1. Go to **Deployments** tab
2. Click on the latest deployment
3. Click the **⋯** (three dots) menu
4. Select **Redeploy**
5. Confirm the redeployment

**OR** simply push a new commit to trigger automatic deployment.

---

## Local Development Setup

For local development, create a `.env` file in your project root:

```bash
# Copy the example file
cp .env.example .env
```

Then edit `.env` and add your actual values:

```env
DATABASE_URL="postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require"
GEMINI_API_KEY="AIzaSyBXz-XSNY8kdbXb2LAtYDkZ2yTZLwTOG6w"
```

**Note:** The `.env` file is already in `.gitignore` and will not be committed to your repository.

---

## Verifying Environment Variables

After setting up environment variables and redeploying:

1. Visit your deployed site
2. Check browser console for errors
3. Test database operations:
   - View pizzas on homepage
   - Place a test order
   - Login to admin panel
4. Check Vercel Function Logs:
   - Go to your project in Vercel
   - Click **Deployments** → Latest deployment
   - Click **View Function Logs**
   - Look for any environment variable errors

---

## Security Best Practices

✅ **DO:**
- Store sensitive credentials only in Vercel's environment variables
- Use different credentials for development and production
- Rotate API keys periodically
- Use `.env.example` to document required variables

❌ **DON'T:**
- Commit `.env` files to git
- Hardcode credentials in source code
- Share API keys publicly
- Use production credentials in development

---

## Troubleshooting

### Database Connection Errors

If you see database connection errors:

1. Verify `DATABASE_URL` is set correctly in Vercel
2. Check that your Neon database is active
3. Ensure the connection string includes `?sslmode=require`
4. Check Vercel Function Logs for detailed error messages

### Gemini API Errors

If AI features aren't working:

1. Verify `GEMINI_API_KEY` is set in Vercel
2. Check that your API key is valid and active
3. Ensure you haven't exceeded API quota limits

### Environment Variables Not Loading

If variables aren't being recognized:

1. Ensure you selected the correct environment (Production/Preview/Development)
2. Redeploy after adding new variables
3. Clear Vercel's cache by redeploying
4. Check for typos in variable names (they're case-sensitive)

---

## Getting Your Credentials

### Neon Database URL

1. Go to [neon.tech](https://neon.tech)
2. Select your project
3. Go to **Dashboard**
4. Copy the connection string from **Connection Details**

### Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click **Get API Key**
3. Create a new API key or use an existing one
4. Copy the API key

---

## Support

If you encounter issues:

1. Check Vercel deployment logs
2. Review browser console errors
3. Verify all environment variables are set correctly
4. Ensure your database and API services are active

For more help, refer to:
- [Vercel Environment Variables Documentation](https://vercel.com/docs/environment-variables)
- [Prisma Environment Variables](https://www.prisma.io/docs/guides/development-environment/environment-variables)
