<template>
  <span v-if="availableLocales.length > 0" class="language-switcher">
    <template v-for="lang in availableLocales" :key="lang.code">
      | <NuxtLink v-tooltip.top="lang.name" :to="switchLocalePath(lang.code) || ''" class="lang">{{ lang.code }}</NuxtLink>
    </template>
    {{ closingText }}
  </span>
</template>

<script setup>
const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const props = defineProps({
  unwrapped: Boolean,
})

const availableLocales = computed(() => {
  return locales.value.filter(lang => lang.code !== locale.value)
})

const closingText = computed(() => {
  return props.unwrapped ? '' : '|'
})
</script>

<style lang="scss">
.language-switcher {
  text-transform: uppercase;
  line-height: 1.5em;
  font-family: $font-family-text;
}
</style>
