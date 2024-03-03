<template>
  <span class="blog-tag" :class="{ 'blog-tag--active': active }">{{ label }}</span>
</template>
<script setup lang="ts">
defineProps<{
  label: string
  active?: boolean
}>()
</script>
<style lang="scss">
.blog-tag {
  text-transform: uppercase;
  font-size: 1.2rem;
  padding: 0.2rem 0.7rem;
  color: color('background');
  background-color: color('main-darker');
  font-weight: normal;
  vertical-align: middle;

  &--active {
    background-color: color('tag-active');
  }
}
</style>
