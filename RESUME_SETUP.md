# Resume Setup Guide

## Quick Setup

To add your resume PDF to your portfolio:

### Step 1: Prepare Your Resume PDF

1. Make sure your resume is saved as a PDF file
2. Name it `resume.pdf` (or update the filename in the code if you prefer a different name)

### Step 2: Add Resume to Project

1. **Copy your resume PDF file**
2. **Paste it into the `/public` folder** of your project
   - The path should be: `D:\Fun\Portfolio2\public\resume.pdf`
   - Or: `public/resume.pdf` relative to your project root

### Step 3: Verify the File Path

The Resume component is already configured to look for `/resume.pdf` in the public folder.

If your resume has a different filename, update `components/sections/Resume.tsx`:
- Find line 83: `href="/resume.pdf"`
- Change it to match your filename, e.g., `href="/my-resume.pdf"`

### Step 4: Test Locally

1. Run your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the Resume section
3. Click the "Download Resume" button
4. Verify the PDF downloads correctly

### Step 5: Deploy

After adding your resume:
1. Commit the file:
   ```bash
   git add public/resume.pdf
   git commit -m "Add resume PDF"
   git push
   ```

2. Or if using Vercel, the file will be included automatically when you deploy

## File Structure

Your project structure should look like this:

```
Portfolio2/
├── public/
│   ├── resume.pdf          ← Your resume goes here
│   ├── profile.jpg
│   └── ...
├── components/
│   └── sections/
│       └── Resume.tsx       ← Already configured
└── ...
```

## Alternative: External Resume Link

If you prefer to host your resume elsewhere (Google Drive, Dropbox, etc.):

1. Upload your resume to your preferred hosting service
2. Get a direct download link
3. Update `components/sections/Resume.tsx` line 83:
   ```tsx
   href="https://your-resume-link.com/resume.pdf"
   ```

## Troubleshooting

### Resume doesn't download

1. **Check file exists**: Verify `public/resume.pdf` exists
2. **Check filename**: Make sure it matches exactly (case-sensitive)
3. **Clear browser cache**: Hard refresh (Ctrl+Shift+R)
4. **Check browser console**: Look for 404 errors

### Resume downloads but is corrupted

- Make sure the PDF file is not corrupted
- Try opening it locally first
- Re-export/save the PDF from your source document

### Resume not showing after deployment

- Make sure the file is committed to Git
- Check that `public/resume.pdf` is in your repository
- Verify the file isn't in `.gitignore`

## Notes

- The resume PDF will be publicly accessible at `https://your-domain.com/resume.pdf`
- Make sure your resume doesn't contain sensitive information you don't want public
- The file size should be reasonable (under 5MB recommended for fast loading)
