<template>
  <ol class="breadcrumbs">
    <li v-for="(breadcrumb, i) in breadcrumbs" :key="i" class="breadcrumbs__item">
      <NuxtLink :to="`/${breadcrumb.slug}`" :title="breadcrumb.title">{{ breadcrumb.title }}</NuxtLink>
    </li>
  </ol>
</template>

<script setup lang="ts">
import type { Breadcrumb } from '@/types'

const storyblokApi = useStoryblokApi()
const { getParams } = useLocalizedStoryParams()
const { localeCodes } = useI18n()

const props = defineProps<{
  slug: string
}>()

const breadcrumbs: Ref<Breadcrumb[]> = ref([])

function removeTrailingSlash(str: string) {
  return str.replace(/\/+$/, '')
}

function getDefaultSlug(str: string) {
  const slug = removeTrailingSlash(str)
  const slugParts = slug.split('/')
  if (localeCodes.value.includes(slugParts[0])) slugParts.shift()
  return slugParts.length ? slugParts : []
}

const slugParts = getDefaultSlug(props.slug)
slugParts.pop()
if (slugParts?.length) {
  while (slugParts.length > 0) {
    const story = await storyblokApi
      .get(`cdn/stories/${slugParts.join('/')}`, getParams())
      .then((response) => response.data.story)
      .catch(() => null)
    breadcrumbs.value.unshift({
      title: story?.content.title,
      slug: story.full_slug,
    })
    slugParts.pop()
  }
}
</script>

<style lang="scss">
.breadcrumbs {
  display: inline-flex;
  gap: 1rem;
  &__item {
    a {
      display: inline-block;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
    &:not(:first-of-type) {
      &::before {
        content: '/';
      }
      a {
        padding-left: 1rem;
      }
    }
  }
}
</style>
