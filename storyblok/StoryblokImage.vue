<template>
  <img :src="filename" :alt="image.alt" :title="title" />
</template>

<script setup lang="ts">
import type { StoryblokImage } from '@/types'

const store = useStore()
await useAsyncData('jobs', () => store.fetchJobs())

const props = defineProps<{
  image: StoryblokImage
}>()

const filename = computed(() => {
  return props.image.focus ? `${props.image.filename}/m/800x800/filters:focal(${props.image.focus})` : props.image.filename
})

const title = computed(() => {
  const imageInfo = [props.image.title, props.image.copyright, props.image.source].filter((item) => !!item)
  return imageInfo.join(' / ')
})
</script>
