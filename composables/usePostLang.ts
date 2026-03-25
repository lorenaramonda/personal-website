export const usePostLang = () => {
  const { locale } = useI18n()

  const getPostLang = (lang: string) => {
    if (lang === 'default' || locale.value === lang) return undefined
    return lang
  }

  return { getPostLang }
}
