<template>
  <div class="section-publications" :class="cssClass">
    <div v-if="page" v-editable="page" class="container-page">
      <template v-if="isStartpage">
        <header class="section-publications__title">
          <BaseHeading primary :label="$t('publications.title')">
            <template v-if="page.full_slug" #breadcrumbs>
              <BaseBreadcrumbs :slug="page.full_slug" />
            </template>
            {{ page.content.title }}
          </BaseHeading>
        </header>
        <template v-if="bloks?.length">
          <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" order="asc" />
        </template>
      </template>
      <template v-else>
        <PostArticle v-if="page.content" :post="page.content" :published-date="page.first_published_at" :slug="page.full_slug" />
      </template>
      <EndOfPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import type { ISbStoryData } from 'storyblok-js-client'

import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'
import type { GenericObject } from '@/types'

defineOptions({
  name: 'DynamicBlogPage',
})

defineI18nRoute({
  locales: ['it', 'en'],
})

const { params } = useRoute()
const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page: Ref<ISbStoryData> = ref()
const bloks = ref([])
const cssClass: Ref<string | undefined> = ref(undefined)

const slugParams = computed(() => {
  return [params.slug].flat().join('/')
})

const data = await storyblokApi
  .get(`cdn/stories/publications/${slugParams.value}`, getParams())
  .then((response) => response.data)
  .catch(() => null)

page.value = data.story

if (!page) {
  throw createError({
    statusCode: 404,
  })
}

const content = computed(() => page.value.content)
const isStartpage = computed(() => page.value.is_startpage)
const excludedSlug = computed(() => (slugParams.value.endsWith('/') ? `publications/${slugParams.value}` : `publications/${slugParams.value}/`))

if (isStartpage.value) {
  const posts = await storyblokApi
    .get(`cdn/stories`, {
      ...getParams(),
      is_startpage: content?.value.show_sections || false,
      starts_with: `publications/${slugParams.value}`,
      excluding_slugs: excludedSlug.value,
      sort_by: 'first_published_at:asc,position:asc',
    })
    .then(
      (response) =>
        response.data.stories.map((item: SbBlokData) => ({
          ...item.content,
          full_slug: item.full_slug,
          lang: item.lang,
          first_published_at: item.first_published_at,
        })) ?? [],
    )
    .catch(() => null)

  if (content.value.body?.length && posts) {
    bloks.value = content.value.body.map((item: SbBlokData) => {
      if (item.component === 'ItemsList') item.items = posts.filter((e: GenericObject) => e.title)
      return item
    })
  }

  cssClass.value = data.story.content?.bg_color ? `section-publications--${data.story.content.bg_color}` : undefined
}

onMounted(() => {
  useStoryblokBridge(page.value?.id, (updatedStory) => (page.value = updatedStory))
})

if (content) $setMetadata({ ...$getMetadataFromStory(content.value), ogType: !isStartpage.value ? 'article' : undefined })
</script>

<style lang="scss">
.section-publications {
  &--primary {
    background-color: var(--color-main-lighter);
    .pagination {
      background-color: var(--color-main-lighter);
    }
  }
  &--secondary {
    background-color: var(--color-secondary-light);
    .pagination {
      background-color: var(--color-secondary-light);
    }
  }
}
</style>
