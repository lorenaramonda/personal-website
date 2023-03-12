<template>
  <blockquote class="quote">
    <p>
      <slot />
      <cite v-if="author">{{ author }}</cite>
    </p>
  </blockquote>
</template>

<script>
export default {
  props: {
    author: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.quote {
  margin: 2em auto;
  text-align: center;
  border-bottom: dashed 1px #999;
  border-top: dashed 1px #999;
  padding: 0.5em;
  p {
    font-family: $font-family-text;
    font-size: 1.2em;
    font-weight: normal;
    font-style: italic;
    cite::before {
      content: '— ';
      font-family: $font-family-title;
    }
  }
}
</style>
