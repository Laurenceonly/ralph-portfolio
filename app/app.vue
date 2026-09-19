<script setup lang="ts">
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from 'vue'

/* ========================================
  PAGE / THEME
======================================== */

const siteRoot = ref<HTMLElement | null>(null)
const colorMode = useColorMode()
const themeReady = ref(false)
const themeTransitioning = ref(false)

const currentYear = new Date().getFullYear()
const email = 'dreyast.laurent@gmail.com'

/* ========================================
  SEO / FONTS / PRECONNECTS
======================================== */

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  title: 'Ralph Laurence Sayo — Full-Stack & Mobile Developer',
  meta: [
    {
      name: 'description',
      content:
        'Portfolio of Ralph Laurence C. Sayo — a full-stack and mobile developer. Projects in web, mobile, and AI, including the GraphiScan dysgraphia-screening capstone.',
    },
    { name: 'theme-color', content: '#0e1012' },

    // Open Graph — controls the preview card when this link is
    // shared on LinkedIn, Facebook, Slack, Discord, etc.
    { property: 'og:type', content: 'website' },
    {
      property: 'og:title',
      content: 'Ralph Laurence Sayo — Full-Stack & Mobile Developer',
    },
    {
      property: 'og:description',
      content:
        'Full-stack and mobile developer and freelance visual editor. Projects in web, mobile, and AI, including the GraphiScan dysgraphia-screening capstone.',
    },
    // TODO: replace with your real deployed domain once you have one.
    { property: 'og:url', content: 'https://ralphlaurence.dev' },
    // TODO: add a 1200x630 preview image at this path (public/images/og-cover.png).
    { property: 'og:image', content: '/images/og-cover.png' },

    // Twitter/X card — falls back to the Open Graph tags above if omitted,
    // but summary_large_image needs to be set explicitly.
    { name: 'twitter:card', content: 'summary_large_image' },
    {
      name: 'twitter:title',
      content: 'Ralph Laurence Sayo — Full-Stack & Mobile Developer',
    },
    {
      name: 'twitter:description',
      content:
        'Full-stack and mobile developer and freelance visual editor. Projects in web, mobile, and AI.',
    },
    { name: 'twitter:image', content: '/images/og-cover.png' },
  ],
  link: [
    { rel: 'preconnect', href: 'https://cdn.jsdelivr.net' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&display=swap',
    },
    // TODO: replace with your real deployed domain once you have one.
    { rel: 'canonical', href: 'https://ralphlaurence.dev' },
    // TODO: drop a favicon.svg (and a 180x180 apple-touch-icon.png,
    // both in /public) — browsers/tabs currently show no icon.
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  ],
})

const themeLabel = computed(() => {
  if (!themeReady.value) return 'Toggle color theme'

  return colorMode.value === 'dark'
    ? 'Switch to light theme'
    : 'Switch to dark theme'
})

type TransitionDocument = Document & {
  startViewTransition?: (
    callback: () => Promise<void>,
  ) => {
    finished: Promise<void>
    ready: Promise<void>
    updateCallbackDone: Promise<void>
  }
}

async function toggleTheme(event: MouseEvent) {
  if (themeTransitioning.value) return

  const nextTheme = colorMode.value === 'dark' ? 'light' : 'dark'

  const updateTheme = async () => {
    colorMode.preference = nextTheme
    await nextTick()
  }

  const reducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  const doc = document as TransitionDocument

  if (!doc.startViewTransition || reducedMotion) {
    await updateTheme()
    return
  }

  const button = event.currentTarget as HTMLElement
  const rect = button.getBoundingClientRect()

  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2

  const radius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y),
  )

  doc.documentElement.style.setProperty('--theme-x', `${x}px`)
  doc.documentElement.style.setProperty('--theme-y', `${y}px`)
  doc.documentElement.style.setProperty('--theme-radius', `${radius}px`)

  themeTransitioning.value = true

  try {
    const transition = doc.startViewTransition(updateTheme)

    void transition.ready.catch(() => undefined)

    await transition.finished
  } catch {
    await updateTheme()
  } finally {
    themeTransitioning.value = false
  }
}

/* ========================================
  PROJECT DATA
======================================== */

const projects = [
  {
    id: 'graphiscan',
    number: '01',
    title: 'GraphiScan',
    category: 'AI / CAPSTONE',
    period: 'Fourth year',
    subtitle: 'Screening dysgraphia through handwriting analysis.',
    description:
      'Deep learning models trained to catch patterns the eye misses.',
    note:
      'Presented as a screening research project, not a clinical diagnosis tool.',
    stack: ['Python', 'Flask', 'Vue', 'PyTorch', 'OpenCV', 'TensorFlow'],
    image: '/images/gscan1.png',
    imageAlt: 'GraphiScan application screenshot',
    tone: 'blue',
  },
]

