import type { ISbStoriesParams } from 'storyblok-js-client'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DNS: process.env.SENTRY_DNS,
    },
  },
  app: {
    head: {
      link: [
        { rel: 'shortcut icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' },
        { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' },
        { rel: 'mask-icon', color: '#73D9D0', href: '/safari-pinned-tab.svg' },
      ],
      meta: [
        { name: 'theme-color', content: '#000000' },
        { name: 'msapplication-TileColor', content: '#2b5797' },
      ],
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
        dir: 'assets/images',
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
    // Doc: https://color-mode.nuxtjs.org/
    '@nuxtjs/color-mode',
    // Doc: https://nuxt.com/modules/vite-pwa-nuxt
    '@vite-pwa/nuxt',
  ],
  // Doce: https://color-mode.nuxtjs.org/
  colorMode: {
    storageKey: 'palette-version',
  },
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
    initialConsent: process.env.GTM_CONSENT === 'true',
  },
  googleFonts: {
    families: {
      Kristi: [400],
      Inter: [100, 400, 600, 700],
      'Source+Serif+4': [200, 400, 700],
      'Source+Code+Pro': [200, 400],
    },
  },
  pwa: {
    manifest: {
      name: 'Lorena Ramonda',
      short_name: 'theRocket.dev',
      id: '/index.html',
      start_url: '/index.html',
      display_override: ['fullscreen', 'minimal-ui'],
      display: 'standalone',
      theme_color: '#000000',
      description: 'Shares from a front-end developer',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      categories: ['development', 'education'],
      screenshots: [
        {
          form_factor: 'wide',
          src: '/images/manifest/screenshot_1280x720_1.webp',
          sizes: '1280x720',
          label: 'Read',
        },
        {
          form_factor: 'wide',
          src: '/images/manifest/screenshot_1280x720_2.webp',
          sizes: '1280x720',
          label: 'Discover',
        },
        {
          form_factor: 'narrow',
          src: '/images/manifest/screenshot_586x1041_1.webp',
          sizes: '586x1041',
          label: 'Read',
        },
        {
          form_factor: 'narrow',
          src: '/images/manifest/screenshot_586x1041_2.webp',
          sizes: '586x1041',
          label: 'Discover',
        },
      ],
    },
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
    },
    devOptions: {
      enabled: true,
      suppressWarnings: true,
      navigateFallbackAllowlist: [/^\/$/],
      type: 'module',
    },
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
