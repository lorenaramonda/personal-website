import * as Sentry from '@sentry/browser'
import * as pkg from '~/package.json'

export default defineNuxtPlugin((nuxtApp) => {
  const release = `personalwebsite@${pkg.version}`
  const environment = nuxtApp.$config.public.NODE_ENV

  Sentry.init({
    dsn: nuxtApp.$config.public.SENTRY_DNS,
    release,
    environment,
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    tracesSampleRate: 0.2,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
  })
})
