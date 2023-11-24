<template>
  <template v-if="blok.label && blok.link?.cached_url">
    <a
      v-if="blok.link?.target === '_blank'"
      v-editable="blok"
      :href="blok.link.cached_url"
      class="action-button"
      :class="cssClasses"
      target="_blank"
      v-bind="$attrs"
    >
      {{ blok.label }}
      <component :is="icon" v-if="blok.icon" />
    </a>
    <NuxtLink v-else v-editable="blok" :to="blok.link.cached_url" class="action-button" :class="cssClasses" v-bind="$attrs">
      {{ blok.label }}
      <component :is="icon" v-if="blok.icon" />
    </NuxtLink>
  </template>
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next'

import type { GenericObject } from '@/types'

const { $capitalize } = useNuxtApp()

const props = defineProps<{
  blok: GenericObject
}>()

const icon = computed(() => icons[$capitalize(props.blok.icon)])

const cssClasses = computed(() => (props.blok.type ? `action-button--${props.blok.type}` : null))
</script>

<style lang="scss">
.action-button {
  background-color: transparent;
  color: var(--color-text);
  border-radius: 10px;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  justify-content: space-between;
  padding: 1rem 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  height: 45px;
  white-space: nowrap;
  &:hover {
    background-color: var(--color-main-lightest);
  }

  &--primary {
    background-color: var(--color-main-dark);
    color: var(--color-bg);
    &:hover {
      background-color: var(--color-main-darkest);
    }
  }
}
</style>
