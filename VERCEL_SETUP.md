# Vercel Deployment Setup Guide

## ⚠️ Important: Environment Variables on Vercel

Your contact form works locally but not on Vercel because **environment variables need to be configured in the Vercel dashboard**, not just in `.env.local`.

## Step-by-Step Setup

### 1. Get Your Environment Variables

You need these three values (same as your `.env.local`):
- `RESEND_API_KEY` - Your Resend API key (starts with `re_`)
- `CONTACT_EMAIL` - Your email address where you want to receive messages
- `RESEND_FROM_EMAIL` - Email address to send from (optional, defaults to `onboarding@resend.dev`)

### 2. Add Environment Variables in Vercel Dashboard

1. **Go to your Vercel project dashboard**
   - Visit https://vercel.com/dashboard
   - Select your portfolio project

2. **Navigate to Settings**
   - Click on your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add each environment variable:**
   
   Click **Add New** and add these three variables:

   **Variable 1:**
   - Name: `RESEND_API_KEY`
   - Value: `re_your_actual_api_key_here` (your Resend API key)
   - Environment: Select **Production**, **Preview**, and **Development** (or just Production if you only deploy to production)
   - Click **Save**

   **Variable 2:**
   - Name: `CONTACT_EMAIL`
   - Value: `your-email@example.com` (your email address)
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **Save**

   **Variable 3 (Optional):**
   - Name: `RESEND_FROM_EMAIL`
   - Value: `Portfolio Contact <onboarding@resend.dev>` (or your verified domain email)
   - Environment: Select **Production**, **Preview**, and **Development**
   - Click **Save**

### 3. Redeploy Your Application

After adding environment variables, you **must redeploy**:

1. **Option A: Automatic Redeploy**
   - Push a new commit to your repository
   - Vercel will automatically redeploy with the new environment variables

2. **Option B: Manual Redeploy**
   - Go to your project's **Deployments** tab
   - Click the **⋯** (three dots) on the latest deployment
   - Select **Redeploy**
   - Make sure to check **Use existing Build Cache** is **unchecked** (to ensure env vars are loaded)

### 4. Verify Environment Variables Are Loaded

After redeploying, test your contact form. The server logs in Vercel will show:
- `📧 Email Configuration Check:` with `hasApiKey: true` and `hasContactEmail: true`

### 5. Check Vercel Function Logs

To see the logs:
1. Go to your Vercel project dashboard
2. Click on **Deployments**
3. Click on the latest deployment
4. Click on **Functions** tab
5. Click on `/api/contact` function
6. Check the **Logs** tab to see if emails are being sent

## Troubleshooting

### Issue: Still not receiving emails after setup

1. **Verify environment variables are set:**
   - Go to Settings → Environment Variables
   - Confirm all three variables are listed
   - Check that they're enabled for the correct environments (Production/Preview)

2. **Check Vercel Function Logs:**
   - Look for `📧 Email Configuration Check:` in logs
   - If `hasApiKey: false` or `hasContactEmail: false`, the variables aren't loaded
   - **Solution:** Redeploy after adding variables

3. **Verify API Key:**
   - Check Resend dashboard: https://resend.com/api-keys
   - Ensure the API key is active and has send permissions

4. **Check Resend Dashboard:**
   - Visit https://resend.com/emails
   - See if emails are being sent (even if not received)
   - Check for bounce/failure notifications

### Issue: Environment variables not loading

- **Make sure you redeployed** after adding variables
- **Check variable names** - they must match exactly (case-sensitive):
  - `RESEND_API_KEY` (not `resend_api_key` or `Resend_Api_Key`)
  - `CONTACT_EMAIL` (not `contact_email`)
- **Check environment selection** - variables must be enabled for the environment you're deploying to

## Quick Checklist

- [ ] Added `RESEND_API_KEY` in Vercel dashboard
- [ ] Added `CONTACT_EMAIL` in Vercel dashboard
- [ ] Added `RESEND_FROM_EMAIL` in Vercel dashboard (optional)
- [ ] Selected correct environments (Production/Preview/Development)
- [ ] Redeployed the application
- [ ] Tested contact form on deployed site
- [ ] Checked Vercel function logs for confirmation

## Notes

- `.env.local` only works for **local development**
- Vercel **does not** read `.env.local` files
- Environment variables must be set in **Vercel dashboard** for production
- After adding/updating variables, **always redeploy**
- Variables are case-sensitive

