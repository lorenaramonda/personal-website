<template>
  <article id="publications" class="column publications">
    <h2 class="section__title">{{ $t('publications.title') }}</h2>
    <ul v-for="post in posts" :key="post.uid">
      <li>
        <svg-icon name="pen" />
        <a v-if="post.data.link.url" :href="post.data.link.url" rel="noreferrer" target="_blank">
          {{ post.data.title[0].text }}
        </a>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss">
.publications {
  margin-bottom: 2em;
  svg {
    width: 16px;
    height: 16px;
    fill: var(--color-main);
    vertical-align: middle;
    margin-right: 0.5rem;
    display: inline-block;
  }
}
</style>
