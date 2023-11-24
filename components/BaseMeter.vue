<template>
  <div v-tooltip="label" class="meter">
    <component :is="icon" v-for="item in items" :key="item.id" class="meter__icon" :class="{ 'meter__icon--full': item.full }" />
    <span class="meter__text">{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'

const { t } = useI18n()
const { $filters } = useNuxtApp()
const { $capitalize } = useNuxtApp()

const props = withDefaults(
  defineProps<{
    value: number
    icon?: 'star' | 'heart'
    min?: number
    max?: number
    low?: number
    high?: number
  }>(),
  {
    icon: 'star',
    min: 0,
    max: 10,
    low: 5,
    high: 8,
  },
)

const icon = computed(() => icons[$capitalize(props.icon)])

const items = computed(() => {
  const items = []
  for (let i = 1; i <= props.max; i++) {
    items.push({
      id: i,
      full: i <= props.value,
    })
  }
  return items
})
const label = computed(() => {
  const str = $filters.rateLabel(props.value)
  return t(str)
})
</script>

<style lang="scss">
.meter {
  cursor: help;
  display: flex;
  &__icon {
    width: 20px;
    height: 20px;
    max-width: none;
    max-height: none;
    stroke: var(--color-main-light);
    &--full {
      stroke: var(--color-main-darker);
    }
  }
  &__text {
    display: none;
  }
}
</style>
