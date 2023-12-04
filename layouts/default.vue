<template>
  <div class="layout" :class="{ 'layout--full-width': open }">
    <main>
      <slot />
    </main>
    <TheNavigation />
    <TheNavigationToggle class="navigation-toggle navigation__toggle--desktop" :dark="open" @click="open = !open" />
  </div>
  <TheFooter class="layout__footer" />
  <CookiesPolicy />
</template>

<script setup lang="ts">
const open = ref(false)
const store = useStore()
await useAsyncData('jobs', () => store.fetchJobs())
await useAsyncData('space', () => store.fetchSpace())

const { $setMetadata } = useNuxtApp()
$setMetadata()
</script>

<style lang="scss">
.layout {
  @include mq($from: tablet) {
    display: grid;
    grid-template-columns: 370px auto;
    grid-template-rows: 100vh;
    grid-template-areas: 'navigation main';
    overflow: hidden;
    transition: all 0.8s ease-in-out;

    main {
      grid-area: main;
      position: relative;
    }
    .navigation,
    main {
      overflow: auto;
    }
    &__footer {
      display: none;
    }
    .navigation {
      grid-area: navigation;
      border-right: solid 1px var(--color-main-lighter);
      padding-top: 3rem;
    }

    &--full-width {
      grid-template-areas: 'main';
      grid-template-columns: 100%;
      .navigation-toggle {
        left: -25px;
      }
      .navigation {
        display: none;
      }
    }
  }

  @include mq($until: tablet) {
    .navigation__toggle--desktop {
      display: none;
    }
  }

  main {
    display: grid;
    @include mq($until: tablet) {
      min-height: 100vh;
      padding-top: $mobile-toggle-height;
    }
  }
}
</style>
