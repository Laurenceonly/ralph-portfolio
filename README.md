# Ralph Laurence — Developer Portfolio

Personal portfolio site for **Ralph Laurence C. Sayo**, a fourth-year BSIT student. Built with Nuxt 4, showcasing the GraphiScan capstone project, technical skills, certifications, and contact information.

🔗 https://ralph-portfolio-tau.vercel.app/

---

## Features

- Animated hero and scroll-triggered reveals (GSAP + ScrollTrigger)
- Featured GraphiScan capstone project with its technology stack
- Interactive skill explorer (Web / Mobile & AI / Foundations & Tools)
- Certifications list with linked PDF certificates
- Light/dark theme toggle with a circular view-transition animation
- Fully responsive (desktop → tablet → mobile)

## Tech Stack

- [Nuxt 4](https://nuxt.com/) / Vue 3 (`<script setup>`, Composition API)
- [GSAP](https://gsap.com/) + ScrollTrigger for animation
- [Simple Icons](https://simpleicons.org/) CDN for tech logos
- Plain CSS with custom properties (no Tailwind/UI kit)

## Getting Started

Install dependencies:

```bash
npm install
```

Run the dev server (defaults to `http://localhost:3000`):

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Project Structure Notes

- Certificate PDFs live in `public/certificates/` and are referenced by `pdfUrl` in the certifications data.
- The GraphiScan screenshot lives in `public/images/` and is referenced by the `project` data in `app/app.vue`.
- Fonts (Space Grotesk) and tech icons load from CDNs (`fonts.googleapis.com`, `cdn.jsdelivr.net`) — no local font files needed.

## Deployment

This project deploys cleanly to [Vercel](https://vercel.com) with zero configuration (Nuxt is auto-detected). See deployment steps below.

## Contact

- Email: dreyast.laurent@gmail.com
- GitHub: [@Laurenceonly](https://github.com/Laurenceonly)

## License

© 2026 Ralph Laurence C. Sayo. All rights reserved.
