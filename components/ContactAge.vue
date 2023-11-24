<template>
  <a
    v-if="isBirthday"
    class="contact-age"
    :title="$t('birthday.gifts')"
    href="http://www.amazon.it/gp/registry/wishlist/3FUUIXHWG95T2/ref=topnav_lists_2"
    target="_blank"
    rel="noopener"
  >
    <LucideGift /> {{ $t('birthday.annoncement') }}
  </a>
  <span v-else class="contact-age"><LucideUser /> {{ $t('misc.age', { age }) }}</span>
</template>

<script setup lang="ts">
const { $getDurationInYears } = useNuxtApp()

const age = computed(() => $getDurationInYears('', '1983-02-20'))

const isBirthday = computed(() => {
  const today = new Date()
  return today.getDate() + '-' + (today.getMonth() + 1) === '20-2'
})
</script>

<style lang="scss">
.contact-age:link {
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
}
</style>
