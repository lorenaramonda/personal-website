<template>
  <article v-if="posts && posts.length > 0" id="publications" class="publications">
    <BaseHeading>{{ $t('publications.title') }}</BaseHeading>
    <ul v-for="post in posts.filter(e => !!e.content.title)" :key="post.uuid">
      <li v-if="post.content.link || (post.content.long_text && post.content.long_text.content[0].content)">
        <SvgIcon name="pen" class="icon--pen" />
        <a v-if="post.content.link" :href="post.content.link.url" rel="noopener" target="_blank">
          {{ post.content.title }}
        </a>
        <NuxtLink v-else :to="localePath({ name: 'publications-post', params: { post: post.slug } })">{{ post.content.title }}</NuxtLink>
      </li>
    </ul>
  </article>
</template>

<script setup>
import BaseHeading from '@/components/BaseHeading'

const { locale, locales } = useI18n()
const storyblokApi = useStoryblokApi()
const localePath = useLocalePath()

const config = useRuntimeConfig()
const sbOptions = config.public.storyblok.apiOptions

const currentLocale = locales.value.find(lang => lang.code === locale.value)

const storiesParams = {
  ...sbOptions,
  language: currentLocale.code,
}

const posts = await storyblokApi
  .get(`cdn/stories`, {
    ...storiesParams,
    is_startpage: 0,
    starts_with: 'publications/',
    excluding_slugs: 'publications/temporary-blog/*',
    sort_by: 'first_published_at:desc',
  })
  .then(response => response.data.stories ?? [])
</script>

<style lang="scss">
.publications {
  margin-bottom: 2em;
}
</style>
