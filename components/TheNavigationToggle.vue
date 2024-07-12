<template>
  <button :aria-label="$t('misc.toggleMenu')" :title="$t('misc.toggleMenu')" class="navigation-toggle" :class="{ 'navigation-toggle--dark': dark }">
    <LucideMenu />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  dark?: boolean
}>()
</script>

<style lang="scss">
.navigation-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: color('background');
  color: color('main-darker');
  width: $mobile-toggle-height;
  height: $mobile-toggle-height;
  border-radius: 0 0 15px 15px;
  border: solid 2px transparent;
  border-top: 0;
  margin: 0;
  padding: 0;
  &--dark {
    color: color('text');
  }

  @include mq($until: tablet) {
    position: fixed;
    top: 0;
    right: 0;
    &::before {
      content: '';
      height: $mobile-toggle-height;
      background-color: color('background');
      position: fixed;
      top: 0;
      right: 0;
      width: 100vw;
      z-index: 0;
    }
    svg {
      position: relative;
      z-index: 1;
    }
  }

  @include mq($from: tablet) {
    position: absolute;
    top: 20px;
    left: 345px;
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
    box-shadow: 0 4px 5px 1px color('main', 0.2);
    cursor: pointer;
    color: color('main-light');

    &:active {
      color: color('text');
    }
    &:hover {
      color: color('main-darker');
    }

    &--dark {
      color: color('main-darker');
    }
  }
}
</style>
