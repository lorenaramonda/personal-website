<template>
  <main>
    <div v-if="post" class="section row">
      <article v-editable="post">
        <BaseHeading v-if="post.title">{{ post.title }}</BaseHeading>
        <RichtextRenderer v-if="post.long_text" :document="post.long_text" />
      </article>
    </div>
  </main>
</template>

<script setup>
import BaseHeading from '@/components/BaseHeading'

const metadata = {
  meta: [],
}

const post = ref(null)

const { locale, locales } = useI18n()
const { params } = useRoute()
const storyblokApi = useStoryblokApi()

const config = useRuntimeConfig()
const sbOptions = config.public.storyblok.apiOptions

const currentLocale = locales.value.find(lang => lang.code === locale.value)

const storiesParams = {
  ...sbOptions,
  language: currentLocale.code,
}

definePageMeta({
  layout: 'blog',
})

// const story = await useAsyncStoryblok(`cdn/stories/publications/${params.post}`, storiesParams)
const { data: story } = await useAsyncData('post', async () => await storyblokApi.get(`cdn/stories/publications/${params.post}`, storiesParams), {
  transform: value => value.data.story.content,
})
post.value = story.value

if (!post) error({ statusCode: 404, message: 'Page not found' })

onMounted(() => {
  useStoryblokBridge(post.value.id, updatedStory => (post.value = updatedStory))
})

metadata.title = post.value && post.value.meta_title ? post.value.meta_title : post.value.title

if (post.value && post.value.meta_description) {
  metadata.meta.push({
    name: 'description',
    content: post.value.meta_description,
  })
}

if (post.value && post.value.meta_keywords) {
  metadata.meta.push({
    name: 'keywords',
    content: post.value.meta_keywords,
  })
}

useHead(metadata)
</script>
