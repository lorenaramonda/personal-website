<template>
  <article v-if="blok" id="languages" v-editable="blok" class="languages">
    <ul class="languages__list">
      <li v-for="lang in blok.items" :key="lang.name" v-editable="lang">
        <LanguageCard :lang="lang" />
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
}>()
</script>

<style lang="scss">
.languages__list li {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 0.9em;
  max-width: 400px;

  p {
    margin: 0 1.5em 0 0;
    font-size: 1em;
  }

  small {
    display: block;
    color: color('text-light');
    line-height: 2;
    font-size: 0.8em;
  }
}
</style>
