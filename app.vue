<template>
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BasePwaUpdate />
</template>

<script setup lang="ts">
const nuxtApp = useNuxtApp()
const store = useStore()

await useAsyncData('space', () => store.fetchSpace())

nuxtApp.hook('page:finish', () => {
  window.scrollTo(0, 0)
})

const i18nHead = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true,
})

useHead({
  htmlAttrs: {
    lang: i18nHead.value.htmlAttrs!.lang,
  },
  link: i18nHead.value.link,
  meta: i18nHead.value.meta,
})

const { $setMetadata } = useNuxtApp()
$setMetadata()
</script>
