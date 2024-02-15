<template>
  <div class="section-hobbies">
    <div v-if="page" v-editable="page" class="container-page">
      <header class="section-publications__title">
        <BaseHeading primary :label="$t('hobbies.title')">
          <template v-if="page.full_slug" #breadcrumbs>
            <BaseBreadcrumbs :items="breadcrumbs" />
          </template>
          {{ page.content.title }}
        </BaseHeading>
      </header>
      <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" class="section-hobbies__content" />
      <EndOfPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ISbStoryData } from 'storyblok-js-client'

import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

const localePath = useLocalePath()

defineOptions({
  name: 'DynamicHobbyPage',
})

const { params } = useRoute()
const storyblokApi = useStoryblokApi()
const { $getMetadataFromStory, $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()
const { t } = useI18n()

const page: Ref<ISbStoryData> = ref()

const slugParams = computed(() => {
  return [params.slug].flat().join('/')
})

const data = await storyblokApi
  .get(`cdn/stories/hobbies/${slugParams.value}`, {
    ...getParams(),
    resolve_relations: 'HobbiesList.items',
  })
  .then((response) => response.data)
  .catch(() => null)

page.value = data.story

if (!page) {
  throw createError({
    statusCode: 404,
  })
}

const content = computed(() => page.value.content)
const breadcrumbs = computed(() => [
  {
    slug: localePath({ name: 'hobbies' }),
    title: t('hobbies.title'),
  },
])

const bloks = computed(() => {
  if (!content.value.body) return []
  return content.value.body.map((item: SbBlokData) => {
    if (item.component === 'HobbiesList') {
      return {
        ...item,
        items: Array.isArray(item.items) ? item.items.map((story: ISbStoryData) => ({ ...story.content, full_slug: story.full_slug })) : [],
      }
    }

    return item
  })
})

onMounted(() => {
  useStoryblokBridge(page.value?.id, (updatedStory) => (page.value = updatedStory))
})

if (content) $setMetadata($getMetadataFromStory(content.value))
</script>

<style lang="scss">
.section-hobbies {
  &__content {
    .long-text__content {
      font-family: $font-family-title;
      line-height: 1.8;
      font-size: 1.2em;
      font-weight: 200;
      max-width: 1000px;
    }
  }
}
</style>
