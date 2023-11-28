<template>
  <NuxtLayout name="empty">
    <TheHeader />
    <main>
      <slot />
    </main>

    <TheFooter />
    <CookiesPolicy />
  </NuxtLayout>
</template>

<script setup lang="ts">
const store = useStore()
await useAsyncData('jobs', () => store.fetchJobs())
await useAsyncData('space', () => store.fetchSpace())
</script>
