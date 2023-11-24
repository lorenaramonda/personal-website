<template>
  <div class="row">
    <template v-if="error.statusCode === 404">
      <h1>404</h1>
      <i18n-t keypath="error.path" tag="p" scope="global">
        <template #path>
          {{ $route.path }}
        </template>
      </i18n-t>
    </template>
    <template v-else>
      <h1>An error occurred</h1>
    </template>
    <nuxt-link :to="localePath({ name: 'index' })" class="button">Home page</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

type PageError = {
  statusCode: number
}

definePageMeta({
  layout: 'empty',
})

defineProps<{
  error?: PageError
}>()

useHead({
  htmlAttrs: {
    class: 'error404',
    lang: 'en',
  },
})
</script>

<style lang="scss">
@import 'assets/scss/error';
</style>
