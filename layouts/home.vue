<template>
  <TheHeader />
  <main>
    <slot />
  </main>

  <TheFooter />
  <CookiesPolicy />
</template>

<script setup lang="ts">
const store = useStore()
await useAsyncData('jobs', () => store.fetchJobs())
await useAsyncData('space', () => store.fetchSpace())

const { $setMetadata } = useNuxtApp()
$setMetadata()
</script>
