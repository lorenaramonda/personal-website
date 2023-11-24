<template>
  <address class="contact-email u-email">
    <LucideMail />
    <span>
      {{ getEmail }}
    </span>
  </address>
</template>

<script setup lang="ts">
const getEmail = computed(() => {
  const email = 'lorena'
  const emailHost = 'ramonda.me'
  return email + '@' + emailHost
})
</script>

<style lang="scss">
.contact-email {
}
</style>
