<template>
  <ul class="blog-sections">
    <li v-for="section in pages" :key="section.uuid" class="blog-sections__item">
      <BaseActionLink :to="`/${section.full_slug}`" :title="section.content.title" type="primary">
        <span>{{ section.content.title }}</span>
      </BaseActionLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  pages: GenericObject[]
}>()
</script>

<style lang="scss">
.blog-sections {
  margin-bottom: 4rem;
}
</style>
