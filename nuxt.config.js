export default {
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  // mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'static',
  server: {
    host: process.env.NUXT_HOST || 'localhost',
    port: process.env.NUXT_PORT || 3000
  },
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    htmlAttrs: {
      lang: 'it'
    },
    title: 'Lorena Ramonda',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'Front End Developer'
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://platform.twitter.com/widgets.js',
        defer: true,
        body: true
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['@/assets/scss/main.scss'],
  /**
   * Nuxtjs Style Resources configuration
   */
  styleResources: {
    scss: './assets/scss/_variables.scss'
  },
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/filters', '~/plugins/tooltip'],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: [{ path: '~/storyblok', extensions: ['vue'] }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    // Doc: https://pwa.nuxtjs.org/
    '@nuxtjs/pwa',
    // Doc: https://nuxt-community.github.io/nuxt-i18n/
    'nuxt-i18n',
    // Doc: https://www.npmjs.com/package/@nuxtjs/style-resources
    '@nuxtjs/style-resources',
    // Doc: https://www.npmjs.com/package/cookie-universal-nuxt
    'cookie-universal-nuxt',
    // Doc: https://github.com/nuxt-community/svg-sprite-module
    '@nuxtjs/svg-sprite',
    // Doc: https://github.com/nuxt-community/sentry-module
    '@nuxtjs/sentry',
    // Doc: https://github.com/nuxt-community/gtm-module
    '@nuxtjs/gtm',
    // Doc: https://www.npmjs.com/package/nuxt-lazy-load/v/latest
    [
      'nuxt-lazy-load',
      {
        directiveOnly: true
      }
    ],
    // Doc: https://github.com/netsells/nuxt-hotjar
    [
      '@netsells/nuxt-hotjar',
      {
        id: process.env.HOTJAR || '',
        sv: '6'
      }
    ],
    // Doc: https://github.com/storyblok/storyblok-nuxt
    [
      'storyblok-nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
        cacheProvider: 'memory'
      }
    ],
    // Doc: https://sitemap.nuxtjs.org/guide/configuration
    '@nuxtjs/sitemap'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /**
   * I18n module configuration
   * See https://nuxt-community.github.io/nuxt-i18n/options-reference.html
   */
  i18n: {
    locales: [
      {
        name: 'Italiano',
        code: 'it',
        iso: 'it-IT',
        file: 'it.js'
      },
      {
        name: 'English',
        code: 'en',
        iso: 'en-US',
        file: 'en.js'
      }
    ],
    lazy: true,
    langDir: 'langs/',
    defaultLocale: 'it',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      onlyOnRoot: true
    }
  },
  /**
   * SvgSprite module configuration
   */
  svgSprite: {
    input: '~/assets/images/icons'
  },
  /**
   * Sentry module configuration
   */
  sentry: {
    dsn: process.env.SENTRY_DNS,
    config: {
      disableClientSide: true
    }
  },
  /**
   * Google Tag Manager module configuration
   */
  gtm: {
    id: process.env.GTM || ''
  },
  /*
   ** Configure the generation of your universal web application to a static web application.
   ** When launching nuxt generate Nuxt.js will use the configuration defined in the generate property.
   */
  generate: {
    dir: 'public'
  },
  sitemap: {
    hostname: 'https://lorena.ramonda.me',
    i18n: true,
    defaults: {
      changefreq: 'weekly',
      priority: 1,
      lastmod: new Date()
    }
  },
  pwa: {
    manifest: {
      name: 'Lorena Ramonda',
      short_name: 'Lorena R.',
      start_url: '../index.html',
      display: 'fullscreen',
      background_color: '#fff',
      description: 'Interact with Lorena',
      lang: 'it-IT'
    },
    meta: {
      author: 'Lorena Ramonda',
      ogSiteName: 'Lorena Ramonda',
      ogDescription: 'Front End Developer',
      ogImage: '/images/social_image_for_sharing.png',
      twitterCard: 'summary',
      twitterSite: '@loreenaramonda',
      twitterCreator: '@loreenaramonda',
      nativeUI: true
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    }
  }
}
