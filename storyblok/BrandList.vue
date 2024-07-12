<template>
  <ul v-editable="blok" class="brand-list">
    <li v-for="brand in blok.brands" :key="brand.id" class="brand-list__item">
      <StoryblokImage :image="brand" :height="imgHeight" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
  index?: string
}>()

const imgHeight = 50
</script>

<style lang="scss">
.brand-list {
  display: flex;
  gap: 1rem;
  img {
    border-radius: 1rem;
    padding: 1rem;
  }

  &__item {
    background-color: color('background-brand');
    width: 100px;
    height: 100px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
