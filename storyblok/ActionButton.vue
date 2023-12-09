<template>
  <BaseActionLink :to="url" :target="blok.link?.target" :icon="blok.icon" :title="blok.link.title" :type="blok.type">
    {{ blok.label }}
  </BaseActionLink>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const props = defineProps<{
  blok: GenericObject
}>()

const url = computed(() => {
  return props.blok.link.linktype === 'story' && !props.blok.link.cached_url.startsWith('/')
    ? `/${props.blok.link.cached_url}`
    : props.blok.link.cached_url
})
</script>
