# Portfolio Website

A modern, sleek, high-end portfolio website for a Full-Stack Developer. Built with Next.js 14, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Dark Theme**: Charcoal background (#0d0d0f to #111113) with electric blue (#3B82F6) and neon cyan (#00F5FF) accents
- **Smooth Animations**: GSAP and Framer Motion for fluid transitions and parallax effects
- **Responsive Design**: Fully responsive from mobile to desktop
- **Smooth Scrolling**: Lenis for high-FPS scrolling experience
- **Modern UI**: Minimal layout with glassmorphism effects and subtle animations

## Sections

1. **Hero Section**: Full-height viewport with animated text reveal and floating orb
2. **About Section**: Two-column layout with profile image and narrative text
3. **Skills Matrix**: Elegant grid with glowing hover effects
4. **Featured Projects**: Alternating left/right layout with parallax images
5. **Process Section**: 4-step timeline with smooth reveal animations
6. **Contact Section**: Glassmorphism form with social icons
7. **Footer**: Minimal footer with social links

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion** (animations)
- **GSAP** (advanced animations)
- **Lenis** (smooth scrolling)
- **Lucide React** (icons)

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Update Content

- **Hero Section**: Edit `components/sections/Hero.tsx`
- **About Section**: Edit `components/sections/About.tsx` - Update the bio text, skills array, and timeline
- **Projects**: Edit the `projects` array in `components/sections/Projects.tsx`
- **Contact**: Update social links in `components/sections/Contact.tsx` and `components/sections/Footer.tsx`

### Update Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
colors: {
  background: {
    DEFAULT: "#0d0d0f",
    light: "#111113",
  },
  accent: {
    blue: "#3B82F6",
    cyan: "#00F5FF",
  },
}
```

### Add Profile Image

Replace the placeholder in `components/sections/About.tsx` with your actual profile image using Next.js Image component.

## Build for Production

```bash
npm run build
npm start
```

## License

MIT

