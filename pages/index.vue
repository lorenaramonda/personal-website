<template>
  <div class="home">
    <StoryblokComponent v-for="blok in bloks" :key="blok._uid" :blok="blok" />
  </div>
</template>

<script setup lang="ts">
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

// definePageMeta({
//   layout: 'home',
// })

const { $getMetadataFromStory, $setMetadata } = useNuxtApp()
const store = useStore()

const { getParams } = useLocalizedStoryParams()

await useAsyncData('jobs', () => store.fetchJobs())

const page = await useAsyncStoryblok('home', getParams()).catch(() => {})

const content = computed(() => page.value.content)
const bloks = computed(() => content.value.body)

onMounted(() => {
  if (page.value) useStoryblokBridge(page.value.id, (updatedStory) => (page.value = updatedStory))
})

$setMetadata($getMetadataFromStory(content.value))
</script>
