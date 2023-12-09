import type { UseSeoMetaInput } from '@unhead/vue'

type MetadataPayload = {
  title?: string
  description?: string
  keywords?: string
  image?: {
    filename: string
    alt: string
  }
  ogType?:
    | 'website'
    | 'article'
    | 'book'
    | 'profile'
    | 'music.song'
    | 'music.album'
    | 'music.playlist'
    | 'music.radio_status'
    | 'video.movie'
    | 'video.episode'
    | 'video.tv_show'
    | 'video.other'
}

type StorySeoContent = {
  meta_title: string
  meta_description: string
  meta_keywords?: string
  meta_image?: {
    filename: string
    alt: string
  }
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      getMetadataFromStory(content: StorySeoContent) {
        const metadata: MetadataPayload = {
          title: content?.meta_title,
        }
        if (content?.meta_description) metadata.description = content.meta_description
        if (content?.meta_keywords) metadata.keywords = content.meta_keywords
        if (content?.meta_image) metadata.image = content.meta_image

        return metadata
      },
      setMetadata({ title, description, keywords, image, ogType = 'website' }: MetadataPayload = {}) {
        const { t } = useI18n()
        const { fullPath } = useRoute()
        const fallbackTitle = computed(() => t('meta.title'))
        const fallbackDescription = computed(() => t('meta.description'))

        // Doc: https://nuxt.com/docs/getting-started/seo-meta#types
        const metadata: UseSeoMetaInput = {
          title: title || fallbackTitle.value,
          description: fallbackDescription.value,
          ogType,
          ogTitle: title,
          ogUrl: `https://lorena.ramonda.me${fullPath}`,
          ogSiteName: 'Lorena Ramonda',
          twitterCard: 'summary',
          twitterTitle: title,
          twitterCreator: 'Lorena Ramonda',
        }

        if (description) {
          metadata.description = description
          metadata.ogDescription = description
          metadata.twitterDescription = description
        }

        if (keywords) metadata.keywords = keywords

        if (image?.filename) {
          metadata.ogImage = image.filename
          metadata.twitterImage = image.filename
        }
        if (image?.alt) metadata.ogImageAlt = image.alt

        useServerSeoMeta(metadata)
        useSeoMeta(metadata)
      },
    },
  }
})
