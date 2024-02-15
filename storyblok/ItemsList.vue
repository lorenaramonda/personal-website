<template>
  <BaseHeading v-if="blok.title"> {{ blok.title }}</BaseHeading>
  <ThePagination v-if="pagination" :show-mode="pagination.mode" :show-pages="pagination.pages" :active-mode="layoutMode" @set-mode="setMode" />
  <ul v-if="items" v-editable="blok" class="items-list" :class="listClasses" v-bind="$attrs">
    <li
      v-for="(item, index) in items"
      :key="item._uid"
      class="items-list__item"
      :class="{
        'items-list__item--highlighted': (blok.recent_on_top && item._uid === lastItemUid) || items.length === 1,
        'items-list__item--single': items.length === 1,
      }"
    >
      <StoryblokComponent
        :key="item._uid"
        :blok="item"
        :index="prependZero(index + 1)"
        :mode="layoutMode"
        class="items-list__card"
        :class="{ 'items-list__card--single': items.length === 1 }"
        :highlighted="blok.recent_on_top && item._uid === lastItemUid"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import type { SbBlokData } from '@storyblok/js'
import type { ItemListSchema, LayoutMode } from '@/types'

const { $capitalize } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    blok: ItemListSchema
    order?: 'desc' | 'asc'
  }>(),
  {
    order: 'desc',
  },
)

const layoutMode: Ref<LayoutMode> = ref(props.blok.layout.split('.')[0] as LayoutMode)

const listClasses = computed(() => {
  return [`items-list--mode-${layoutMode.value}`, `items-list--layout-${props.blok.layout.replace('.', '-')}`]
})

const items = computed(() => {
  return props.blok.items?.map((item: SbBlokData) => {
    return { ...item, component: item.component ? $capitalize(`${item.component}-card`) : 'ItemsListCard' }
  })
})

const lastItemUid = computed(() => {
  const index = props.order === 'desc' ? 0 : items.value.length - 1
  return items.value[index]._uid
})

const pagination = computed(() => {
  if (items.value.length <= 1 || (!props.blok.show_pagination && !props.blok.enable_switch_layout)) return false
  return {
    pages: props.blok.show_pagination,
    mode: props.blok.enable_switch_layout,
  }
})

function prependZero(number: number) {
  if (number <= 9) return '0' + number
  return number.toString()
}

function setMode(mode: LayoutMode) {
  layoutMode.value = mode
}
</script>

<style lang="scss">
.items-list {
  transition: all 0.3s ease-in-out;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 0;

  &--mode-grid {
    gap: 3rem;

    @include mq($from: mobile) {
      &.items-list--layout-grid-2columns {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    &.items-list--layout-grid-3columns {
      @include mq($from: mobile) {
        grid-template-columns: repeat(2, 1fr);
      }
      @include mq($from: desktop) {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .items-list__item--highlighted {
      order: -1;
      @include mq($from: mobile) {
        grid-column: 1 / span 2;
      }
    }

    .items-list__item--single {
      order: -1;
      @include mq($from: mobile) {
        grid-column: 1 / span 2;
      }
      @include mq($from: desktop) {
        grid-column: 1 / span 3;
      }
    }
  }

  &--mode-list {
    &.items-list--layout-list-1column {
      gap: 3rem;
    }
  }

  &__card {
    transition: all 0.3s ease-in-out;
  }
}
</style>
