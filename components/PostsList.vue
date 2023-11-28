<template>
  <article v-if="posts && posts.length > 0" id="publications" class="post-lists">
    <ul v-for="post in posts.filter((e) => !!e.content.title)" :key="post.uuid">
      <li
        v-if="post.content.link || (post.content.long_text && post.content.long_text.content[0].content)"
        class="post-lists__item"
        :class="{ 'post-lists__item--internal': !post.content.link }"
        itemscope
        itemtype="https://schema.org/Article"
      >
        <time v-if="post.first_published_at" class="post-lists__item-date" :datetime="post.first_published_at">
          <LucideCalendar :size="16" /> <span itemprop="datePublished">{{ $getDate(post.first_published_at, currentLocale?.iso) }}</span>
        </time>
        <h2 class="post-lists__item-title">
          <template v-if="post.content.link">
            <a :href="post.content.link.url" rel="noopener" target="_blank" :hreflang="getLinkLang(post.lang)">
              <span itemprop="name">{{ post.content.title }}</span>
            </a>
            <span class="post-lists__item-source">
              {{ $getURLDomain(post.content.link.url) }} <LucideExternalLink v-tooltip.top="$t('misc.externalLink')" :size="16" />
            </span>
          </template>
          <NuxtLink v-else :to="`/${post.full_slug}`" :hreflang="getLinkLang(post.lang)" :title="post.content.title">
            <span itemprop="name">{{ post.content.title }}</span>
          </NuxtLink>
        </h2>
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
const { localeProperties: currentLocale } = useI18n()
const { $getDate, $getURLDomain } = useNuxtApp()

defineProps<{
  posts: Record<string, any>[]
}>()

function getLinkLang(lang: string) {
  if (lang === 'default' || currentLocale.value.code === lang) return null
  return lang
}
</script>

<style lang="scss">
.post-lists {
  margin-bottom: 2em;

  &__item {
    display: flex;
    flex-direction: column;
    padding: 2rem 0;
    &--internal {
      .post-lists__item-date svg {
        stroke: var(--color-main);
      }
    }
  }
  &__item-title {
    a {
      @extend %item-title;
    }
  }
  &__item-date {
    display: flex;
    align-items: center;
    gap: 1rem;
    color: var(--color-neutral-light);
  }
  &__item-source {
    display: block;
    color: var(--color-neutral-light);
    display: flex;
    gap: 0.5rem;
    align-items: center;
  }
}
</style>
