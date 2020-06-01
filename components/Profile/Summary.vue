<template>
  <article class="column summary p-summary">
    <prismic-rich-text v-if="title" :field="title" class="section__title" />
    <prismic-rich-text v-if="content" :field="content" />
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: Array,
      required: true
    },
    content: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.summary {
  margin-bottom: 2em;
  p {
    strong {
      color: $color-main;
      font-weight: normal;
      font-size: 1.2em;
    }
  }
}
</style>
