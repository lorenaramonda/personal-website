<template>
  <div v-editable="blok" class="long-text">
    <h2 v-if="blok.title" class="long-text__title">{{ blok.title }}</h2>

    <RichtextRenderer :document="blok.content" class="long-text__content" />
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
}>()
</script>

<style lang="scss">
.long-text {
}
</style>
