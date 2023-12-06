<template>
  <div class="copyrights" role="contentinfo">
    <p>
      2023 .
      <a href="https://lorena.ramonda.me/" itemprop="url" class="copyrights__domain" :title="$t('link.lorena')">lorena.ramonda.me</a>
      <span class="copyrights__spoiler">is</span>
      <a v-tooltip.top="'Whoooaaa, SPOILER! 🙀'" href="https://therocket.dev/" itemprop="url" :title="$t('link.rocket')" class="copyrights__domain">
        therocket.dev
      </a>
      <br />
      <small>
        <i18n-t keypath="site.tecnology" tag="span" scope="global">
          <template #framework>
            <a href="https://nuxt.com/" :title="$t('link.nuxt')" target="_blank" rel="noopener">Nuxt3</a>
          </template>
          <template #cms>
            <a href="https://www.storyblok.com/" :title="$t('link.storyblok')" target="_blank" rel="noopener">Storyblok</a>
          </template>
          <template #host>
            <a href="https://www.netlify.com/" :title="$t('link.netlify')" target="_blank" rel="noopener">Netlify</a>
          </template>
        </i18n-t>
        <br />
        <i18n-t keypath="site.sourceCode" tag="span" scope="global">
          <template #repo>
            <a href="https://github.com/lorenaramonda/personal-website" :title="$t('link.github')" target="_blank" rel="noopener">Github</a>
          </template>
        </i18n-t>
      </small>
    </p>
  </div>
</template>

<style lang="scss">
.copyrights {
  font-family: $font-family-ruda;
  small {
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

  &__domain {
    text-decoration: none;
  }

  &__spoiler {
    font-family: $font-family-special;
    display: inline-block;
    padding: 0 0.5rem;
    opacity: 0.5;
    transform: scale(2);
  }
}
</style>
