<template>
  <div class="row">
    <div class="column">
      <template v-if="error.statusCode === 404">
        <h1>404</h1>
        <i18n path="error.path" tag="p">
          <template #path>
            {{ $route.path }}
          </template>
        </i18n>
      </template>
      <template v-else>
        <h1>An error occurred</h1>
      </template>
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
