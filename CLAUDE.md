# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Start Next.js dev server (http://localhost:3000)
- `npm run build` — Production build
- `npm run lint` — Run ESLint (flat config, `eslint.config.mjs`)
- `npm run preview` — Build + preview with OpenNext Cloudflare
- `npm run deploy` — Build + deploy to Cloudflare via OpenNext
- `npm run upload` — Build + upload to Cloudflare
- `npm run cf-typegen` — Regenerate `cloudflare-env.d.ts` from wrangler config

No test framework is configured in this project.

## Architecture

**Next.js 16 App Router** portfolio site deployed on **Cloudflare Workers** via `@opennextjs/cloudflare`.

### Routes
- `/` — Home page (CoverSection + BlogSection + AboutSection)
- `/about` — About page with background, skills, contact info
- `/projects` — Project cards grid (static data)

### Key Components (`app/components/`)
- `CoverSection` — Hero section with full-screen background image (`/cover.jpg`), scroll-based blur effect, typewriter splash animation that fades into the "Welcome" hero, then transitions to page content
- `SplashScreen` — Separate typewriter splash with gradient text animation (not currently used in layout)
- `Navbar` — Fixed top nav with transparent/glassmorphism styling, responsive mobile menu
- `BlogSection` — Blog post cards with glassmorphism style (`backdrop-blur-md`, semi-transparent backgrounds), static placeholder data
- `AboutSection` — Summary section on home page with "Learn More" link to full about page
- `Footer` — Simple footer with copyright and GitHub link

### Tech Stack
- **React 19**, **TypeScript**
- **Tailwind CSS v4** (PostCSS plugin `@tailwindcss/postcss`)
- **next/font** (Inter via Google Fonts)
- **react-icons** (installed, usage TBD)

### Deployment
- Cloudflare Workers via `@opennextjs/cloudflare`
- Config in `wrangler.jsonc` — worker name `tasrovy-web`, Node.js compat enabled
- Static assets: `public/_headers` sets immutable cache for `/_next/static/*`
- R2 incremental cache available but not yet enabled in `open-next.config.ts`

### Styling Conventions
- Dark mode via `prefers-color-scheme` media query
- Custom CSS animations in `app/globals.css`: `animate-gradient`, `animate-blink`, `animate-fade-in`, `animate-pulse-slow`
- Glassmorphism theme: semi-transparent backgrounds (`bg-white/40`, `backdrop-blur-md`, `border-white/10`)
- Path alias `@/*` maps to project root (configured in `tsconfig.json`)
