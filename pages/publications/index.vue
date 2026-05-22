<template>
  <div class="section-publications">
    <div class="container-page">
      <header class="section-publications__title">
        <BaseHeading primary :label="$t('publications.subtitle')">{{ page?.title }}</BaseHeading>
        <BlogSections v-if="blogSections.length" :pages="blogSections" />
      </header>
      <div class="section-publications__content">
        <PostsList v-if="postsWithContent.length" :posts="postsWithContent" />
        <EndOfPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from '@storyblok/vue'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

import PostsList from '@/components/PostsList.vue'

defineOptions({
  name: 'PublicationsPage',
})

defineI18nRoute({
  locales: ['it', 'en'],
})

const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()
const { getParams } = useLocalizedStoryParams()

const { data: pageStory } = await useAsyncData('publications-page', () =>
  storyblokApi
    .get('cdn/stories/publications', getParams())
    .then((response) => response.data.story?.content ?? null)
    .catch(() => null),
)

if (!pageStory.value) {
  throw createError({ statusCode: 404 })
}

const page = computed(() => pageStory.value)

const { data: posts } = await useAsyncData('publications-posts', () =>
  storyblokApi
    .get('cdn/stories', {
      ...getParams(),
      starts_with: 'publications/',
      level: 2,
      sort_by: 'first_published_at:desc',
    })
    .then((response) => response.data.stories ?? [])
    .catch(() => []),
)

const postsWithContent = computed(() =>
  (posts.value ?? []).filter((e: ISbStoryData) => !e.is_startpage && e.content.title),
)

const blogSections = computed(() =>
  (posts.value ?? []).filter((e: ISbStoryData) => e.is_startpage && e.content.title),
)

if (pageStory.value) {
  $setMetadata($getMetadataFromStory(pageStory.value))
}
</script>

<style lang="scss" scoped>
.section-publications {
  @include mq($from: desktop) {
    .container-page {
      display: grid;
      grid-template-areas: 'title content';
      grid-template-columns: 40% auto;
      height: 100vh;
      gap: 3rem;
    }
    &__content {
      grid-area: content;
      overflow-y: auto;
    }
  }
}
</style>
