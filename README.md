# Code & Motions — Homepage

A from-scratch homepage for the Code & Motions digital agency, built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Scripts

- `npm run dev` — start the local dev server
- `npm run build` — production build (also runs the TypeScript check)
- `npm run start` — serve the production build
- `npm run lint` — ESLint

## Project structure

```
src/
  app/
    layout.tsx        Root layout: fonts, SEO metadata
    page.tsx           Homepage composition
    sitemap.ts          Sitemap route
    globals.css         Design tokens (color, font) + base styles
  components/
    Header.tsx           Sticky nav, mobile hamburger menu
    Hero.tsx              Hero section
    MotionStreaks.tsx     Brand signature graphic (reused sparingly)
    ServicesCarousel.tsx  Draggable/scrollable services carousel
    ServiceCard.tsx        Single service card
    CTA.tsx                 Closing "Start a Project" section
    Footer.tsx               Footer
    SocialIcon.tsx            Small in-house social icons
  data/
    services.ts               Service content — edit here to add/change services
  fonts/
    index.ts                   next/font/local setup for Manrope
    manrope/*.ttf                The Manrope font files
public/
  images/
    logo-header.png      Logo mark + wordmark (no tagline), used in the header
    logo-full.png          Full logo lockup with tagline, used in the footer/OG image
  robots.txt
```

## Notes

- Only the homepage is built. Other nav links (`/about`, `/blog`, `/softwares`, `/contact`) are wired up but the pages don't exist yet — build them next and the header/footer links will resolve automatically.
- The "Get Started" and "Start a Project" buttons currently scroll to the `#start-a-project` section on this page. Once a real contact page or form exists, point them at `/contact`.
- No backend, database or auth — frontend only, as scoped.
- Logo files were only cropped and had their white background made transparent; no colors, shapes or type were altered.
