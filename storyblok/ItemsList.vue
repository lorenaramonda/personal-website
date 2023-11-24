<template>
  <BaseHeading v-if="blok.title"> {{ blok.title }}</BaseHeading>
  <ul v-editable="blok" class="item-list" :class="`item-list--${blok.layout}`" v-bind="$attrs">
    <li v-for="(item, index) in items" :key="item.uid">
      <StoryblokComponent :key="item._uid" :blok="item" :index="prependZero(index + 1)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { $capitalize } = useNuxtApp()

const props = defineProps<{
  blok: GenericObject
}>()

const itemsMapped = computed(() => {
  return props.blok.items.map((item) => {
    return { ...item, component: $capitalize(`${item.component}-card`) }
  })
})

const items = computed(() => {
  return itemsMapped.value
})

function prependZero(number: number) {
  if (number < 9) return '0' + number
  return number
}
</script>

<style lang="scss">
.item-list {
  display: grid;
  grid-template-columns: 100%;
  gap: 4rem;
  @include mq($from: mobile) {
    &--columns {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &--grid {
    @include mq($from: tablet) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mq($from: desktop) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
