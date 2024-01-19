<template>
  <div class="post-card" itemscope itemtype="https://schema.org/Article">
    <h2 itemprop="name" class="post-card__title">{{ blok.title }}</h2>
    <time v-if="blok.first_published_at" class="post-lists__item-date" :datetime="blok.first_published_at">
      <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(blok.first_published_at, currentLocale?.iso) }}</span>
    </time>
    <p v-if="blok.intro" class="post-card__intro">{{ blok.intro }}</p>
    <BaseActionLink :to="`/${blok.full_slug}`" icon="arrow-right">{{ $t('publications.read') }}</BaseActionLink>
    <picture v-if="blok.image?.filename" class="post-card__image">
      <StoryblokImage :image="blok.image" :height="300" itemprop="thumbnail" />
    </picture>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'
const { localeProperties: currentLocale } = useI18n()

defineProps<{
  blok: GenericObject
  index?: string
}>()
</script>

<style lang="scss">
.post-card {
  background-color: var(--color-background);
  border-radius: 2rem;
  padding: 2rem;

  &__title {
    @extend %item-title;
    font-size: 2rem;
  }

  &__intro {
    font-weight: 200;
  }

  &__image {
    display: block;
    border-radius: 1rem;
    overflow: hidden;
    margin-top: 2rem;
  }
}
</style>
