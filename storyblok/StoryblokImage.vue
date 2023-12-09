<template>
  <NuxtImg
    v-tooltip="title"
    provider="storyblok"
    :src="props.image.filename"
    :modifiers="modifiers"
    :title="title"
    :alt="image.alt"
    :width="calculatedWidth"
    :height="calculatedHeight"
  />
</template>

<script setup lang="ts">
import type { StoryblokImage } from '@/types'

const props = withDefaults(
  defineProps<{
    image: StoryblokImage
    width?: number
    height?: number
  }>(),
  {
    width: 0,
    height: 0,
  },
)

const { t } = useI18n()

const modifiers = computed(() => {
  return { filters: { focal: props.image.focus } }
})

const calculatedWidth = computed(() => props.width || undefined)
const calculatedHeight = computed(() => props.height || undefined)

const title = computed(() => {
  const imageInfo = props.image.title ? [props.image.title] : []
  if (props.image.copyright) imageInfo.push(`${t('misc.credits')}: ${props.image.copyright}`)
  if (props.image.source) imageInfo.push(`${t('misc.source')}: ${props.image.source}`)
  return imageInfo.join(' / ')
})
</script>
