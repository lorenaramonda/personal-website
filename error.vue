<template>
  <div class="row">
    <template v-if="error?.statusCode === 404">
      <h1>404</h1>
      <i18n-t keypath="error.path" tag="p" scope="global">
        <template #path>
          {{ $route.path }}
        </template>
      </i18n-t>
    </template>
    <template v-else>
      <h1>An error occurred</h1>
      <p v-if="error?.message" @click="showError = !showError">{{ error.message }}</p>
      <pre v-show="showError">{{ error }}</pre>
    </template>
    <nuxt-link :to="localePath({ name: 'index' })" class="button">Home page</nuxt-link>
  </div>
</template>

<script setup lang="ts">
const localePath = useLocalePath()

type PageError = {
  statusCode: number
}

defineProps<{
  error?: PageError
}>()

const showError = ref(false)

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
