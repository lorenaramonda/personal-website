<template>
  <main>
    <div v-if="post" class="section row">
      <article v-editable="post.content">
        <BaseHeading v-if="post.content.title">{{ post.content.title }}</BaseHeading>
        <RichtextRenderer v-if="post.content.long_text" :document="post.content.long_text" />
      </article>
    </div>
  </main>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  name: 'PostPage',
  layout: 'blog',
  components: { BaseHeading },
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
  }),
  mounted() {
    this.$storybridge(
      () => {
        // eslint-disable-next-line no-undef
        const storyblokInstance = new StoryblokBridge()

        storyblokInstance.on(['input', 'published', 'change'], event => {
          if (event.action === 'input') {
            this.post = event.story
          } else {
            this.$nuxt.$router.go({
              path: this.$nuxt.$router.currentRoute,
              force: true
            })
          }
        })
      },
      error => {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    )
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  }
}
</script>