const skillGroups = [
  {
    title: 'Web development',
    description: 'Interfaces, application logic, and databases.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'TypeScript',
      'Bootstrap',
      'Vue',
      'Nuxt',
      'React',
      'Next.js',
      'PHP',
      'Laravel',
      'Node.js',
      'MySQL',
      'PostgreSQL',
      'MongoDB',
    ],
  },
  {
    title: 'Mobile & AI',
    description: 'Mobile experiences and image-analysis experiments.',
    skills: [
      'Flutter',
      'React Native',
      'Firebase',
      'Python',
      'Flask',
      'PyTorch',
      'Keras',
      'OpenCV',
      'TensorFlow',
    ],
  },
  {
    title: 'Design & Editing',
    description: 'Visual editing for posters, tarpaulins, and event materials.',
    skills: ['CapCut', 'Premiere Pro', 'Canva'],
  },
  {
    title: 'Foundations & tools',
    description: 'The tools behind the development process.',
    skills: [
      'Java',
      'C++',
      'Git',
      'GitHub',
      'Docker',
      'Postman',
      'Figma',
      'Vercel',
      'Cisco Networking',
    ],
  },
]

/* ========================================
  CERTIFICATIONS
======================================== */

// Fill in credentialUrl with a verify link if you have one
// (e.g. Credly badge URL). Leave it empty to hide the link arrow.
//
// pdfUrl points to the certificate PDF itself, served from your
// project's /public folder (e.g. put the files in
// public/certificates/ and reference them as /certificates/x.pdf).
const certifications = [
  {
    title: 'CCNA: Introduction to Networks',
    issuer: 'Davao Del Norte State College · Cisco Networking Academy',
    date: 'May 2025',
    credentialUrl: '',
    pdfUrl: '/certificates/ccna1.pdf',
  },
  {
    title: 'CCNA: Switching, Routing, and Wireless Essentials',
    issuer: 'Davao Del Norte State College · Cisco Networking Academy',
    date: 'Dec 2025',
    credentialUrl: '',
    pdfUrl: '/certificates/ccna2.pdf',
  },
]

/* ========================================
  TECH STACK ICONS
======================================== */

const techIconBase = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons'

// Map each stack label to its Simple Icons slug.
// No public brand mark for a tool? Leave it out — it falls back to initials.
const techIconSlugs: Record<string, string> = {
  Python: 'python',
  Flask: 'flask',
  Vue: 'vuedotjs',
  Nuxt: 'nuxtdotjs',
  React: 'react',
  'React Native': 'react',
  'Next.js': 'nextdotjs',
  'Node.js': 'nodedotjs',
  TypeScript: 'typescript',
  PostgreSQL: 'postgresql',
  MongoDB: 'mongodb',
  Keras: 'keras',
  Docker: 'docker',
  Vercel: 'vercel',
  PyTorch: 'pytorch',
  OpenCV: 'opencv',
  TensorFlow: 'tensorflow',
  Flutter: 'flutter',
  Firebase: 'firebase',
  Laravel: 'laravel',
  PHP: 'php',
  MySQL: 'mysql',
  HTML: 'html5',
  CSS: 'css',
  JavaScript: 'javascript',
  Bootstrap: 'bootstrap',
  // Oracle doesn't license the Java coffee-cup mark for open reuse,
  // so this uses OpenJDK's Duke mark instead — the accepted open substitute.
  Java: 'openjdk',
  'C++': 'cplusplus',
  Git: 'git',
  GitHub: 'github',
  Postman: 'postman',
  Figma: 'figma',
  'Cisco Networking': 'cisco',
  NetBeans: 'apachenetbeanside',
  'Premiere Pro': 'adobepremierepro',
  Canva: 'canva',
  // No public brand mark available for CapCut on Simple Icons —
  // falls back to initials ("CA") via techInitials() below.
}

function techIconUrl(tech: string) {
  const slug = techIconSlugs[tech]
  return slug ? `${techIconBase}/${slug}.svg` : null
}

function techInitials(tech: string) {
  return tech.replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()
}

const pulsingChip = ref<string | null>(null)
let pulseTimer: ReturnType<typeof setTimeout> | undefined

function pulseChip(id: string) {
  clearTimeout(pulseTimer)
  pulsingChip.value = id
  pulseTimer = setTimeout(() => {
    pulsingChip.value = null
  }, 900)
}

