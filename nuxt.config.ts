// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV !== 'production',
      NODE_ENV: process.env.NODE_ENV,
      SENTRY_DNS: process.env.SENTRY_DNS,
    },
  },
  css: ['@/assets/scss/main.scss'],
  modules: [
    // Doc: https://nuxt.com/modules/i18n
    '@nuxtjs/i18n', // Doc: https://nuxt.com/modules/gtag
    'nuxt-gtag', // Doc: https://github.com/kiwilan/nuxt-svg-transformer (replaces svg-sprite)
    'nuxt-svg-transformer', // Doc: https://nuxt.com/modules/image
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
        },
      },
    ],
    '@nuxt/image',
  ],
  /**
   * Nuxt Svg Transformer module configuration
   */
  svgTransformer: {
    display: false,
  },
  /**
   * NuxtImage module configuration
   */
  // image: ,
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
