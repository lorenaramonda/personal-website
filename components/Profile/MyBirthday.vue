<template>
  <p v-if="isBirthday">
    <a :title="$t('birthday.gifts')" href="http://www.amazon.it/gp/registry/wishlist/3FUUIXHWG95T2/ref=topnav_lists_2" target="_blank">
      <strong><SvgIcon name="gift" /> {{ $t('birthday.annoncement') }} :)</strong>
    </a>
    <br />
  </p>
</template>

<script>
export default {
  computed: {
    isBirthday() {
      const today = new Date()
      return today.getDate() + '-' + (today.getMonth() + 1) === '20-2'
    },
  },
}
</script>

<style scoped>
svg {
  height: 20px;
  width: 20px;
  vertical-align: sub;
}
</style>
