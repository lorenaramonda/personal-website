<template>
  <footer class="layout__footer row">
    <div class="left" role="contentinfo">
      <p>
        2020 . <a href="http://lorena.ramonda.me/" itemprop="url">lorena.ramonda.me</a>

        <BaseLanguageSwitcher unwrapped />
        <br />
        <small>
          <i18n-t keypath="site.tecnology" tag="span" scope="global">
            <template #framework>
              <a href="https://nuxt.com/" target="_blank" rel="noopener">Nuxt3</a>
            </template>
            <template #host>
              <a href="https://www.netlify.com/" target="_blank" rel="noopener">Netlify</a>
            </template>
            <template #repo>
              <a href="https://github.com/lorenaramonda/personal-website" target="_blank" rel="noopener">Github</a>
            </template>
          </i18n-t>
        </small>
      </p>
    </div>
    <div class="right">
      <p><a v-tooltip="$t('personality.title')" :href="$t('personality.link')" :title="$t('personality.title')" target="_blank">INFJ-T</a></p>
      <a
        href="https://www.iubenda.com/privacy-policy/262452"
        class="iubenda-white iubenda-embed"
        title="Privacy Policy"
        target="_blank"
        rel="noopener"
      >
        {{ $t('site.privacy') }}
      </a>
    </div>
  </footer>
</template>

<script setup>
import BaseLanguageSwitcher from '@/components/BaseLanguageSwitcher'
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
