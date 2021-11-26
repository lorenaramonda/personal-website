<template>
  <main>
    <div v-if="post" class="section row">
      <article v-editable="post.content" class="column">
        <h2 v-if="post.content.title" class="section__title">{{ post.content.title }}</h2>
        <rich-text-renderer v-if="post.content.long_text" :document="post.content.long_text" />
      </article>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $storyapi, params, error, app, isDev }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)
    const apiLocale = currentLocale.code === app.i18n.defaultLocale ? '' : `?language=${currentLocale.code}`

    /**
     * Get post
     */
    const post = await $storyapi
      .get(`cdn/stories/publications/${params.post}${apiLocale}`, {
        version: isDev ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.story
      })
      .catch(res => {
        return null
      })

    if (!post) error({ statusCode: 404, message: 'Page not found' })

    return {
      post: post || null
    }
  },
  data: () => ({
    post: null
  })
}
</script>

<style></style>
