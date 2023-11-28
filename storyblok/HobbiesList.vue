<template>
  <div id="hobbies" v-editable="blok" class="hobbies">
    <BaseHeading>{{ blok.title }}</BaseHeading>
    <ul>
      <li v-for="hobby in blok.items" :key="hobby.name" v-editable="hobby">
        <StoryblokImage v-if="hobby.icon" v-tooltip="hobby.name" :image="hobby.icon" :width="512" :height="512" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
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
