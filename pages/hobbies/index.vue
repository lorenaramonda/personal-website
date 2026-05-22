<template>
  <ComingSoon v-if="!page">{{ $t('hobbies.title') }}</ComingSoon>
  <div v-else class="section-hobbies">
    <div class="container-page">
      <header class="section-hobbies__title">
        <BaseHeading primary :label="$t('hobbies.subtitle')">{{ $t('hobbies.title') }}</BaseHeading>
      </header>

      <StoryblokComponent
        v-for="blok in bloks"
        :key="blok._uid"
        :blok="blok"
        class="section-hobbies__blok"
      />

      <EndOfPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SbBlokData, ISbStoryData } from '@storyblok/vue'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'HobbiesPage',
})

const { $setMetadata, $getMetadataFromStory } = useNuxtApp()
const { getParams } = useLocalizedStoryParams()

const { story } = await useAsyncStoryblok('hobbies', {
  api: { ...getParams(), resolve_relations: 'HobbiesList.items' },
  bridge: {},
})

const page = computed(() => story.value?.content ?? null)

const bloks = computed(() => {
  if (!page.value?.body) {
    return []
  }
  return page.value.body.map((item: SbBlokData) => {
    if (item.component === 'HobbiesList') {
      return {
        ...item,
        items: Array.isArray(item.items)
          ? item.items.map((s: ISbStoryData) => ({ ...s.content, full_slug: s.full_slug }))
          : [],
      }
    }
    return item
  })
})

if (page.value) {
  $setMetadata($getMetadataFromStory(page.value))
}
</script>

<style lang="scss">
.section-hobbies {
  &__blok {
    margin-bottom: 2rem;
  }
}
</style>
