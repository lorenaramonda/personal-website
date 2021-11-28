<template>
  <article v-if="posts && posts.length > 0" id="publications" class="column publications">
    <h2 class="section__title">{{ $t('publications.title') }}</h2>
    <ul v-for="post in posts.filter(e => !!e.content.title)" :key="post.uuid">
      <li v-if="post.content.link || (post.content.long_text && post.content.long_text.content[0].content)">
        <svg-icon name="pen" class="icon--pen" />
        <a v-if="post.content.link" :href="post.content.link.url" rel="noreferrer" target="_blank">
          {{ post.content.title }}
        </a>
        <n-link v-else :to="localePath({ name: 'publications-post', params: { post: post.slug } })">{{ post.content.title }}</n-link>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  async fetch() {
    const currentLocale = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
    const apiLocale = currentLocale.code === this.$i18n.defaultLocale ? '' : `${currentLocale.code}/`
    /**
     * Get jobs
     */
    const stories = await this.$storyapi
      .get(`cdn/stories?starts_with=${apiLocale}publications/&is_startpage=0&sort_by=first_published_at:desc`, {
        version: this.preview ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.stories
      })
      .catch(res => {
        return null
      })
    this.posts = stories
  },
  data: () => ({
    posts: []
  })
}
</script>

<style lang="scss">
.publications {
  margin-bottom: 2em;
}
</style>
