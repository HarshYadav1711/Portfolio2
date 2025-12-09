# Email Debugging Guide

If you're not receiving emails from the contact form, follow these steps:

## Step 1: Check Server Console Logs

After submitting the contact form, check your server console (terminal where you run `npm run dev`). Look for these log messages:

### ✅ Good Signs:
- `📧 Email Configuration Check:` - Shows if env vars are set
- `📤 Attempting to send email via Resend...` - Shows email attempt
- `📨 Full Resend API response:` - Shows the API response
- `✅ Email sent successfully via Resend!` - Success with email ID

### ❌ Error Signs:
- `⚠️ Email service not configured:` - Missing environment variables
- `❌ Resend API returned an error:` - API error
- `❌ Failed to send email via Resend:` - Sending failed

## Step 2: Verify Environment Variables

1. **Check `.env.local` file exists** in your project root
2. **Verify the format** (no quotes, no spaces around `=`):
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   CONTACT_EMAIL=your-email@example.com
   RESEND_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
   ```

3. **Restart your server** after creating/updating `.env.local`

## Step 3: Check Resend Dashboard

1. Go to https://resend.com/emails
2. Check if emails appear in the logs
3. Look for:
   - **Delivered** status
   - **Bounced** status (indicates delivery issue)
   - **Failed** status (indicates API issue)

## Step 4: Common Issues

### Issue: "Email service not configured"
**Solution:** Create `.env.local` with your Resend API key and contact email

### Issue: "Resend API error"
**Possible causes:**
- Invalid API key
- Domain not verified (if using custom domain)
- API key doesn't have send permissions
- Rate limit exceeded

**Solution:**
- Verify API key in Resend dashboard
- Check API key permissions
- If using custom domain, verify domain in Resend dashboard

### Issue: Email shows as sent but not received
**Possible causes:**
- Email in spam/junk folder
- Email provider blocking
- Wrong email address

**Solution:**
- Check spam/junk folder
- Try different email address
- Check Resend dashboard for bounce notifications

## Step 5: Test Email Configuration

The server logs will show:
```
📧 Email Configuration Check: {
  hasApiKey: true/false,
  hasContactEmail: true/false,
  fromEmail: '...',
  contactEmail: 'your-email@example.com' or 'NOT SET',
  apiKeyPrefix: 're_...' or 'NOT SET'
}
```

If `hasApiKey` or `hasContactEmail` is `false`, your environment variables are not loaded.

## Step 6: Check Full Response

The logs will show the complete Resend API response. Look for:
- `data.id` - Email ID means it was sent successfully
- `error` - Error object means something went wrong

## Still Not Working?

1. **Copy the full console output** from your server
2. **Check Resend dashboard** for email logs
3. **Verify API key** is active and has correct permissions
4. **Try with `onboarding@resend.dev`** as the from email (works without domain verification)

