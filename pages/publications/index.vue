<template>
  <main>
    <div class="section row">
      <v-posts :preview="preview" />
    </div>
  </main>
</template>

<script>
import Posts from '@/components/Publications/Posts'

export default {
  components: {
    'v-posts': Posts
  },
  asyncData({ isDev }) {
    return {
      preview: isDev
    }
  }
}
</script>

<style></style>
