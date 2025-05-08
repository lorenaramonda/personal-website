<template>
  <div class="post-item post-item--external" itemscope itemtype="https://schema.org/Article">
    <time v-if="post.first_published_at" class="post-item__date" :datetime="post.first_published_at">
      <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(post.first_published_at, currentLocale?.iso) }}</span>
    </time>
    <h2 class="post-item__title">
      <template v-if="post.content.link">
        <a :href="post.content.link.url" rel="noopener" target="_blank" :hreflang="$getPostLang(post.lang)">
          <span itemprop="name">{{ post.content.title }}</span>
        </a>
        <span class="post-item__source">
          {{ $getURLDomain(post.content.link.url) }} <LucideExternalLink v-tooltip.top="$t('misc.externalLink')" :size="16" />
        </span>
      </template>
    </h2>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'
const { localeProperties: currentLocale } = useI18n()

defineProps<{
  post: GenericObject
}>()
</script>

<style lang="scss">
@use 'assets/scss/post-item';
</style>
