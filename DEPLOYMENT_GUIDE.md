# Deployment Guide

This guide explains how to deploy your portfolio changes to Vercel.

## 🚀 Quick Deployment Methods

### Method 1: Automatic Deployment via Git (Recommended)

If your project is connected to a Git repository (GitHub, GitLab, or Bitbucket), Vercel automatically deploys when you push changes.

#### Steps:

1. **Stage your changes**
   ```bash
   git add .
   ```

2. **Commit your changes**
   ```bash
   git commit -m "Add AI Agent projects prioritization and fix contact form"
   ```

3. **Push to your repository**
   ```bash
   git push origin main
   ```
   (Replace `main` with your branch name if different, e.g., `master` or `develop`)

4. **Vercel automatically deploys**
   - Go to https://vercel.com/dashboard
   - You'll see a new deployment starting automatically
   - Wait for it to complete (usually 1-3 minutes)

#### Verify Deployment:

- Check the **Deployments** tab in Vercel dashboard
- You'll see a new deployment with status "Building" → "Ready"
- Click on the deployment to see the live URL

---

### Method 2: Manual Deployment via Vercel CLI

If you prefer to deploy directly from your terminal:

#### Prerequisites:

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

#### Deploy:

1. **Navigate to your project directory**
   ```bash
   cd D:\Fun\Portfolio2
   ```

2. **Deploy to production**
   ```bash
   vercel --prod
   ```

   Or for preview deployment:
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Select your project (if multiple)
   - Confirm settings
   - Wait for deployment to complete

---

### Method 3: Manual Redeploy from Vercel Dashboard

If you just want to redeploy existing code (e.g., after adding environment variables):

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Select your portfolio project

2. **Navigate to Deployments**
   - Click on **Deployments** tab
   - Find the latest deployment

3. **Redeploy**
   - Click the **⋯** (three dots) menu on the deployment
   - Select **Redeploy**
   - **Important:** Uncheck "Use existing Build Cache" to ensure fresh build
   - Click **Redeploy**

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] **All changes are saved** in your code editor
- [ ] **Code compiles without errors** (run `npm run build` locally to test)
- [ ] **Environment variables are set** in Vercel dashboard (if needed)
- [ ] **Git repository is up to date** (if using Git deployment)

---

## 🧪 Test Build Locally First

Before deploying, test that your build works:

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Test the production build locally (optional)
npm start
```

If the build succeeds locally, it should work on Vercel too!

---

## 🔍 Verify Deployment

After deployment:

1. **Check Deployment Status**
   - Go to Vercel Dashboard → Deployments
   - Status should be "Ready" (green checkmark)

2. **Visit Your Live Site**
   - Click on the deployment
   - Click "Visit" or use your custom domain
   - Test your changes:
     - Check if AI Agent projects appear first
     - Test contact form
     - Verify all sections load correctly

3. **Check Build Logs** (if issues)
   - Click on the deployment
   - Click "View Build Logs"
   - Look for any errors or warnings

---

## 🐛 Troubleshooting

### Build Fails

**Error: Build failed**
- Check build logs in Vercel dashboard
- Common issues:
  - TypeScript errors → Fix type errors
  - Missing dependencies → Check `package.json`
  - Environment variable issues → Verify env vars in Vercel dashboard

**Solution:**
```bash
# Test build locally first
npm run build

# Fix any errors locally, then push again
```

### Changes Not Showing

**Issue: Changes don't appear on live site**

**Solutions:**
1. **Hard refresh** your browser (Ctrl+Shift+R or Cmd+Shift+R)
2. **Clear browser cache**
3. **Check deployment status** - make sure latest deployment is "Ready"
4. **Verify you're looking at production** - not a preview deployment

### Environment Variables Not Working

**Issue: Contact form not sending emails**

**Solution:**
1. Go to Vercel → Settings → Environment Variables
2. Verify variables are set correctly
3. **Redeploy** after adding/updating variables
4. Check Vercel Function Logs for errors

---

## 📝 Deployment Workflow

### Recommended Workflow:

1. **Make changes locally**
   ```bash
   # Edit files in your code editor
   ```

2. **Test locally**
   ```bash
   npm run dev
   # Test in browser at http://localhost:3000
   ```

3. **Build test**
   ```bash
   npm run build
   # Make sure build succeeds
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin main
   ```

5. **Monitor deployment**
   - Watch Vercel dashboard for deployment status
   - Check build logs if needed

6. **Verify live site**
   - Visit your deployed site
   - Test all functionality

---

## 🎯 Quick Commands Reference

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Test production build locally
npm start

# Deploy to Vercel (if CLI installed)
vercel --prod

# Git workflow
git add .
git commit -m "Your commit message"
git push origin main
```

---

## 📚 Additional Resources

- **Vercel Dashboard**: https://vercel.com/dashboard
- **Vercel Documentation**: https://vercel.com/docs
- **Vercel CLI Docs**: https://vercel.com/docs/cli

---

## 💡 Tips

1. **Always test locally first** - Run `npm run build` before deploying
2. **Use descriptive commit messages** - Helps track what changed
3. **Monitor build logs** - Catch issues early
4. **Keep environment variables updated** - Especially after adding new features
5. **Use preview deployments** - Test changes before going to production

---

## ✅ After Deployment

Once deployed, your changes will be live:
- ✅ AI Agent projects will appear first in your portfolio
- ✅ Contact form will work (if environment variables are set)
- ✅ All other features will be updated

**Your portfolio is now live! 🎉**
