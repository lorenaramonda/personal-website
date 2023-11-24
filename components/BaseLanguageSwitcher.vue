<template>
  <nav v-if="availableLocales.length > 0" class="language-switcher">
    <ul class="language-switcher__items">
      <li
        v-for="lang in availableLocales"
        :key="lang.code"
        class="language-switcher__item"
        :class="{ 'language-switcher__item--current': lang.code === locale }"
      >
        <NuxtLink
          v-if="lang.code !== locale"
          v-tooltip.top="lang.name"
          :to="switchLocalePath(lang.code) || ''"
          :title="lang.name"
          exact
          @click="emit('click')"
        >
          <img :src="`/images/flags/${lang.code}.png`" width="32" height="32" alt="" />
        </NuxtLink>
        <span v-else v-tooltip.top="$t('languages.current', { lang: lang.name })">
          {{ foodPerLang[lang.code] }}
        </span>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const availableLocales = computed(() => {
  return locales.value
})

const foodPerLang = {
  it: '🍝',
  en: '🌭',
  es: '🌮',
}
</script>

<style lang="scss">
.language-switcher {
  &__items {
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: space-between;
    gap: 1rem;
  }
  &__item {
    width: 30px;
    height: 30px;
    display: inline-flex;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    &--current {
      background-color: var(--color-main-light);
      span {
        cursor: help;
      }
    }
    a {
      display: block;
    }
    img {
      width: 20px;
      height: auto;
      cursor: pointer;
    }
  }
}
</style>
