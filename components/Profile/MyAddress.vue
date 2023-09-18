<template>
  <aside class="profile-address">
    <BaseLanguageSwitcher />
    <address itemprop="address" itemscope="itemscope" itemtype="http://schema.org/PostalAddress" class="p-adr">
      <span itemprop="addressLocality" class="p-locality">Caraglio</span> • <span itemprop="addressRegion" class="p-region">Cuneo</span>
    </address>
    <MyBirthday />
    <client-only>
      <MyEmail />
    </client-only>
    <PaletteSwitcher />
  </aside>
</template>

<script>
import PaletteSwitcher from '@/components/PaletteSwitcher'
import BaseLanguageSwitcher from '@/components/BaseLanguageSwitcher'
import MyBirthday from './MyBirthday'
import MyEmail from './MyEmail'

export default {
  components: {
    MyBirthday,
    MyEmail,
    PaletteSwitcher,
    BaseLanguageSwitcher
  }
}
</script>

<style lang="scss">
.profile-address {
  line-height: 1.5em;
  text-align: center;
  @include mq($from: tablet) {
    margin-top: 0;
    padding: 2em 0;
    text-align: right;
  }
  p {
    margin: 1em 0;
  }
}
</style>
