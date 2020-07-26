<template>
  <div class="row">
    <div class="column">
      <h1 v-if="error.statusCode === 404">404</h1>
      <h1 v-else>An error occurred</h1>
      <nuxt-link :to="localePath({ name: 'index' })" class="button">Home page</nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style lang="scss" scoped>
.column {
  text-align: center;
  flex: 0 0 100%;
  padding: 40vh 0;
}
h1 {
  font-size: 5em;
  font-weight: bold;
  line-height: 1.3;
}
.button {
  background-color: var(--color-main);
  color: var(--color-bg);
  padding: 0.5em 1em;
  text-decoration: none;
  border-radius: 5px;
  display: inline-block;
  margin: 1em auto;
}
</style>
