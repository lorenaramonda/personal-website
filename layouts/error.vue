<template>
  <div class="row">
    <template v-if="error.statusCode === 404">
      <h1>404</h1>
      <i18n path="error.path" tag="p">
        <template #path>
          {{ $route.path }}
        </template>
      </i18n>
    </template>
    <template v-else>
      <h1>An error occurred</h1>
    </template>
    <nuxt-link :to="localePath({ name: 'index' })" class="button">Home page</nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  },
  head: {
    htmlAttrs: {
      class: 'error404',
      lang: 'en'
    }
  }
}
</script>

<style lang="scss">
@import 'assets/scss/error';
</style>
