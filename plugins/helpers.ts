import { getDurationInYears, getDurationInMonth } from '~/helpers'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getDate(date: string, iso: string) {
        if (!date) return date
        return new Date(date).toLocaleDateString(iso, {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      },
      getDurationInYears,
      getDurationInMonth,
      getURLDomain(url: string) {
        return new URL(url).hostname.replace('www.', '')
      },
      capitalize(s: string) {
        return s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace(/[-_]+(.)/g, (_, c) => '' + c.toUpperCase())
      },
    },
  }
})
