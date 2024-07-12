<template>
  <div class="blog-section-card">
    <picture
      v-if="blok.image?.filename"
      class="blog-section-card__image"
      :class="{ 'blog-section-card__image--grayscale': blok.ended_at, 'blog-section-card__image--hover': hoverStatus }"
    >
      <StoryblokImage :image="blok.image" :width="800" :height="500" />
    </picture>
    <div class="blog-section-card__details" @mouseenter="toggleHover(true)" @mouseleave="toggleHover(false)">
      <p class="blog-section-card__tags">
        <BlogTag v-if="blok.ended_at" :label="$t('blog.complete')" />
        <BlogTag v-else :label="$t('blog.ongoing')" active />
      </p>
      <h2 v-if="blok.title" class="blog-section-card__title">
        <NuxtLink :to="`/${blok.full_slug}`" :hreflang="$getPostLang(blok.lang)" :title="blok.title">
          {{ blok.title }}
        </NuxtLink>
      </h2>
      <p v-if="blok.started_at" class="blog-section-card__duration">
        <time class="blog-section-card__date" :datetime="blok.started_at">
          {{ $getDate(blok.started_at, currentLocale.iso, { weekday: undefined }) }}
        </time>
      </p>
      <RichtextRenderer v-if="blok.description" :document="blok.description" class="blog-section-card__content" />
      <BaseActionLink :to="`/${blok.full_slug}`" icon="arrow-right">{{ $t('publications.read') }}</BaseActionLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { localeProperties: currentLocale } = useI18n()

const hoverStatus = ref(false)

defineProps<{
  blok: GenericObject
}>()

function toggleHover(value: boolean) {
  hoverStatus.value = value
}
</script>

<style lang="scss">
.blog-section-card {
  position: relative;
  &__image {
    display: block;
    width: 100%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    background-color: color('main-darker');

    @include mq($from: desktop) {
      max-width: 800px;
      min-height: 350px;
    }
    img {
      width: 100%;
      height: auto;
      vertical-align: middle;
      transition: all 0.3s ease-in-out;
    }
    &--grayscale img {
      filter: grayscale(1);
      opacity: 0.5;
    }

    @include mq($from: desktop) {
      &--hover {
        img {
          transform: scale(1.1);
        }
        &.blog-section-card__image--grayscale img {
          filter: grayscale(0);
          opacity: 1;
        }
      }
    }
  }
  &__details {
    padding: 2rem;
    background-color: color('background');
    @include mq($until: tablet) {
      border-radius: 0 0 1rem 1rem;
    }
    @include mq($from: desktop) {
      padding: 3rem;
      background: color('background');
      position: absolute;
      bottom: 0;
      right: 0;
      width: 50vw;
      min-height: 70%;
    }
  }
  &__tags {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  &__tag {
    text-transform: uppercase;
    display: table;
    font-size: 1.2rem;
    padding: 0.2rem 0.7rem;
    color: color('background');
    background-color: color('main-darker');

    &--active {
      background-color: color('tag-active');
    }
  }
  &__title {
    @extend %item-title;
    a {
      text-decoration: none;
    }
  }
  &__duration {
    color: color('neutral');
  }
  &__content {
    line-height: 1.5;
    font-size: 1.2em;
    font-weight: 300;
  }
}
</style>
