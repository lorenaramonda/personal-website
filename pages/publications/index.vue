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
  components: {
    PostsList
  },
  asyncData({ isDev }) {
    return {
      preview: isDev
    }
  }
}
</script>
