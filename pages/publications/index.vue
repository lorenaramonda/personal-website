<template>
  <div class="section-publications">
    <div class="container-page">
      <header class="section-publications__title">
        <BaseHeading primary :label="$t('publications.subtitle')">{{ $t('publications.title') }}</BaseHeading>
      </header>
      <div class="section-publications__content">
        <PostsList :posts="posts" />
        <EndOfPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

import PostsList from '@/components/PostsList.vue'

defineOptions({
  name: 'PublicationsPage',
})

const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('publications', getParams()).catch(() => null)

const posts = await storyblokApi
  .get(`cdn/stories`, {
    ...getParams({ withFallback: true }),
    is_startpage: false,
    starts_with: 'publications/',
    sort_by: 'first_published_at:desc',
  })
  .then((response) => response.data.stories ?? [])

const content = computed(() => page.value.content)

$setMetadata($getMetadataFromStory(content.value))
</script>

<style lang="scss" scoped>
.section-publications {
  @include mq($from: desktop) {
    .container-page {
      display: grid;
      grid-template-areas: 'title content';
      grid-template-columns: 40% auto;
      height: 100vh;
    }
    &__content {
      grid-area: content;
      overflow-y: auto;
    }
  }
}
</style>
