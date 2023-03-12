<template>
  <article class="column summary p-summary">
    <h2 v-if="title" class="section__title">{{ title }}</h2>
    <RichtextRenderer v-if="content" :document="content" />
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true
    },
    content: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
.summary {
  margin-bottom: 2em;
  p {
    strong,
    b {
      color: var(--color-main);
      font-weight: normal;
      font-size: 1.2em;
    }
  }
}
</style>
