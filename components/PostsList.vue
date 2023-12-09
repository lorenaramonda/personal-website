<template>
  <article v-if="posts && posts.length > 0" id="publications" class="post-lists">
    <ul>
      <li v-for="post in posts" :key="post.uuid" class="post-lists__item">
        <component :is="postComponent(post.content.component)" :post="post" />
      </li>
    </ul>
  </article>
</template>

<script setup lang="ts">
import PostInternal from './PostInternal.vue'
import PostExternal from './PostExternal.vue'

defineProps<{
  posts: Record<string, any>[]
}>()

function postComponent(name: string) {
  return name === 'post' ? PostInternal : PostExternal
}
</script>
