<template>
  <footer class="layout__footer row">
    <div class="left" role="contentinfo">
      <p>
        2020 . <a href="http://lorena.ramonda.me/" itemprop="url">lorena.ramonda.me</a>
        <template v-if="otherLanguages.length > 0">
          <template v-for="lang in otherLanguages">
            |
            <NuxtLink :key="lang.iso" :to="switchLocalePath(lang.code)" class="lang">
              {{ lang.code }}
            </NuxtLink>
          </template>
        </template>
        <br />
        <small>
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
    <div class="right">
      <p><a :href="$t('personality.link')" :title="$t('personality.title')">INFJ-T</a></p>
      <a href="//www.iubenda.com/privacy-policy/262452" class="iubenda-white iubenda-embed" title="Privacy Policy" target="_blank" rel="noreferrer">
        {{ $t('site.privacy') }}
      </a>
    </div>
  </footer>
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
.layout__footer {
  padding-top: 1.2em;
  padding-bottom: 1.2em;
  line-height: normal;
  color: var(--color-main-darker);
  position: relative;

  @include mq($until: tablet) {
    text-align: center;
  }

  .lang {
    text-transform: uppercase;
  }

  p,
  li {
    text-shadow: none;
    margin: 0;
    padding: 0;
    a {
      color: var(--color-main-darker);
      text-decoration: none;
      border-bottom: dashed 1px var(--color-main);
      &.nibbler {
        border: none;
      }
    }
  }
  small {
    color: var(--color-text-minor);
    font-size: 0.75em;
    margin: 1em 0;
    display: block;
    line-height: 1.5em;
    a {
      font-weight: bold;
      text-decoration: underline;
      color: inherit;
      border-bottom: none;
    }
  }
  .iubenda-white {
    color: var(--color-text-minor);
    font-size: 0.75em;
    margin: 1em auto;
    text-decoration: none;
    display: block;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
    @include mq($from: tablet) {
      margin: 1em 0;
      display: inline-block;
      text-align: right;
    }
  }
  @include mq($from: tablet) {
    display: flex;
    justify-content: space-between;
    .right {
      text-align: right;
    }
  }
}
</style>