/* ========================================
  IMAGE FALLBACKS
======================================== */

const failedImages = ref<Record<string, boolean>>({})

function imageFailed(src: string) {
  failedImages.value[src] = true

  void nextTick(() => {
    refreshScroll()
  })
}

/* ========================================
  FEATURED PROJECT CAROUSEL
======================================== */

const carouselTrack = ref<HTMLElement | null>(null)
const activeProject = ref(0)
let carouselScrollRaf: number | undefined

function scrollToProject(index: number) {
  const track = carouselTrack.value
  if (!track) return

  const target = Math.min(Math.max(index, 0), projects.length - 1)
  const slide = track.children[target] as HTMLElement | undefined
  if (!slide) return

  track.scrollTo({ left: slide.offsetLeft, behavior: 'smooth' })
}

function prevProject() {
  scrollToProject(activeProject.value - 1)
}

function nextProject() {
  scrollToProject(activeProject.value + 1)
}

function handleCarouselScroll() {
  const track = carouselTrack.value
  if (!track) return

  if (carouselScrollRaf) cancelAnimationFrame(carouselScrollRaf)

  carouselScrollRaf = requestAnimationFrame(() => {
    const index = Math.round(track.scrollLeft / track.clientWidth)
    activeProject.value = Math.min(Math.max(index, 0), projects.length - 1)
  })
}

/* ========================================
  PROCESS
======================================== */

const processSteps = [
  {
    title: 'Understand',
    description:
      'Every project starts with the problem, not the code. I dig into what\u2019s actually needed \u2014 the requirements, the constraints, who it\u2019s for \u2014 before deciding how to solve it.',
  },
  {
    title: 'Design',
    description:
      'Once the problem is clear, I visualize the solution: sketching flows and mocking up interfaces before writing a single line of code.',
  },
  {
    title: 'Develop',
    description:
      'The design becomes real. I build out the core features first, focused on getting the fundamentals working before anything else.',
  },
  {
    title: 'Improve',
    description:
      'With a working version in hand, I go back through it \u2014 cleaning up rough edges and refining the parts that matter most to the user.',
  },
  {
    title: 'Test',
    description:
      'I put the project through its paces: checking edge cases, fixing what breaks, and making sure it actually does what it was built to do.',
  },
  {
    title: 'Deploy',
    description:
      'Finally, I ship it \u2014 a live demo, a packaged app, or a presentation \u2014 and treat feedback from that point as the start of the next iteration.',
  },
]

/* ========================================
  SKILL EXPLORER
======================================== */

const selectedSkill = ref(0)

const activeSkillGroup = computed(
  () => skillGroups[selectedSkill.value]!,
)

/* ========================================
  SOCIAL / CONTACT LINKS
======================================== */

const socialIconBase = 'https://cdn.jsdelivr.net/npm/simple-icons@latest/icons'

// Rendered with the same CSS-mask technique as the brand icons above
// (background-color: currentColor + mask), instead of an inline SVG
// with `fill`, so the color and ink weight match exactly — no more
// "greyer" mail icon next to the GitHub/Facebook/Instagram marks.
const mailIconUrl = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3.75 5.25h16.5c.966 0 1.75.784 1.75 1.75v10a1.75 1.75 0 0 1-1.75 1.75H3.75A1.75 1.75 0 0 1 2 17V7c0-.966.784-1.75 1.75-1.75Zm.4 1.5L12 12.15l7.85-5.4H4.15ZM20.5 8.9l-7.98 5.49a.9.9 0 0 1-1.04 0L3.5 8.9V17c0 .138.112.25.25.25h16.5a.25.25 0 0 0 .25-.25V8.9Z"/></svg>',
)}`

const mailCopiedIconUrl = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9.55 17.15 4.4 12l1.5-1.5 3.65 3.65L18.1 5.6l1.5 1.5z"/></svg>',
)}`

type SocialLink = {
  name: string
  icon: string | null
  href?: string
  external?: boolean
  type?: 'copy'
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    href: 'https://github.com/Laurenceonly',
    external: true,
    icon: `${socialIconBase}/github.svg`,
  },
  {
    name: 'Email',
    // Copies the address instead of opening mailto:, which gets scraped by bots.
    // See copyEmail() below — rendered as a hand-drawn envelope/checkmark.
    type: 'copy',
    icon: null,
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/ralphsayo26/',
    external: true,
    icon: `${socialIconBase}/facebook.svg`,
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/saintlaurenz26/',
    external: true,
    icon: `${socialIconBase}/instagram.svg`,
  },
]

