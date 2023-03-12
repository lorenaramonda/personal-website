<template>
  <div class="layout" itemscope itemtype="http://schema.org/Person">
    <CookiesPolicy v-if="false" />
    <div class="stage">
      <component :is="header" />
      <nuxt />
      <SocialsLinks />
      <div class="stage__bottom">
        <MagicButton />
      </div>
    </div>
    <div class="fixed">
      <TheFooter />
    </div>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader'
import BaseHeader from '@/components/BaseHeader'
import TheFooter from '@/components/TheFooter'
import SocialsLinks from '@/components/SocialsLinks'
import MagicButton from '@/components/MagicButton'
import CookiesPolicy from '@/components/CookiesPolicy'

export default {
  name: 'DefaultLayout',
  components: {
    TheHeader,
    BaseHeader,
    TheFooter,
    SocialsLinks,
    MagicButton,
    CookiesPolicy
  },
  data: () => ({
    isNavOpen: false
  }),
  computed: {
    isHomePage() {
      return this.$route.name.substring(0, 5) === 'index'
    },
    header() {
      return this.isHomePage ? 'TheHeader' : 'BaseHeader'
    }
  },
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
