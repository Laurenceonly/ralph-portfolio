export default defineNuxtConfig({
  compatibilityDate: '2026-09-17',
  devtools: {
    enabled: true,
  },

  modules: ['@nuxtjs/color-mode', '@vercel/analytics'],

  css: ['~/assets/css/main.css'],

  colorMode: {
    preference: 'system',
    fallback: 'dark',
    classSuffix: '',
    storageKey: 'ralph-portfolio-theme',
  },
})
