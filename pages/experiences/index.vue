<template>
  <ComingSoon v-if="!page">{{ $t('experiences.title') }}</ComingSoon>
  <template v-else>
    <div class="section-experiences">
      <div class="container-page">
        <header class="section-experiences__title">
          <BaseHeading primary :label="$t('experiences.subtitle')">{{ $t('experiences.title') }}</BaseHeading>
        </header>
      </div>
      <div class="section-experiences__content">
        <div class="container-page">
          <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" class="section-experiences__blok" />
          <EndOfPage />
        </div>
      </div>
    </div>
  </template>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'ProjectPage',
})

const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('experiences', getParams())
  .then((data) => data.value.content)
  .catch(() => null)

const store = useStore()

await useAsyncData('jobs', () => store.fetchJobs())

const bloks = computed(() =>
  page.body.map((item: SbBlokData) => {
    if (item.component === 'ItemsList' && store.jobs?.length) item.items = store.jobs
    if (item.component === 'LongText') item.component = 'ExperienceSummary'

    return item
  }),
)

$setMetadata($getMetadataFromStory(page))
</script>

<style lang="scss">
.section-experiences {
  &__content {
    background-color: color('main-lightest');
    display: grid;
    .section-title {
      margin: 3rem 0;
      color: color('main-darkest');
      font-size: 2em;
    }
  }
}
</style>
