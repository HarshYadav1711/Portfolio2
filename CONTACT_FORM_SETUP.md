# Contact Form Setup Guide

The contact form is now fully functional! Users can submit messages and will receive proper feedback.

## Current Status

✅ **Form is working** - Users can submit messages and see success/error feedback
✅ **API route created** - Handles form submissions at `/api/contact`
✅ **User feedback** - Loading states and success/error messages are displayed

## Optional: Enable Email Notifications

By default, form submissions are logged to the console. To receive email notifications when someone submits the form, follow these steps:

### Option 1: Using Resend (Recommended - Free Tier Available)

1. **Sign up for Resend**: Go to [https://resend.com](https://resend.com) and create a free account

2. **Get your API key**: 
   - Go to your Resend dashboard
   - Navigate to API Keys
   - Create a new API key

3. **Install Resend package**:
   ```bash
   npm install resend
   ```

4. **For Local Development - Create/Update `.env.local` file** in your project root:
   ```env
   RESEND_API_KEY=re_your_api_key_here
   CONTACT_EMAIL=your-email@example.com
   RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
   ```

5. **For Vercel/Production Deployment - ⚠️ IMPORTANT:**
   - Environment variables must be set in **Vercel Dashboard**, not just `.env.local`
   - Go to your Vercel project → Settings → Environment Variables
   - Add `RESEND_API_KEY`, `CONTACT_EMAIL`, and `RESEND_FROM_EMAIL`
   - **Redeploy** your application after adding variables
   - See `VERCEL_SETUP.md` for detailed step-by-step instructions

6. **Verify your domain** (optional but recommended):
   - In Resend dashboard, add and verify your domain
   - Update `RESEND_FROM_EMAIL` to use your verified domain

### Option 2: Using Other Email Services

The API route (`app/api/contact/route.ts`) includes commented examples for:
- SendGrid
- Nodemailer with SMTP

Uncomment and configure the option you prefer.

## Testing

1. **Test the form**:
   - Fill out the contact form on your website
   - Click "Send Message"
   - You should see a success message

2. **Check logs** (if email not configured):
   - Check your server console/terminal
   - You should see the form submission logged

3. **Check email** (if configured):
   - Check your email inbox
   - You should receive an email with the form submission

## Troubleshooting

- **Form not submitting**: Check browser console for errors
- **No email received (Local)**: 
  - Verify your environment variables are set correctly in `.env.local`
  - Restart your development server after creating/updating `.env.local`
  - Check Resend dashboard for email logs
  - Check spam folder
- **No email received (Vercel/Production)**: 
  - ⚠️ **Most common issue**: Environment variables not set in Vercel dashboard
  - Go to Vercel → Settings → Environment Variables
  - Add `RESEND_API_KEY` and `CONTACT_EMAIL`
  - **Redeploy** your application (very important!)
  - Check Vercel Function Logs for error messages
  - See `VERCEL_SETUP.md` for detailed instructions
- **TypeScript errors**: Make sure to install `resend` package if using Resend

## Notes

- The form works even without email configuration (messages are logged)
- All form submissions are validated (name, email format, message required)
- Success/error messages automatically clear after 5 seconds
- The form resets after successful submission

