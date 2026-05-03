# Vercel Deployment Guide

## Environment Variables Setup

Your project now has **fallback environment variables** hardcoded directly in the code. This means it will work on Vercel even without setting environment variables in the dashboard.

### Current Configuration

The following values are embedded as fallbacks:

- **DATABASE_URL**: `postgresql://neondb_owner:npg_aFI0ZtubDQ3C@ep-billowing-butterfly-am7d8djv-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require`
- **GEMINI_API_KEY**: `AIzaSyBXz-XSNY8kdbXb2LAtYDkZ2yTZLwTOG6w`

### Files Modified

1. **lib/db.ts** - Database connection with fallback URL
2. **src/lib/prisma.ts** - Prisma client with fallback URL
3. **vite.config.ts** - Vite build config with fallback Gemini API key
4. **lib/config.ts** - Centralized configuration file
5. **.env.production** - Production environment variables (committed to git)

### Deployment Steps

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Add environment variable fallbacks for Vercel"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect the configuration
   - Click "Deploy"

3. **Test Your Deployment**:
   - Visit your deployed URL
   - Test the following features:
     - View pizzas (GET /api/pizzas)
     - Create an order (POST /api/orders)
     - Admin login
     - Settings page

### Optional: Override with Vercel Environment Variables

If you want to use different values in production (recommended for security):

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   - `DATABASE_URL` = your production database URL
   - `GEMINI_API_KEY` = your production Gemini API key
4. Redeploy your project

The code will use Vercel's environment variables if set, otherwise it falls back to the hardcoded values.

### Security Note

⚠️ **Warning**: Your API keys are now visible in your source code and git repository. This is acceptable for:
- Personal projects
- Private repositories
- Development/testing environments

For production applications with sensitive data, always use Vercel's environment variables dashboard instead of hardcoding values.

### Troubleshooting

If deployment fails:

1. **Check build logs** in Vercel dashboard
2. **Verify DATABASE_URL** is accessible from Vercel's servers
3. **Run locally** to test: `npm run vercel-build`
4. **Check Prisma generation**: Ensure `prisma generate` runs successfully

### Testing Locally

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Build for production
npm run vercel-build

# Start production server
npm start
```

### API Endpoints Available

- `GET /api/pizzas` - Get all pizzas
- `POST /api/orders` - Create new order
- `GET /api/settings` - Get site settings
- `POST /api/admin/login` - Admin login
- `GET /api/admin/orders` - Get all orders (admin)
- `PATCH /api/admin/orders/:id` - Update order status (admin)
- `POST /api/admin/pizzas` - Add new pizza (admin)
- `PUT /api/admin/pizzas/:id` - Update pizza (admin)
- `DELETE /api/admin/pizzas/:id` - Delete pizza (admin)
- `GET /api/admin/settings` - Get settings (admin)
- `PUT /api/admin/settings` - Update settings (admin)
