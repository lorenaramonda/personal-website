<template>
  <article class="post-article" itemscope itemtype="https://schema.org/Article">
    <BaseHeading v-if="post.title" primary :label="$t('publications.title')" itemprop="name">
      <template v-if="slug" #breadcrumbs>
        <BaseBreadcrumbs :slug="slug" />
      </template>
      {{ post.title }}
    </BaseHeading>
    <time v-if="publishedDate" class="post-lists__item-date" :datetime="publishedDate">
      <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(publishedDate, currentLocale?.iso) }}</span>
    </time>
    <RichtextRenderer v-if="post.long_text" :document="post.long_text" class="post-article__content" itemprop="description" />
    <span itemprop="author">Lorena Ramonda</span>
  </article>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { localeProperties: currentLocale } = useI18n()

defineProps<{
  post: GenericObject
  publishedDate?: string
  slug?: string
}>()
</script>

<style lang="scss">
.post-article {
  &__content {
    font-family: $font-family-title;
    line-height: 1.8;
    font-size: 1.2em;
    font-weight: 200;
    max-width: 1000px;
  }
}
</style>
