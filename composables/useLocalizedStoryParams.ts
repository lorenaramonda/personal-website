import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'
import type { ISbStoriesParams } from 'storyblok-js-client'

export function useLocalizedStoryParams() {
  const { space } = useStore()

  function getParams({ withFallback = false }: { withFallback?: boolean } = {}) {
    const { locale, locales } = useI18n()
    const config = useRuntimeConfig()

    const languagesAllowed = ['it', 'en']

    const currentLocaleValue = withFallback && !languagesAllowed.includes(locale.value) ? 'en' : locale.value

    const storiesParams = {
      ...(config.public.storyblok.apiOptions as ISbStoriesParams),
      cv: space.version,
    }

    const currentLocale = locales.value
      .map((item): LocaleObject => (typeof item === 'string' ? { code: item } : item))
      .find((lang) => lang.code === currentLocaleValue)

    if (currentLocale) storiesParams.language = currentLocale.code

    return storiesParams
  }

  return {
    getParams,
  }
}
