# Personalization Guide

This guide lists all the placeholders and TODO items throughout the codebase that you need to customize for your portfolio.

## 🎯 Quick Start

Search for `TODO:` in the codebase to find all customization points, or follow this guide section by section.

---

## 1. Hero Section (`components/sections/Hero.tsx`)

### Name/Initials
- **Line 21**: Change `"D HRVL"` to your name or initials
- **Line 89**: Change `"DESIGNING"` to your tagline (e.g., "DEVELOPING", "CREATING", "BUILDING")
- **Line 137**: Update the hero description text

---

## 2. Navigation (`components/Navigation.tsx`)

### Logo
- **Line 73**: Change `"DH."` to your initials (e.g., "JD.", "SM.")

### Navigation Items (Optional)
- **Lines 12-16**: Customize navigation labels if needed

---

## 3. About Section (`components/sections/About.tsx`)

### Profile Image
- **Line 68-71**: Replace the placeholder with your actual profile image
  ```tsx
  // Use Next.js Image component:
  import Image from "next/image";
  <Image src="/your-image.jpg" alt="Your Name" fill className="object-cover" />
  ```

### Bio Text
- **Line 95**: Replace with your own bio/description

### Skills
- **Lines 7-10**: Update the skills array with your technologies

### Experience Timeline
- **Lines 12-16**: Update with your work experience (year, role, company)

---

## 4. Skills Section (`components/sections/Skills.tsx`)

### Skill Categories
- **Lines 7-13**: Update skill categories and technologies
  - Frontend: Your frontend technologies
  - Backend: Your backend technologies
  - DevOps: Your DevOps tools
  - Databases: Your database technologies
  - Tools: Your development tools
  - Add/remove categories as needed

---

## 5. Projects Section (`components/sections/Projects.tsx`)

### Projects Array
- **Lines 8-57**: Update each project with:
  - `title`: Your project name
  - `description`: Project description
  - `tech`: Array of technologies used
  - `image`: Path to project image (add images to `/public` folder)
  - `liveUrl`: Live project URL
  - `githubUrl`: GitHub repository URL

**Note**: Add project images to the `/public` folder and reference them as `/project1.jpg`, `/project2.jpg`, etc.

---

## 6. Resume Section (`components/sections/Resume.tsx`)

### Resume PDF
- **Line 79**: Update `href="/resume.pdf"` with your actual resume filename
  - Add your resume PDF to the `/public` folder

### Work Experience
- **Lines 11-30**: Update with your work experience:
  - `period`: Date range
  - `role`: Job title
  - `company`: Company name
  - `description`: Your achievements and responsibilities

### Education
- **Lines 32-38**: Update with your education:
  - `period`: Date range
  - `degree`: Degree name
  - `institution`: University/school name

### Skills
- **Lines 40-44**: Update with your skills list

---

## 7. Contact Section (`components/sections/Contact.tsx`)

### Social Media Links
- **Lines 8-12**: Update all social media URLs:
  - GitHub: Your GitHub profile URL
  - LinkedIn: Your LinkedIn profile URL
  - Twitter/X: Your Twitter/X profile URL (or remove if not using)
  - Email: Your email address (format: `mailto:your@email.com`)

### Form Submission
- **Lines 50-58**: Implement form submission logic
  - Options: Formspree, EmailJS, API route, etc.
  - Example with EmailJS is provided in comments

---

## 8. Footer (`components/sections/Footer.tsx`)

### Copyright Text
- **Line 21**: Replace `"Full-Stack Developer"` with your name

### Social Links
- **Lines 5-9**: Update social media links (same as Contact section)

---

## 9. Site Metadata (`app/layout.tsx`)

### SEO Metadata
- **Line 12**: Update page title
- **Line 13**: Update page description

---

## 📝 Additional Notes

### Images to Add
1. **Profile Image**: Add to `/public` folder (e.g., `/public/profile.jpg`)
2. **Project Images**: Add project screenshots to `/public` folder
3. **Resume PDF**: Add your resume to `/public` folder

### Form Submission Options
- **Formspree**: Free tier available, easy setup
- **EmailJS**: Free tier available, good for simple forms
- **API Route**: Create a Next.js API route for custom handling
- **Third-party services**: SendGrid, Mailgun, etc.

### Color Customization
- Edit `tailwind.config.ts` to change color scheme
- Current colors: Dark purple background, yellow accents, red logo

---

## ✅ Checklist

- [ ] Update hero name/initials
- [ ] Update hero tagline and description
- [ ] Change navigation logo initials
- [ ] Add profile image
- [ ] Update bio text
- [ ] Update skills list
- [ ] Update experience timeline
- [ ] Update skill categories
- [ ] Add project images
- [ ] Update all project details
- [ ] Add resume PDF
- [ ] Update work experience
- [ ] Update education
- [ ] Update social media links
- [ ] Implement form submission
- [ ] Update copyright text
- [ ] Update site metadata

---

## 🔍 Finding All TODOs

To find all TODO items in the codebase, use:
```bash
# Search for TODO comments
grep -r "TODO:" components/ app/
```

Or use your IDE's search function to find all instances of `TODO:`.

