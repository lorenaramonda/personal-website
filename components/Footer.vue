<template>
  <footer class="layout__footer row">
    <div class="left medium-6 column" role="contentinfo">
      <p>
        2020 . <a href="http://lorena.ramonda.me/" itemprop="url">lorena.ramonda.me</a>
        <template v-if="otherLanguages.length > 0">
          <template v-for="lang in otherLanguages">
            |
            <n-link :key="lang.iso" :to="switchLocalePath(lang.code)" class="lang">
              {{ lang.code }}
            </n-link>
          </template>
        </template>
        <br />
        <small class="hide-for-small">
          <i18n path="site.tecnology" tag="span">
            <template #framework>
              <a href="https://nuxtjs.org/" target="_blank" rel="noreferrer">Nuxt.js</a>
            </template>
            <template #host>
              <a href="https://www.netlify.com/" target="_blank" rel="noreferrer">Netlify</a>
            </template>
            <template #repo>
              <a href="https://github.com/lorenaramonda/personal-website" target="_blank" rel="noreferrer">Github</a>
            </template>
          </i18n>
        </small>
      </p>
    </div>
    <div class="right medium-6 column">
      <p class="hide-for-small">
        <a :href="linkPdf" target="_blank" download>
          {{ $t('cv.downloadable') }}
        </a>
      </p>
      <a href="//www.iubenda.com/privacy-policy/262452" class="iubenda-white iubenda-embed" title="Privacy Policy" target="_blank" rel="noreferrer">
        {{ $t('site.privacy') }}
      </a>
    </div>
  </footer>
</template>

<script>
export default {
  computed: {
    linkPdf() {
      const currentLocale = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
      const langPrefix = currentLocale && currentLocale.code !== 'it' ? `-${currentLocale.code}` : ''
      return `/download/lorena-ramonda-cv${langPrefix}.pdf`
    },
    otherLanguages() {
      const langs = this.$i18n.locales.filter(lang => lang.code !== this.$i18n.locale)
      return langs || []
    }
  }
}
</script>

<style scoped>
.lang {
  text-transform: uppercase;
}
small a {
  font-weight: bold;
  text-decoration: underline;
  color: inherit;
  border-bottom: none;
}
</style>
