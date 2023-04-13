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
.fixed {
  width: 100%;
  bottom: 0;
  left: 0;
  position: fixed;
  z-index: -1;
}
.stage {
  background-color: var(--color-bg);
  box-shadow: 0 2px 15px 3px rgba(var(--color-main-rgb), 0.8);
  margin-bottom: 190px;
  min-height: calc(100vh - 190px);
  border-bottom: solid 1px var(--color-main-darker);
  position: relative;
  &__bottom {
    text-align: center;
    max-height: 10px;
    position: absolute;
    bottom: 0;
    width: 100%;
    .magic-button {
      top: -15px;
      position: relative;
    }
  }
  @include mq($from: desktop) {
    margin-bottom: 110px;
    min-height: calc(100vh - 110px);
    padding-bottom: 100px;
  }
}
</style>
