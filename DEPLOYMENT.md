# Deployment Guide for De Pizza Town

## Prerequisites
- Vercel account
- NeonDB PostgreSQL database (already configured)

## Environment Variables

Add these environment variables in your Vercel project settings:

1. **DATABASE_URL**
   ```
   postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require
   ```

2. **GEMINI_API_KEY** (optional, for AI features)
   ```
   AIzaSyBXz-XSNY8kdbXb2LAtYDkZ2yTZLwTOG6w
   ```

## Deployment Steps

### Option 1: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

### Option 2: Deploy via Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Add environment variables in Settings → Environment Variables
4. Deploy

## Post-Deployment

### Seed the Database (First Time Only)
After first deployment, seed your database with initial data:

```bash
# Run locally with production DATABASE_URL
npm run db:seed
```

Or create a one-time Vercel function to seed data.

## Verify Deployment

1. **Check API Endpoints:**
   - `https://your-domain.vercel.app/api/pizzas` - Should return pizza list
   - `https://your-domain.vercel.app/api/settings` - Should return site settings

2. **Test Admin Panel:**
   - Go to `https://your-domain.vercel.app/admin/login`
   - Login with: `admin@depizzatown.com` / `admin123`

3. **Test Menu Page:**
   - Go to `https://your-domain.vercel.app/menu`
   - Should display all pizzas from database

## Troubleshooting

### Data Not Showing
- Verify DATABASE_URL is set correctly in Vercel environment variables
- Check Vercel function logs for errors
- Ensure database has been seeded with data

### API Errors
- Check Vercel function logs
- Verify Prisma Client is generated during build
- Ensure all API routes are in `/api` folder

### Build Failures
- Check that `prisma generate` runs during build
- Verify all dependencies are in `package.json`
- Check Node.js version compatibility

## Database Management

Your NeonDB database is persistent and shared between:
- Local development
- Vercel deployment
- Any other deployments

All changes (adding pizzas, orders, settings) are stored in the same database.

## Admin Credentials

**Email:** admin@depizzatown.com  
**Password:** admin123

⚠️ **Important:** Change these credentials in production!
