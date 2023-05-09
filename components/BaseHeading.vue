<template>
  <h2 class="section-title" :class="{ 'section-title--minor': minor }">
    <slot />
  </h2>
</template>

<script>
export default {
  props: {
    minor: Boolean
  }
}
</script>

<style lang="scss">
.section-title {
  font-family: $font-family-title;
  font-size: 3.3em;
  line-height: normal;
  text-transform: uppercase;
  margin-bottom: 0.35em;
  max-width: 100%;
  overflow: hidden;
  @include mq($from: tablet) {
    font-size: 4em;
  }
  &--minor {
    text-transform: none;
  }
}
</style>
