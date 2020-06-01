<template>
  <aside class="profile-address">
    <address itemprop="address" itemscope="itemscope" itemtype="http://schema.org/PostalAddress" class="p-adr">
      <span itemprop="addressLocality" class="p-locality">Caraglio</span> • <span itemprop="addressRegion" class="p-region">Cuneo</span>
    </address>
    <v-birthday />
    <client-only>
      <v-email />
    </client-only>
  </aside>
</template>

<script>
import Birthday from './Birthday'
import Email from './Email'
export default {
  components: {
    'v-birthday': Birthday,
    'v-email': Email
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
}
</style>
