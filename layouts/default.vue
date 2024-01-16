<template>
  <div class="layout" :class="{ 'layout--full-width': open }">
    <main ref="main">
      <slot />
    </main>
    <TheNavigation />
    <TheNavigationToggle class="navigation-toggle navigation__toggle--desktop" :dark="open" @click="open = !open" />
    <ClientOnly>
      <PaletteSwitcher
        :class="{ 'palette-switcher--hidden': !showPaletteSwitcher }"
        @mouseenter="togglePaletteSwitcher(true)"
        @mouseleave="togglePaletteSwitcher(false)"
      />
    </ClientOnly>
  </div>
  <TheFooter class="layout__footer" />
  <CookiesPolicy />
</template>

<script setup lang="ts">
const SCROLL_TREESHOLD = 100
const open = ref(false)
const showPaletteSwitcher = ref(true)
const main = ref<HTMLElement>()

function handleScroll() {
  if (currentScrollTop() >= SCROLL_TREESHOLD) {
    showPaletteSwitcher.value = false
  } else {
    showPaletteSwitcher.value = true
  }
}

function togglePaletteSwitcher(value: boolean) {
  if (currentScrollTop() < SCROLL_TREESHOLD) return
  showPaletteSwitcher.value = value
}

function currentScrollTop() {
  return main.value?.scrollTop ?? 0
}

onMounted(() => {
  main.value?.addEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
.layout {
  @include mq($from: tablet) {
    display: grid;
    grid-template-columns: 370px auto;
    grid-template-rows: 100vh;
    grid-template-areas: 'navigation main';
    overflow: hidden;

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
      border-right: solid 1px var(--color-border-navigation);
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

  .palette-switcher {
    position: fixed;
    top: 6px;
    right: 40px;
    transition: all 0.2s ease-in-out;
    @include mq($from: tablet) {
      top: 10px;
      right: 10px;
    }
    &--hidden {
      opacity: 0;
    }
  }
}
</style>
