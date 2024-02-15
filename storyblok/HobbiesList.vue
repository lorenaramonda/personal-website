<template>
  <ItemsList v-if="blok" :blok="blok" />
</template>

<script setup lang="ts">
import type { ItemListSchema } from '@/types'

const { blok } = defineProps<{
  blok: ItemListSchema
}>()
</script>

<style lang="scss">
.hobbies {
  margin-top: 2em;
  text-align: center;
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      margin: 0 2.8rem 1.2rem 0;
      img {
        max-width: 60px;
        height: auto;
      }
    }
  }
}
</style>
