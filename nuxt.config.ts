export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },

  modules: ['@nuxtjs/color-mode'],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'ralph-portfolio-theme',
  },

  app: {
    head: {
      title: 'Ralph Laurence Sayo — Developer Portfolio',

      meta: [
        {
          name: 'description',
          content:
            'Ralph Laurence C. Sayo is a fourth-year BSIT student exploring web development, mobile applications, and AI-powered systems.',
        },
      ],

      link: [
        {
          rel: 'preconnect',
          href: 'https://fonts.googleapis.com',
        },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: '',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&display=swap',
        },
      ],
    },
  },
})