<template>
  <div class="layout" itemscope itemtype="http://schema.org/Person">
    <a id="top" accesskey="1"></a>
    <v-cookies v-if="false" />
    <div class="stage">
      <v-header />
      <nuxt />
      <v-socials />
      <div class="stage__bottom">
        <v-magic-button />
      </div>
    </div>
    <!-- <v-nav />-->
    <div class="fixed">
      <v-footer />
    </div>
    <!-- <v-overlay />-->
    <a id="bottom" accesskey="2"></a>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Socials from '@/components/Socials'
import MagicButton from '@/components/MagicButton'
import Cookie from '@/components/Cookie'

export default {
  components: {
    'v-header': Header,
    'v-footer': Footer,
    'v-socials': Socials,
    'v-magic-button': MagicButton,
    'v-cookies': Cookie
  },
  data: () => ({
    isNavOpen: false
  }),
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>

<style lang="scss">
.site-wrapper {
  transition: all 0.2s linear;
  &--open {
    transform: translateX(250px);
  }
}
</style>
