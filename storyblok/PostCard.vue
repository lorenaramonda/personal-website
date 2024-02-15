<template>
  <div class="post-card" :class="[`post-card--${mode}`, cssClass]" itemscope itemtype="https://schema.org/Article">
    <h2 itemprop="name" class="post-card__title">
      <NuxtLink :to="`/${blok.full_slug}`">
        <span v-if="mode === 'list'">{{ index }}.</span>
        {{ blok.title }}
      </NuxtLink>
      <Transition name="shake" appear>
        <BlogTag v-show="highlighted" :label="$t('blog.last')" active />
      </Transition>
    </h2>

    <p v-if="blok.intro" class="post-card__intro" v-html="intro"></p>

    <BaseActionLink :to="`/${blok.full_slug}`" icon="arrow-right" class="post-card__link">{{ $t('publications.read') }}</BaseActionLink>

    <picture v-if="blok.image?.filename" class="post-card__image">
      <StoryblokImage :image="blok.image" :width="coverDimensions.width" :height="coverDimensions.height" itemprop="thumbnail" />
    </picture>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'
const { localeProperties: currentLocale } = useI18n()

const { blok, highlighted } = defineProps<{
  blok: GenericObject
  index?: string
  mode?: string
  highlighted: boolean
}>()

const coverDimensions = computed(() => {
  return {
    width: 0,
    height: highlighted ? 600 : 300,
  }
})

const cssClass = computed(() => {
  return {
    'post-card--highlighted': highlighted,
  }
})

const intro = computed(() => {
  return blok.intro.replace(/\n/, '<br>')
})
</script>

<style lang="scss">
@mixin postcardGrid {
  @include mq($from: tablet) {
    grid-template-rows: auto auto 4rem;
    grid-template-columns: repeat(2, 1fr);
    grid-template-areas:
      'title title'
      'content image'
      'link image';

    .post-card__title {
      grid-area: title;
    }

    .post-card__intro {
      grid-area: content;
      align-self: flex-end;
    }

    .post-card__link {
      grid-area: link;
    }

    .post-card__image {
      grid-area: image;
    }
  }
}

.post-card {
  padding: 2rem;
  border-radius: 0;
  height: 100%;
  border: solid 1px transparent;
  display: grid;
  grid-template-areas:
    'title'
    'content'
    'link'
    'image';

  &__title {
    grid-area: title;
    @extend %item-title;
    font-size: 2rem;
    margin: 0 0 2rem;

    a {
      text-decoration: none;
    }

    .blog-tag {
      margin-left: 1rem;
      transform: rotate(3deg);
      display: inline-block;
    }
  }

  &__intro {
    grid-area: content;
    font-weight: 200;
    margin: 0 0 2rem;
  }

  &__link {
    grid-area: link;
    justify-self: flex-start;
  }

  &__image {
    grid-area: image;
    display: block;
    border-radius: 1rem;
    overflow: hidden;
    margin-top: 2rem;
    align-self: flex-end;

    img {
      width: 100%;
    }
  }

  &--grid {
    background-color: var(--color-background);
    border-color: var(--color-background);
    border-radius: 2rem;
    grid-template-rows: repeat(3, min-content) minmax(min-content, 1fr);

    &.post-card--highlighted {
      display: grid;
      background-color: rgba(var(--color-background-rgb), 0.2);
      border-color: var(--color-secondary-darker);
      .post-card__image {
        height: 220px;
        img {
          height: 100%;
          object-fit: cover;
          object-position: 50% 50%;
        }
      }
    }
  }

  &--list {
    display: grid;
    border-bottom: solid 1px var(--color-border-navigation);
    background-color: rgba(var(--color-background-rgb), 0.5);
    border-color: rgba(var(--color-background-rgb), 0.5);

    @include mq($from: desktop) {
      &:hover {
        background-color: var(--color-background);
      }
    }

    &:not(.post-card--highlighted) {
      .post-card__title {
        margin: 0;
      }
    }

    &.post-card--highlighted {
      @include postcardGrid();
    }

    &:not(.post-card--highlighted) {
      .post-card__intro,
      .post-card__image,
      .post-card__link {
        opacity: 0;
        width: 0px;
        height: 0px;
        overflow: hidden;
        display: block;
        padding: 0;
        margin: 0;
        font-size: 0;
        * {
          opacity: 0;
          width: 0px;
          height: 0px;
          overflow: hidden;
          display: block;
          padding: 0;
          margin: 0;
          font-size: 0;
        }
      }
    }
  }

  &.items-list__card--single {
    @include postcardGrid();
  }
}
</style>
