<template>
  <ComingSoon v-if="!page">{{ $t('projects.title') }}</ComingSoon>
  <div v-else class="section-projects">
    <div class="container-page">
      <header class="section-projects__title">
        <BaseHeading primary :label="$t('projects.subtitle')">{{
          $t('projects.title')
        }}</BaseHeading>
      </header>
      <div class="section-projects__content">
        <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" />
        <EndOfPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/vue'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'ProjectPage',
})

const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()
const { getParams } = useLocalizedStoryParams()

const { data: pageStory } = await useAsyncData('projects-page', () =>
  storyblokApi
    .get('cdn/stories/projects', getParams())
    .then((response) => response.data.story?.content ?? null)
    .catch(() => null),
)

const page = computed(() => pageStory.value)

const { data: projectsList } = await useAsyncData('projects-list', () =>
  storyblokApi
    .get('cdn/stories', {
      ...getParams(),
      is_startpage: false,
      starts_with: 'projects/',
      sort_by: 'first_published_at:asc',
    })
    .then((response) => response.data.stories.map((item: SbBlokData) => item.content) ?? [])
    .catch(() => []),
)

const bloks = computed(() => {
  if (!page.value?.body) {
    return []
  }
  return page.value.body.map((item: SbBlokData) => {
    if (item.component === 'ItemsList') {
      item.items = projectsList.value ?? []
    }
    return item
  })
})

if (pageStory.value) {
  $setMetadata($getMetadataFromStory(pageStory.value))
}
</script>

<style lang="scss">
.section-projects {
  background-color: color('main-lightest');

  &__content {
    padding-bottom: 2rem;
  }
}
</style>
