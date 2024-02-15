<template>
  <article class="post-article" itemscope itemtype="https://schema.org/Article">
    <BaseHeading v-if="post.title" primary :label="$t('publications.title')" itemprop="name">
      <template v-if="slug" #breadcrumbs>
        <BaseBreadcrumbs :slug="slug" />
      </template>
      {{ post.title }}
    </BaseHeading>
    <RichtextRenderer v-if="post.long_text" :document="post.long_text" class="post-article__content" itemprop="description" />
    <footer class="post-article__footer">
      <p>
        <span itemprop="author" class="post-article__author">Lorena Ramonda</span>
        <time v-if="publishedDate" class="post-item__date post-article__date" :datetime="publishedDate">
          <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(publishedDate, currentLocale?.iso) }}</span>
        </time>
      </p>
    </footer>
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

    p,
    h2,
    h3,
    h4,
    h5,
    h6,
    blockquote {
      max-width: 1000px;
    }

    li p {
      margin: 0;
      display: inline;
    }

    ul:not([class]) {
      li {
        padding-left: 2.5rem;
        position: relative;
        &::before {
          content: '';
          display: inline-block;
          width: 1rem;
          height: 1rem;
          background-color: var(--color-secondary-darker);
          border-radius: 50%;
          left: 0;
          position: absolute;
          top: 1.3rem;
        }
      }
    }

    h2 {
      font-size: 1.8em;
      font-weight: 500;
      line-height: 1.2;
    }
    a {
      text-decoration: none;
      font-weight: normal;
      border-bottom: dashed 3px var(--color-text-link);
      &:hover {
        border-style: solid;
      }
    }
    strong,
    b {
      font-weight: 500;
    }
    blockquote {
      font-style: italic;
      font-size: 1.2em;
      position: relative;
      color: var(--color-secondary-darkest);
      display: grid;
      grid-template-rows: auto 7rem;
      margin: 1.2em 0;

      &:after {
        content: '”';
        font-size: 5em;
        color: var(--color-secondary-lighter);
        line-height: 1;
        font-style: normal;
        font-weight: bold;
        text-align: center;
      }

      p {
        margin: 0;
      }
    }
  }

  &__footer {
    font-family: $font-family-title;
  }

  &__author {
    font-family: $font-family-special;
    font-size: 3em;
    color: var(--color-neutral);
    display: block;
  }

  .post-item__date {
    color: var(--color-text);
  }
}
</style>
