<template>
  <div class="home">
    <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" />
  </div>
</template>

<script setup lang="ts">
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

const { $getMetadataFromStory, $setMetadata } = useNuxtApp()
const store = useStore()

const { getParams } = useLocalizedStoryParams()

await store.fetchJobs()

const { story: page } = await useAsyncStoryblok('home', { api: getParams(), bridge: {} })

const content = computed(() => page.value?.content)
const bloks = computed(() => content.value?.body ?? [])

if (content.value) {
  $setMetadata($getMetadataFromStory(content.value))
}
</script>
