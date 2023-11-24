<template>
  <div>
    <template v-for="(node, i) in document.content" :key="i">
      <template v-if="node.type === 'blok'">
        <template v-for="blok in node.attrs.body" :key="blok._uid">
          <StoryblokComponent :blok="blok" />
        </template>
      </template>
      <div v-else v-html="renderRichText({ type: node.type, content: [node] })" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { type ISbRichtext } from 'storyblok-js-client'

defineProps<{
  document: ISbRichtext
}>()
</script>
