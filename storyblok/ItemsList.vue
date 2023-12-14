<template>
  <BaseHeading v-if="blok.title"> {{ blok.title }}</BaseHeading>
  <ul v-if="itemsMapped" v-editable="blok" class="items-list" :class="`items-list--${blok.layout}`" v-bind="$attrs">
    <li v-for="(item, index) in items" :key="item.uid">
      <StoryblokComponent :key="item._uid" :blok="item" :index="prependZero(index + 1)" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import type { GenericObject } from '@/types'

const { $capitalize } = useNuxtApp()

const props = defineProps<{
  blok: GenericObject
}>()

const itemsMapped = computed(() => {
  return props.blok.items?.map((item: SbBlokData) => {
    return { ...item, component: item.component ? $capitalize(`${item.component}-card`) : 'ItemsListCard' }
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
.items-list {
  display: grid;
  grid-template-columns: 100%;
  gap: 4rem;
  @include mq($from: mobile) {
    &--columns {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  &--grid {
    @include mq($from: mobile) {
      grid-template-columns: repeat(2, 1fr);
    }
    @include mq($from: desktop) {
      grid-template-columns: repeat(3, 1fr);
    }
  }
}
</style>
