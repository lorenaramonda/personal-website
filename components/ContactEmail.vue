<template>
  <address class="contact-email" itemscope itemtype="http://schema.org/ContactPoint">
    <LucideMail />
    <span itemprop="email">
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
