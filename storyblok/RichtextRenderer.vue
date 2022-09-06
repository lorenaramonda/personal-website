<template>
  <div v-html="renderedText" />
</template>

<script>
export default {
  props: {
    document: {
      type: Object,
      required: true
    }
  },
  computed: {
    renderedText() {
      return this.$storyapi.richTextResolver.render(this.document)
    }
  }
}
</script>

<style></style>
