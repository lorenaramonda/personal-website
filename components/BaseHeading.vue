<template>
  <span v-if="label || $slots.breadcrumbs" class="section-title__label">
    <slot name="breadcrumbs">
      {{ label }}
    </slot>
  </span>
  <component :is="tag" class="section-title" v-bind="$attrs">
    <slot />
  </component>
</template>

<script setup lang="ts">
const props = defineProps<{
  label?: string
  primary?: boolean
}>()

const tag = computed(() => (props.primary ? 'h1' : 'h2'))
</script>

<style lang="scss">
.section-title {
  font-family: $font-family-title;
  font-size: 2.3em;
  line-height: normal;
  font-weight: 700;
  margin-bottom: 0.35em;
  max-width: 100%;
  overflow: hidden;
  @include mq($from: tablet) {
    font-size: 3em;
  }

  &__label {
    display: flex;
    text-transform: uppercase;
    align-items: center;
    gap: 10px;
    &:before {
      content: '';
      width: 30px;
      height: 1px;
      background-color: color('text');
    }
  }
}
</style>
