<template>
  <main>
    <div class="section row">
      <PostsList />
    </div>
  </main>
</template>

<script setup>
import PostsList from '@/components/Publications/PostsList'
const { t } = useI18n()

definePageMeta({
  layout: 'blog',
})

useHead({
  title: t('publications.meta_title'),
  meta: [
    {
      name: 'description',
      content: t('publications.meta_description'),
    },
    {
      name: 'keywords',
      content: t('publications.meta_keywords'),
    },
  ],
})
</script>
