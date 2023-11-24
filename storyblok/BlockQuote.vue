<template>
  <blockquote class="block-quote">
    <p>
      {{ blok.text }}
      <cite v-if="blok.author">{{ blok.author }}</cite>
    </p>
  </blockquote>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
}>()
</script>

<style lang="scss">
.block-quote {
  margin: 2em auto;
  text-align: center;
  border-bottom: dashed 1px #999;
  border-top: dashed 1px #999;
  padding: 0.5em;
  p {
    font-family: $font-family-text;
    font-size: 1.2em;
    font-weight: normal;
    font-style: italic;
    cite::before {
      content: '— ';
      font-family: $font-family-title;
    }
  }
}
</style>
