<template>
  <div id="contacts" class="onepage-contact-wrapper" :class="`onepage-contact-wrapper--${blok.bg_color}`">
    <section v-editable="blok" class="onepage-contacts">
      <div class="onepage-contacts__left">
        <BaseHeading>{{ blok.title }}</BaseHeading>
        <ContactAddress />
        <ClientOnly>
          <ContactEmail />
        </ClientOnly>
      </div>
      <div class="onepage-contacts__right"></div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const props = defineProps<{
  blok: GenericObject
}>()

const bgColor = computed(() => {
  if (props.blok.bg_color === 'main') return 'var(--color-main-dark)'
  if (props.blok.bg_color === 'secondary') return 'var(--color-secondary)'
  if (props.blok.bg_color === 'dark') return 'var(--color-text)'
  return 'transparent'
})
</script>

<style lang="scss">
.onepage-contact-wrapper {
  background-color: v-bind(bgColor);
  &--dark {
    color: var(--color-bg);
  }
}
.onepage-contacts {
  @include container;
  min-height: 400px;
  display: flex;
  justify-content: space-between;

  &__left {
    display: flex;
    flex-direction: column;
  }
}
</style>
