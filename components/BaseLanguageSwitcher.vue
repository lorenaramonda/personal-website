<template>
  <p v-if="otherLanguages.length > 0" class="language-switcher">
    <template v-for="lang in otherLanguages">
      |
      <NuxtLink :key="lang.iso" v-tooltip.top="lang.name" :to="switchLocalePath(lang.code)" class="lang">
        {{ lang.code }}
      </NuxtLink>
    </template>
    |
  </p>
</template>

<script>
export default {
  computed: {
    otherLanguages() {
      const langs = this.$i18n.locales.filter(lang => lang.code !== this.$i18n.locale)
      return langs || []
    }
  }
}
</script>

<style lang="scss">
.language-switcher {
  text-transform: uppercase;
  line-height: 1.5em;
  font-family: $font-family-text;
}
</style>
