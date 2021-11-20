<template>
  <main>
    <div v-if="post" class="section row">
      <article class="column">
        <h2 v-if="post.data.title" class="section__title">{{ post.data.title[0].text }}</h2>
        <prismic-rich-text v-if="post.data.content" :field="post.data.content" />
      </article>
    </div>
  </main>
</template>

<script>
export default {
  async asyncData({ $prismic, params, error, app, isDev }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)

    /**
     * Get post
     */
    const post = await $prismic.api.getByUID('post', params.post, {
      lang: currentLocale.iso.toLowerCase()
    })

    if (!post) error({ statusCode: 404, message: 'Page not found' })

    return {
      post: post ? post.results || post : []
    }
  },
  data: () => ({
    post: null
  })
}
</script>

<style></style>
