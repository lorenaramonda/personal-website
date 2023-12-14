import type { ISbStoriesParams } from 'storyblok-js-client'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV !== 'production',
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DNS: process.env.SENTRY_DNS,
    },
  },
  app: {
    head: {
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  css: ['@/assets/scss/main.scss'],
  modules: [
    // Doc: https://nuxt.com/modules/i18n
    '@nuxtjs/i18n',
    // Doc: https://nuxt.com/modules/gtag
    'nuxt-gtag',
    // Doc: https://nuxt.com/modules/image
    [
      '@nuxt/image-edge',
      {
        storyblok: {
          baseURL: 'https://a.storyblok.com',
        },
      },
    ], // Doc: https://nuxt.com/modules/storyblok
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        bridge: true,
        devtools: true,
        apiOptions: {
          version: process.env.NODE_ENV === 'production' ? 'published' : 'draft',
        } as ISbStoriesParams,
      },
    ],
    '@nuxt/image',
    // Doc: https://pinia.vuejs.org/ssr/nuxt.html
    '@pinia/nuxt',
    // Doc: https://google-fonts.nuxtjs.org/getting-started/setup
    '@nuxtjs/google-fonts',
    // Doc: https://lucide.dev/packages
    'nuxt-lucide-icons',
  ],
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
  /**
   * Nuxt I18n module configuration
   */
  i18n: {
    baseUrl: process.env.BASE_URL ?? 'https://lorena.ramonda.me',
    strategy: 'prefix_except_default',
    defaultLocale: 'it',
    locales: [
      {
        name: 'Italiano',
        code: 'it',
        iso: 'it-IT',
        file: 'it.js',
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en.js',
      },
      {
        name: 'Español',
        code: 'es',
        iso: 'es-ES',
        file: 'es.js',
      },
    ],
    lazy: false,
    langDir: 'langs/',
    // Doc: https://v8.i18n.nuxtjs.org/guide/browser-language-detection
    detectBrowserLanguage: false,
  },
  /**
   * Nuxt gtag module configuration
   */
  gtag: {
    id: process.env.GTM,
    initialConsent: false,
  },
  googleFonts: {
    families: {
      Kristi: [400],
      Inter: [100, 400, 600, 700],
      // 'Source+Sans+3': [200, 400, 700],
      'Source+Serif+4': [200, 400, 700],
    },
  },
  routeRules: {
    '/publications/what-i-love-about-vuejs': { redirect: { to: '/', statusCode: 301 } },
  },
  sourcemap: {
    server: false,
    client: true,
  },
  experimental: {
    payloadExtraction: false,
  },
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  vite: {
    optimizeDeps: { exclude: ['fsevents'] },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/variables/_index.scss" as *;',
        },
      },
    },
  },
})
