<template>
  <aside class="profile-address">
    <p v-if="otherLanguages.length > 0">
      <template v-for="lang in otherLanguages">
        |
        <n-link :key="lang.iso" v-tooltip.top="lang.name" :to="switchLocalePath(lang.code)" class="lang">
          {{ lang.code }}
        </n-link>
      </template>
      |
    </p>
    <address itemprop="address" itemscope="itemscope" itemtype="http://schema.org/PostalAddress" class="p-adr">
      <span itemprop="addressLocality" class="p-locality">Caraglio</span> • <span itemprop="addressRegion" class="p-region">Cuneo</span>
    </address>
    <v-birthday />
    <client-only>
      <v-email />
    </client-only>
    <v-palette />
  </aside>
</template>

<script>
import Birthday from './Birthday'
import Email from './Email'
import Palette from '@/components/PaletteSwitcher'

export default {
  components: {
    'v-birthday': Birthday,
    'v-email': Email,
    'v-palette': Palette
  },
  computed: {
    otherLanguages() {
      const langs = this.$i18n.locales.filter(lang => lang.code !== this.$i18n.locale)
      return langs || []
    }
  }
}
</script>

<style lang="scss">
.profile-address {
  text-align: left;
  line-height: 1.5em;
  text-align: center;
  @media #{$medium-up} {
    margin-top: 0;
    padding: 2em 0;
    text-align: right;
  }
  .lang {
    text-transform: uppercase;
  }
  p {
    margin: 1em 0;
  }
}
</style>
