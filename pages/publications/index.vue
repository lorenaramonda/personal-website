<template>
  <main>
    <div class="section row">
      <PostsList :preview="preview" />
    </div>
  </main>
</template>

<script>
import PostsList from '@/components/Publications/PostsList'

export default {
  name: 'PublicationsPage',
  layout: 'blog',
  components: {
    PostsList
  },
  asyncData({ isDev }) {
    return {
      preview: isDev
    }
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  }
}
</script>
