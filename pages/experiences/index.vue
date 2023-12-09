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
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'
import type { StoryblokComponent } from '@/types'

defineOptions({
  name: 'ProjectPage',
})

const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('experiences', getParams()).catch(() => null)

const store = useStore()

const content = computed(() => page.value.content)
const bloks = computed(() =>
  content.value.body.map((item: StoryblokComponent) => {
    if (item.component === 'ItemsList' && store.jobs?.length) item.items = store.jobs
    if (item.component === 'LongText') item.component = 'ExperienceSummary'

    return item
  }),
)

$setMetadata($getMetadataFromStory(content.value))
</script>

<style lang="scss">
.section-experiences {
  &__content {
    background-color: var(--color-main-lightest);
    display: grid;
    .section-title {
      margin-bottom: 2rem;
      text-shadow: 0px 0px 1px var(--color-text);
      color: var(--color-main-lightest);
      font-size: 2em;
    }
  }
}
</style>
