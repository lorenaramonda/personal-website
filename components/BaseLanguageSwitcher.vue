<template>
  <nav v-if="availableLocales.length > 0" class="language-switcher">
    <span class="language-switcher__label">{{ $t('languages.spoken') }}</span>
    <ul class="language-switcher__items">
      <li
        v-for="lang in availableLocales"
        :key="lang.code"
        class="language-switcher__item"
        :class="{ 'language-switcher__item--current': lang.code === locale, 'language-switcher__item--hide': !switchLocalePath(lang.code) }"
      >
        <template v-if="switchLocalePath(lang.code)">
          <span class="language-switcher__lang">{{ lang.name }}</span>
          <NuxtLink
            v-if="lang.code !== locale"
            v-tooltip.top="$t(`languages.${lang.code}`)"
            :to="switchLocalePath(lang.code) || ''"
            :title="$t('languages.goto', { lang: $t(`languages.${lang.code}`) })"
            exact
            @click="emit('click')"
          >
            <img :src="`/images/flags/${lang.code}.png`" width="32" height="32" :alt="lang.name" />
          </NuxtLink>
          <span v-else v-tooltip.top="$t('languages.current', { lang: lang.name })">
            {{ foodPerLang[lang.code] }}
          </span>
        </template>
      </li>
      <li v-if="$slots.default" class="language-switcher__item language-switcher__others">
        <slot />
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { LocaleObject } from '@nuxtjs/i18n/dist/runtime/composables'

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const store = useStore()

const foodPerLang: Record<string, string> = {
  it: '🍝',
  en: '🌭',
  es: '🌮',
  fr: '🧇',
  pt: '🥑',
}

const emit = defineEmits<{
  (e: 'click'): void
}>()

const availableLocales = computed(() => {
  return locales.value
    .map((item): LocaleObject => (typeof item === 'string' ? { code: item } : item))
    .filter((item) => store.spaceLanguages.map((code) => code.substring(0, 2)).includes(item.code))
})
</script>

<style lang="scss">
.language-switcher {
  &__label {
    display: inline-block;
    margin-bottom: 1rem;
    font-style: italic;
    color: var(--color-neutral);
  }
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
    overflow: hidden;
    &--current {
      background-color: var(--color-main-light);
      span {
        cursor: help;
      }
    }
    &--hide {
      display: none;
    }
    a {
      display: block;
      position: relative;
      &::before {
        content: '';
        width: 2px;
        height: 2px;
        display: block;
        background-color: var(--color-main-light);
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 0;
      }
      &:hover::before {
        transition: all 0.5s ease-in;
        transform: scale(25);
        opacity: 0;
      }
    }
    img {
      width: 20px;
      height: auto;
      cursor: pointer;
      position: relative;
      z-index: 1;
    }
  }
  &__lang {
    text-indent: -1000px;
  }
  &__others a {
    display: block;
    background-color: var(--color-main-lighter);
    color: var(--color-main-darkest);
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-decoration: none;
    span {
      display: none;
    }
    svg {
      position: relative;
      z-index: 1;
      width: 16px;
    }
  }
}
</style>
