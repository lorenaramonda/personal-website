<template>
  <article id="more" class="medium-6 column">
    <prismic-rich-text v-if="title" :field="title" class="section__title" />
    <section v-for="(block, i) in list" :key="i">
      <prismic-rich-text :field="block.block_title" class="section__subtitle" />
      <prismic-rich-text :field="block.block_content" />
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
