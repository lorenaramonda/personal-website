<template>
  <div class="section-publications">
    <div v-if="post" class="container-page">
      <article v-editable="post" class="section-publications__post-article" itemscope itemtype="https://schema.org/Article">
        <BaseHeading v-if="post.content.title" primary :label="$t('publications.title')" itemprop="name">{{ post.content.title }}</BaseHeading>
        <time class="post-lists__item-date" :datetime="post.first_published_at">
          <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(post.first_published_at, currentLocale?.iso) }}</span>
        </time>
        <RichtextRenderer
          v-if="post.content.long_text"
          :document="post.content.long_text"
          class="section-publications__post-content"
          itemprop="description"
        />
        <span itemprop="author">Lorena Ramonda</span>
        <EndOfPage />
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from 'storyblok-js-client'

import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'PostPage',
})

const { localeProperties: currentLocale } = useI18n()
const { params } = useRoute()
const storyblokApi = useStoryblokApi()
const { $getDate, $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const post: Ref<ISbStoryData> = ref()

const { data: story } = await useAsyncData('post', async () => await storyblokApi.get(`cdn/stories/publications/${params.post}`, getParams()), {
  transform: (value) => value.data.story,
})
post.value = story.value

if (!post) error({ statusCode: 404, message: 'Page not found' })

onMounted(() => {
  useStoryblokBridge(post.value?.id, (updatedStory) => (post.value = updatedStory))
})

if (post.value?.content) $setMetadata($getMetadataFromStory(post.value.content))

useHead({
  meta: [{ name: 'og:type', content: 'article' }],
})
</script>

<style lang="scss">
.section-publications {
  &__post-content {
    font-family: $font-family-title;
    line-height: 1.8;
    font-size: 1.2em;
    font-weight: 200;
    max-width: 1000px;
  }
}
</style>
