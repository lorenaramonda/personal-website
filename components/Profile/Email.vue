<template>
  <span class="u-email">{{ getEmail }}</span>
</template>

<script>
export default {
  computed: {
    getEmail() {
      const email = 'lorena'
      const emailHost = 'ramonda.me'
      return email + '@' + emailHost
    }
  }
}
</script>

<style scoped></style>
