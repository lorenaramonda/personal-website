<template>
  <article id="more" class="insights">
    <BaseHeading v-if="title">{{ title }}</BaseHeading>
    <section v-for="(block, i) in list" :key="i" v-editable="block">
      <h3 class="section__subtitle">{{ block.title }}</h3>
      <RichtextRenderer v-if="block.content" :document="block.content" />
    </section>
  </article>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  components: { BaseHeading },
  props: {
    title: {
      type: [String, Object, Array],
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  },
  methods: {
    renderedText(content) {
      return this.$storyapi.richTextResolver.render(content)
    }
  }
}
</script>

<style lang="scss">
.insights a {
  @extend %text-link;
}
</style>