const emailCopied = ref(false)
let emailCopyTimer: ReturnType<typeof setTimeout> | undefined

async function copyEmail() {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(email)
    } else {
      // Fallback for browsers/contexts without the async Clipboard API.
      const temp = document.createElement('textarea')
      temp.value = email
      temp.style.position = 'fixed'
      temp.style.opacity = '0'
      document.body.appendChild(temp)
      temp.focus()
      temp.select()
      document.execCommand('copy')
      document.body.removeChild(temp)
    }

    emailCopied.value = true
    clearTimeout(emailCopyTimer)
    emailCopyTimer = setTimeout(() => {
      emailCopied.value = false
    }, 2200)
  } catch (error) {
    console.warn('Could not copy email to clipboard.', error)
  }
}

/* ========================================
  CONTACT FORM — FORMSPREE
======================================== */

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xnpqwgor'

const contactForm = reactive({
  name: '',
  email: '',
  message: '',
})

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const formStatus = ref<FormStatus>('idle')
const formErrorMessage = ref('')

async function submitContactForm() {
  if (formStatus.value === 'sending') return

  formStatus.value = 'sending'
  formErrorMessage.value = ''

  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name: contactForm.name,
        email: contactForm.email,
        message: contactForm.message,
      }),
    })

    if (response.ok) {
      formStatus.value = 'success'
      contactForm.name = ''
      contactForm.email = ''
      contactForm.message = ''
      return
    }

    const data = await response.json().catch(() => null)

    formErrorMessage.value =
      data?.errors?.[0]?.message ??
      'Something went wrong sending that — try again, or email me directly.'
    formStatus.value = 'error'
  } catch (error) {
    console.warn('Contact form submission failed.', error)
    formErrorMessage.value =
      'Could not reach the server — check your connection and try again.'
    formStatus.value = 'error'
  }
}

/* ========================================
  POINTER-RESPONSIVE PROJECT IMAGES
======================================== */

let pointerQuery: MediaQueryList | undefined

function movePreview(event: PointerEvent) {
  if (!pointerQuery?.matches || event.pointerType === 'touch') return

  const element = event.currentTarget as HTMLElement
  const rect = element.getBoundingClientRect()

  if (!rect.width || !rect.height) return

  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height

  element.style.setProperty('--pointer-x', `${x * 100}%`)
  element.style.setProperty('--pointer-y', `${y * 100}%`)
  element.style.setProperty('--rotate-x', `${(0.5 - y) * 5}deg`)
  element.style.setProperty('--rotate-y', `${(x - 0.5) * 7}deg`)
}

function resetPreview(event: PointerEvent) {
  const element = event.currentTarget as HTMLElement

  element.style.setProperty('--pointer-x', '50%')
  element.style.setProperty('--pointer-y', '50%')
  element.style.setProperty('--rotate-x', '0deg')
  element.style.setProperty('--rotate-y', '0deg')
}

/* ========================================
  ANIMATION LIFECYCLE
======================================== */

let cleanupMotion: (() => void) | undefined
let refreshMotion: (() => void) | undefined
let disposed = false

function refreshScroll() {
  refreshMotion?.()
}

onMounted(async () => {
  themeReady.value = true

  pointerQuery = window.matchMedia(
    '(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
  )

  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ])

    if (disposed || !siteRoot.value) return

    gsap.registerPlugin(ScrollTrigger)

    const root = siteRoot.value
    const media = gsap.matchMedia()

    const select = (selector: string) =>
      Array.from(root.querySelectorAll<HTMLElement>(selector))

    refreshMotion = () => ScrollTrigger.refresh()

    cleanupMotion = () => {
      media.revert()
      refreshMotion = undefined
    }

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap
        .timeline({
          defaults: {
            ease: 'power3.out',
          },
        })
        .from(select('.hero-eyebrow'), {
          y: 18,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          select('.hero-line > span'),
          {
            yPercent: 115,
            rotate: 3,
            duration: 1.15,
            stagger: 0.13,
          },
          '-=0.35',
        )
        .from(
          select('.hero-portrait-wrap'),
          {
            opacity: 0,
            y: 24,
            duration: 0.9,
          },
          '-=0.9',
        )
        .from(
          select('.hero-bottom > *'),
          {
            y: 28,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
          },
          '-=0.65',
        )

      gsap.to(select('.reading-progress'), {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
        },
      })

      select('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 32,
          opacity: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 92%',
            once: true,
          },
        })
      })
    })

    media.add(
      '(min-width: 901px) and (prefers-reduced-motion: no-preference)',
      () => {
        select('.project-stage').forEach((stage) => {
          const visual = stage.querySelector<HTMLElement>(
            '.project-image-wrap',
          )

          if (!visual) return

          gsap.fromTo(
            visual,
            {
              yPercent: 4,
            },
            {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.8,
              },
            },
          )
        })
      },
    )

    ScrollTrigger.refresh()

    void document.fonts.ready.then(() => {
      if (!disposed) refreshScroll()
    })
  } catch (error) {
    cleanupMotion?.()

    console.warn('Portfolio animations could not be initialized.', error)
  }
})

