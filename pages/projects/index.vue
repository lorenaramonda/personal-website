<template>
  <ComingSoon v-if="!page">{{ $t('projects.title') }}</ComingSoon>
  <div v-else class="section-projects">
    <div class="container-page">
      <header class="section-projects__title">
        <BaseHeading primary :label="$t('projects.subtitle')">{{ $t('projects.title') }}</BaseHeading>
      </header>
      <div class="section-projects__content">
        <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" />
        <EndOfPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'ProjectPage',
})

const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('projects', getParams())
  .then((data) => data.value.content)
  .catch(() => null)
const projects = await storyblokApi
  .get(`cdn/stories`, {
    ...getParams(),
    is_startpage: false,
    starts_with: 'projects/',
    sort_by: 'first_published_at:asc',
  })
  .then((response) => response.data.stories.map((item: SbBlokData) => item.content) ?? [])

const bloks = computed(() =>
  page.body.map((item: SbBlokData) => {
    if (item.component === 'ItemsList') item.items = projects

    return item
  }),
)

$setMetadata($getMetadataFromStory(page))
</script>

<style lang="scss">
.section-projects {
  background-color: color('main-lightest');

  &__content {
    padding-bottom: 2rem;
  }
}
</style>
