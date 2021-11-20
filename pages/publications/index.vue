<template>
  <main>
    <div v-if="posts" class="section row">
      <v-posts v-if="posts && posts.length > 0" :posts="posts" />
    </div>
  </main>
</template>

<script>
import Posts from '@/components/Publications/Posts'

export default {
  components: {
    'v-posts': Posts
  },
  async asyncData({ $prismic, error, app, isDev }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)

    /**
     * Get posts
     */
    const posts = await $prismic.api.query([$prismic.predicates.at('document.type', 'post')], {
      orderings: '[my.post.pubblication_date desc]',
      lang: currentLocale.iso.toLowerCase()
    })

    if (!posts) error({ statusCode: 404, message: 'Page not found' })

    return {
      posts: posts ? posts.results || posts : []
    }
  },
  data: () => ({
    posts: null
  })
}
</script>

<style></style>
