<template>
  <template v-if="$slots.default && to">
    <a v-if="target === '_blank'" :href="to" class="action-link" :class="cssClasses" target="_blank" v-bind="$attrs">
      <slot />
      <component :is="iconComponent" v-if="icon" />
    </a>
    <NuxtLink v-else :to="to" class="action-link" :class="cssClasses" v-bind="$attrs">
      <slot />
      <component :is="iconComponent" v-if="icon" />
    </NuxtLink>
  </template>
</template>

<script setup lang="ts">
// Icons: https://lucide.dev/icons/
import * as icons from 'lucide-vue-next'

const { $capitalize } = useNuxtApp()

const props = defineProps<{
  to: string
  icon?: string
  target?: '_blank'
  type?: 'primary' | 'ghost'
}>()

const iconComponent = computed(() => icons[$capitalize(props.icon)])

const cssClasses = computed(() => (props.type ? `action-link--${props.type}` : 'action-link--link'))
</script>

<style lang="scss">
.action-link {
  @extend %button;
  background-color: transparent;
  color: color('text');

  &--link {
    padding: 0;
    transition: all 0.2s ease-in-out;
    svg {
      width: 16px;
      color: color('main');
      transition: all 0.2s ease-in-out;
    }
    &:hover {
      svg {
        width: 24px;
        transform: translateX(20%);
        color: color('main-dark');
      }
    }
  }

  &--primary,
  &--ghost {
    &:hover {
      background-color: color('main-lightest');
    }
  }
  &--primary {
    background-color: color('background-button-primary');
    color: color('background');
    &:hover {
      background-color: color('background-button-primary-hover');
    }
    &:active {
      background-color: color('background-button-primary-active');
    }
  }
}
</style>
