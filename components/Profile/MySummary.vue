<template>
  <article class="summary p-summary">
    <BaseHeading v-if="title">{{ title }}</BaseHeading>
    <RichtextRenderer v-if="content" :document="content" />
  </article>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  components: { BaseHeading },
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