onBeforeUnmount(() => {
  disposed = true
  clearTimeout(pulseTimer)
  clearTimeout(emailCopyTimer)
  if (carouselScrollRaf) cancelAnimationFrame(carouselScrollRaf)
  cleanupMotion?.()
})
</script>

<template>
  <div ref="siteRoot" class="site-shell">
    <div class="reading-progress" aria-hidden="true"></div>

    <a class="skip-link" href="#main">
      Skip to content
    </a>

    <!-- ==================================
        HEADER
    =================================== -->

    <header class="site-header">
      <a
        class="wordmark"
        href="#home"
        aria-label="Ralph Laurence home"
      >
        rl<span>.</span>
      </a>

      <nav class="main-nav" aria-label="Main navigation">
        <a href="#work">Work</a>
        <a href="#skills">Skills</a>
        <a href="#process">Process</a>
        <a href="#contact">Contact</a>
      </nav>

      <button
        class="theme-toggle"
        type="button"
        role="switch"
        :aria-checked="colorMode.value === 'dark'"
        :aria-label="themeLabel"
        :title="themeLabel"
        :disabled="themeTransitioning"
        @click="toggleTheme"
      >
        <span class="theme-toggle-thumb">
          <svg
            class="sun-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />

            <path
              d="M12 2v2m0 16v2M2 12h2m16 0h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"
            />
          </svg>

          <svg
            class="moon-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M20.9 13.1A9 9 0 0 1 10.9 3a9 9 0 1 0 10 10.1Z"
            />
          </svg>
        </span>
      </button>
    </header>

    <main id="main" tabindex="-1">
      <!-- ==================================
          HERO
      =================================== -->

      <section
        id="home"
        class="hero page-width"
        aria-labelledby="hero-title"
      >
        <div class="hero-orbit" aria-hidden="true"></div>

        <!--
          Hero portrait — two pre-rendered images swapped purely via CSS
          opacity based on the existing `.light` root class (no JS/watchers
          needed, same pattern as every other themed element on the site).

          ralph1.png = full color cutout  -> shown in LIGHT mode
          ralph2.png = grayscale cutout   -> shown in DARK mode (default)

          Purely decorative (the name is already announced via the h1's
          aria-label below), so it's aria-hidden with empty alt text.
        -->
        <div class="hero-portrait-wrap" aria-hidden="true">
          <img
            class="hero-portrait hero-portrait-mono"
            src="/images/ralph2.png"
            alt=""
            width="1000"
            height="1235"
            loading="eager"
            fetchpriority="high"
            decoding="async"
          />

          <img
            class="hero-portrait hero-portrait-color"
            src="/images/ralph1.png"
            alt=""
            width="1000"
            height="1235"
            loading="eager"
            decoding="async"
          />
        </div>

        <p class="eyebrow hero-eyebrow">
          <span class="status-dot" aria-hidden="true"></span>
          Full-Stack Web &amp; Mobile Developer 
        </p>

        <h1
          id="hero-title"
          class="hero-title"
          aria-label="Ralph Laurence."
        >
          <span class="hero-line" aria-hidden="true">
            <span>RALPH</span>
          </span>

          <span
            class="hero-line second-line"
            aria-hidden="true"
          >
            <span>
              LAURENCE<span class="accent">.</span>
            </span>
          </span>
        </h1>

        <div class="hero-bottom">
          <div class="hero-lede">
            <p class="hero-statement">
              Curious by nature.<br />
              <span>Building with purpose.</span>
            </p>
          </div>

          <div class="hero-intro">
            <p>
              I'm Ralph Laurence C. Sayo, a fourth-year BS Information
              Technology student who builds web and mobile applications —
              and edits posters, photos, and videos on the side.
            </p>

            <a class="text-link" href="#work">
              Explore my work
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <!-- ==================================
          SELECTED WORK — SWIPEABLE CAROUSEL
      =================================== -->

      <section
        id="work"
        class="work-section page-width"
        aria-labelledby="work-title"
      >
        <div class="section-heading" data-reveal>
          <p class="eyebrow">01 / SELECTED WORK</p>

          <div class="section-heading-bottom">
            <h2 id="work-title">
              Learning.<br />
              <span class="muted">Made tangible.</span>
            </h2>

            <p>
              A selection of academic and capstone projects across
              different platforms.
            </p>
          </div>
        </div>

        <div class="project-carousel-wrap" data-reveal>
          <div
            ref="carouselTrack"
            class="project-carousel"
            @scroll="handleCarouselScroll"
          >
            <div
              v-for="(project, index) in projects"
              :key="project.id"
              class="project-slide"
            >
              <article
                :id="project.id"
                class="project-row"
                :aria-labelledby="`${project.id}-title`"
              >
                <div class="project-info">
                  <div class="project-meta mono">
                    <span>{{ project.number }} /</span>
                    <span>{{ project.category }}</span>
                    <span>{{ project.period }}</span>
                  </div>

                  <div class="project-heading">
                    <h3 :id="`${project.id}-title`">
                      {{ project.title }}
                    </h3>

                    <p class="project-subtitle">
                      {{ project.subtitle }}
                    </p>
                  </div>

                  <div class="project-copy">
                    <p class="project-description">
                      {{ project.description }}
                    </p>

                    <!--
                      Uses the same .skill-tokens / .token-icon markup
                      as the toolkit section, so icon size and pill
                      styling matches everywhere.
                    -->
                    <ul
                      class="tech-list skill-tokens"
                      :aria-label="`${project.title} technologies`"
                    >
                      <li
                        v-for="tech in project.stack"
                        :key="tech"
                        tabindex="0"
                        role="button"
                        :class="{ 'is-pulsing': pulsingChip === `${project.id}-${tech}` }"
                        @click="pulseChip(`${project.id}-${tech}`)"
                        @keydown.enter="pulseChip(`${project.id}-${tech}`)"
                      >
                        <span
                          v-if="techIconUrl(tech)"
                          class="token-icon"
                          :style="{ '--tech-icon': `url('${techIconUrl(tech)}')` }"
                          aria-hidden="true"
                        />
                        <span v-else class="token-icon token-icon-initial" aria-hidden="true">
                          {{ techInitials(tech) }}
                        </span>

                        {{ tech }}
                      </li>
                    </ul>

                    <p
                      v-if="project.note"
                      class="project-note"
                    >
                      {{ project.note }}
                    </p>
                  </div>
                </div>

                <div
                  class="project-stage"
                  :class="`tone-${project.tone}`"
                  @pointermove="movePreview"
                  @pointerleave="resetPreview"
                  @pointercancel="resetPreview"
                >
                  <div class="stage-grid" aria-hidden="true"></div>
                  <div class="stage-halo" aria-hidden="true"></div>

                  <div class="stage-topline mono">
                    <span class="stage-identity">
                      <span class="window-dots" aria-hidden="true">
                        <i></i>
                        <i></i>
                        <i></i>
                      </span>

                      {{ project.title.toUpperCase() }}
                    </span>

                    <span>
                      {{ project.category.split(' / ')[0] }}
                    </span>
                  </div>

                  <div
                    class="project-image-wrap"
                    role="region"
                    :aria-label="`${project.title} screenshot`"
                  >
                    <img
                      v-if="!failedImages[project.image]"
                      class="project-image"
                      :src="project.image"
                      :alt="project.imageAlt"
                      :loading="index === 0 ? 'eager' : 'lazy'"
                      :fetchpriority="index === 0 ? 'high' : 'auto'"
                      decoding="async"
                      @load="refreshScroll"
                      @error="imageFailed(project.image)"
                    />

                    <div v-else class="image-placeholder">
                      <span
                        class="placeholder-symbol"
                        aria-hidden="true"
                      >
                        ↗
                      </span>

                      <span class="placeholder-title">
                        {{ project.title }}
                      </span>

                      <span class="mono">
                        SCREENSHOT UNAVAILABLE
                      </span>
                    </div>
                  </div>

                  <div class="stage-bottomline">
                    <span class="mono">
                      {{ project.stack.slice(0, 2).join(' + ') }}
                    </span>

                    <span class="mono" aria-hidden="true">
                      ↗
                    </span>
                  </div>

                  <button
                    type="button"
                    class="stage-arrow stage-arrow-prev"
                    :disabled="activeProject === 0"
                    aria-label="Previous project"
                    @click="prevProject"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>

                  <button
                    type="button"
                    class="stage-arrow stage-arrow-next"
                    :disabled="activeProject === projects.length - 1"
                    aria-label="Next project"
                    @click="nextProject"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M9 18l6-6-6-6" />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- ==================================
          SKILLS & CERTIFICATIONS
      =================================== -->

      <section
        id="skills"
        class="skills-section page-width"
        aria-labelledby="skills-title"
      >
        <div class="section-heading" data-reveal>
          <p class="eyebrow">02 / SKILLS &amp; CERTIFICATIONS</p>

          <div class="section-heading-bottom">
            <h2 id="skills-title">
              What I bring<br />
              <span class="muted">to the table.</span>
            </h2>

            <p>
              Core toolkit across web, mobile, and AI — backed by
              certifications along the way.
            </p>
          </div>
        </div>

        <!-- Interactive skill explorer -->

        <div class="skill-explorer" data-reveal>
          <div class="skill-menu">
            <p class="eyebrow muted">
              MY TOOLKIT
            </p>

            <button
              v-for="(group, index) in skillGroups"
              :key="group.title"
              type="button"
              class="skill-option"
              :class="{ 'is-active': selectedSkill === index }"
              :aria-pressed="selectedSkill === index"
              aria-controls="skill-panel"
              @click="selectedSkill = index"
            >
              <span class="mono">
                {{ String(index + 1).padStart(2, '0') }}
              </span>

              <span>
                {{ group.title }}
              </span>

              <span
                class="skill-option-arrow"
                aria-hidden="true"
              >
                ↗
              </span>
            </button>
          </div>

          <div
            id="skill-panel"
            class="skill-panel"
            role="region"
            aria-live="polite"
            :aria-label="activeSkillGroup.title"
          >
            <Transition
              name="skill"
              mode="out-in"
              @after-enter="refreshScroll"
            >
              <div
                :key="selectedSkill"
                class="skill-panel-content"
              >
                <span
                  class="skill-watermark"
                  aria-hidden="true"
                >
                  {{ String(selectedSkill + 1).padStart(2, '0') }}
                </span>

                <p class="eyebrow">
                  CAPABILITIES / TOOLKIT
                </p>

                <h3>
                  {{ activeSkillGroup.title }}
                </h3>

                <p class="skill-description">
                  {{ activeSkillGroup.description }}
                </p>

                <ul
                  class="skill-tokens"
                  :aria-label="activeSkillGroup.title"
                >
                  <li
                    v-for="(skill, index) in activeSkillGroup.skills"
                    :key="skill"
                    :style="{ '--token-index': index }"
                  >
                    <span
                      v-if="techIconUrl(skill)"
                      class="token-icon"
                      :style="{ '--tech-icon': `url('${techIconUrl(skill)}')` }"
                      aria-hidden="true"
                    />
                    <span v-else class="token-icon token-icon-initial" aria-hidden="true">
                      {{ techInitials(skill) }}
                    </span>

                    {{ skill }}
                  </li>
                </ul>
              </div>
            </Transition>
          </div>
        </div>

        <!-- Certifications -->

        <div class="credentials" data-reveal>
          <p class="eyebrow muted">
            CERTIFICATIONS
          </p>

          <ul class="credential-list">
            <li
              v-for="cert in certifications"
              :key="cert.title"
              class="credential-item"
            >
              <span
                class="token-icon credential-icon"
                :style="{ '--tech-icon': `url('${techIconUrl('Cisco Networking')}')` }"
                aria-hidden="true"
              />

              <div class="credential-text">
                <p class="credential-title">
                  {{ cert.title }}
                </p>

                <p class="credential-meta mono muted">
                  {{ cert.issuer }} · {{ cert.date }}
                </p>
              </div>

              <div class="credential-actions">
                <a
                  v-if="cert.pdfUrl"
                  class="view-certificate-btn"
                  :href="cert.pdfUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`View certificate PDF: ${cert.title}`"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <path d="M14 2v6h6" />
                  </svg>

                  View certificate
                </a>

                <a
                  v-if="cert.credentialUrl"
                  class="credential-link"
                  :href="cert.credentialUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`View credential: ${cert.title}`"
                >
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <!-- ==================================
          PROCESS
      =================================== -->

      <section
        id="process"
        class="process-section page-width"
        aria-labelledby="process-title"
      >
        <div class="section-heading" data-reveal>
          <p class="eyebrow">03 / HOW I BUILD</p>

          <div class="section-heading-bottom">
            <h2 id="process-title">
              From idea<br />
              <span class="muted">to finished product.</span>
            </h2>

            <p>
              The process I follow on every project, from capstone
              research to smaller builds.
            </p>
          </div>
        </div>

        <ol class="process-grid" data-reveal>
          <li
            v-for="(step, index) in processSteps"
            :key="step.title"
            class="process-step"
          >
            <span class="process-index mono">
              {{ String(index + 1).padStart(2, '0') }}
            </span>

            <h3>{{ step.title }}</h3>

            <p>{{ step.description }}</p>
          </li>
        </ol>
      </section>

      <!-- ==================================
          CONTACT
      =================================== -->

      <section
        id="contact"
        class="contact-section page-width"
        aria-labelledby="contact-title"
      >
        <div data-reveal>
          <p class="eyebrow">
            04 / WHAT'S NEXT?
          </p>

          <h2 id="contact-title">
            Have something<br />

            <span class="contact-last-line">
              <span class="muted">in mind?</span>

              <a
                class="contact-arrow"
                :href="`mailto:${email}`"
                aria-label="Email Ralph"
              >
                <span aria-hidden="true">↗</span>
              </a>
            </span>
          </h2>

          <div class="contact-columns">
            <form
              class="contact-form"
              novalidate
              @submit.prevent="submitContactForm"
            >
              <p class="mono muted contact-form-label">
                Send a message
              </p>

              <div class="form-field">
                <label class="form-label mono" for="contact-name">
                  Name
                </label>

                <input
                  id="contact-name"
                  v-model="contactForm.name"
                  class="form-input"
                  type="text"
                  name="name"
                  autocomplete="name"
                  required
                />
              </div>

              <div class="form-field">
                <label class="form-label mono" for="contact-email">
                  Email
                </label>

                <input
                  id="contact-email"
                  v-model="contactForm.email"
                  class="form-input"
                  type="email"
                  name="email"
                  autocomplete="email"
                  required
                />
              </div>

              <div class="form-field">
                <label class="form-label mono" for="contact-message">
                  Message
                </label>

                <textarea
                  id="contact-message"
                  v-model="contactForm.message"
                  class="form-input form-textarea"
                  name="message"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div class="form-actions">
                <button
                  type="submit"
                  class="form-submit"
                  :disabled="formStatus === 'sending'"
                >
                  {{ formStatus === 'sending' ? 'Sending…' : 'Send message' }}
                </button>

                <p
                  v-if="formStatus === 'success'"
                  class="form-status is-success"
                  role="status"
                >
                  Message sent — I'll get back to you soon.
                </p>

                <p
                  v-else-if="formStatus === 'error'"
                  class="form-status is-error"
                  role="alert"
                >
                  {{ formErrorMessage }}
                </p>
              </div>
            </form>

            <div class="contact-bottom">
              <div class="social-links-group">
                <p class="mono muted social-links-label">
                  Social links
                </p>

                <div class="social-links-row">
                  <template v-for="link in socialLinks" :key="link.name">
                    <button
                      v-if="link.type === 'copy'"
                      type="button"
                      class="social-link"
                      :class="{ 'is-confirmed': emailCopied }"
                      :aria-label="emailCopied ? `${email} copied to clipboard` : `Copy email address: ${email}`"
                      @click="copyEmail"
                    >
                      <span
                        class="social-link-icon"
                        :style="{ '--tech-icon': `url('${emailCopied ? mailCopiedIconUrl : mailIconUrl}')` }"
                        aria-hidden="true"
                      />
                    </button>

                    <a
                      v-else
                      class="social-link"
                      :href="link.href"
                      :target="link.external ? '_blank' : undefined"
                      :rel="link.external ? 'noopener noreferrer' : undefined"
                      :aria-label="link.name"
                    >
                      <span
                        v-if="link.icon"
                        class="social-link-icon"
                        :style="{ '--tech-icon': `url('${link.icon}')` }"
                      />
                    </a>
                  </template>
                </div>

                <p
                  class="copy-feedback mono"
                  :class="{ 'is-visible': emailCopied }"
                  role="status"
                  aria-live="polite"
                >
                  {{ emailCopied ? 'Copied to clipboard' : '' }}
                </p>
              </div>

              <p>
                For dev collaborations, freelance editing<br />
                requests, or just a conversation about building<br />
                things — these are my socials, feel free to reach out.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- ==================================
        FOOTER
    =================================== -->

    <footer class="site-footer page-width">
      <span>
        © {{ currentYear }} Ralph Laurence C. Sayo
      </span>

      <div class="footer-links">
        <a href="#home">
          Back to top
          <span aria-hidden="true">&nbsp;↑</span>
        </a>
      </div>
    </footer>
  </div>
</template>