import * as Sentry from '@sentry/browser'
import * as pkg from '~/package.json'

export default defineNuxtPlugin(nuxtApp => {
  const release = `personalwebsite@${pkg.version}`
  const environment = nuxtApp.$config.public.NODE_ENV

  Sentry.init({
    dsn: nuxtApp.$config.public.SENTRY_DNS,
    release,
    environment,
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    tracesSampleRate: 1.0,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
})
