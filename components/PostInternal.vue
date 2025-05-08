<template>
  <div class="post-item post-item--internal" itemscope itemtype="https://schema.org/Article">
    <time v-if="post.first_published_at" class="post-item__date" :datetime="post.first_published_at">
      <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(post.first_published_at, currentLocale?.iso) }}</span>
    </time>
    <h2 class="post-item__title">
      <NuxtLink :to="`/${post.full_slug}`" :hreflang="$getPostLang(post.lang)" :title="post.content.title">
        <span itemprop="name">{{ post.content.title }}</span>
      </NuxtLink>
    </h2>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'
const { localeProperties: currentLocale } = useI18n()
const { $getPostLang } = useNuxtApp()

defineProps<{
  post: GenericObject
}>()
</script>

<style lang="scss">
@use 'assets/scss/post-item';
</style>
