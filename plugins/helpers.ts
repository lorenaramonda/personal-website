import { getDurationInYears, getDurationInMonth } from '@/helpers'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getDate(date: string, iso: string = 'it', options?: DateTimeFormatOptions) {
        if (!date) return date
        const dateFormat = {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        } as DateTimeFormatOptions
        if (options?.weekday === undefined) delete dateFormat.weekday
        return new Date(date).toLocaleDateString(iso, dateFormat)
      },
      getDurationInYears,
      getDurationInMonth,
      getURLDomain(url: string) {
        return new URL(url).hostname.replace('www.', '')
      },
      capitalize(s: string) {
        return s.replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()).replace(/[-_]+(.)/g, (_, c) => '' + c.toUpperCase())
      },
      getPostLang(lang: string) {
        const { locale } = useI18n()
        if (lang === 'default' || locale.value === lang) return undefined
        return lang
      },
    },
  }
})
