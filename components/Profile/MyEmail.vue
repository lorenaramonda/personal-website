<template>
  <span class="u-email">{{ getEmail }}</span>
</template>

<script setup>
const getEmail = computed(() => {
  const email = 'lorena'
  const emailHost = 'ramonda.me'
  return email + '@' + emailHost
})
</script>
