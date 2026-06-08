# Harsh Yadav — Portfolio

Personal portfolio site for Harsh Yadav, an AI/ML-focused Computer Science undergraduate building with Python, PyTorch, React, Next.js, Node.js, and FastAPI.

**Live site:** [https://portfolio2-ivory-mu.vercel.app/](https://portfolio2-ivory-mu.vercel.app/)

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion & GSAP
- Lenis (smooth scrolling)
- Resend (contact form delivery)

## Sections

- Hero, Quick Facts, About, Impact, Skills, How I Build
- Featured Projects (GitHub-backed with curated fallbacks)
- Process, Resume, Contact

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Contact form delivery requires:

- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `RESEND_FROM_EMAIL` (optional)

Optional:

- `NEXT_PUBLIC_SITE_URL` — canonical URL for Open Graph metadata (defaults to `https://portfolio2-ivory-mu.vercel.app`)

See `CONTACT_FORM_SETUP.md` and `VERCEL_SETUP.md` for deployment configuration.

## Production Build

```bash
npm run build
npm start
```

## Project Configuration

Featured GitHub repositories, display names, and resume-aligned project copy live in `lib/config.ts`. Profile and skills data are centralized in `lib/profile-data.ts`.
