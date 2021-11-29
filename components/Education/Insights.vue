<template>
  <article id="more" class="medium-6 column">
    <h3 v-if="title" class="section__title">{{ title }}</h3>
    <section v-for="(block, i) in list" :key="i" v-editable="block">
      <h3 class="section__subtitle">{{ block.title }}</h3>
      <rich-text-renderer v-if="block.content" :document="block.content" />
    </section>
  </article>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Object, Array],
      required: true
    },
    list: {
      type: Array,
      required: true
    }
  }
}
</script>

<style></style>
