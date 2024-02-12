<template>
  <ComingSoon v-if="!page">{{ $t('hobbies.title') }}</ComingSoon>
  <div v-else class="section-hobbies">
    <div class="container-page">
      <header class="section-hobbies__title">
        <BaseHeading primary :label="$t('hobbies.subtitle')">{{ $t('hobbies.title') }}</BaseHeading>
      </header>

      <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" class="section-hobbies__blok" />

      <EndOfPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import type { ISbStoryData } from 'storyblok-js-client'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'HobbiesPage',
})

const { $setMetadata, $getMetadataFromStory } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('hobbies', {
  ...getParams(),
  resolve_relations: 'HobbiesList.items',
})
  .then((data) => data.value.content)
  .catch(() => null)

const bloks = computed(() => {
  if (!page.body) return []
  return page.body.map((item: SbBlokData) => {
    if (item.component === 'HobbiesList') {
      return {
        ...item,
        items: Array.isArray(item.items) ? item.items.map((story: ISbStoryData) => ({ ...story.content, full_slug: story.full_slug })) : [],
      }
    }

    return item
  })
})

$setMetadata($getMetadataFromStory(page))
</script>

<style lang="scss">
.section-hobbies {
  &__blok {
    margin-bottom: 2rem;
  }
}
</style>
