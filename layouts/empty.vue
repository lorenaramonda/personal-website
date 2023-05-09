<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
export default {
  name: 'EmptyLayout',
  head() {
    return {
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  }
}
</script>
