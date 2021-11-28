<template>
  <article v-if="projects" id="projects" class="medium-6 column">
    <h2 class="section__title">{{ $t('projects.title') }}</h2>
    <ul v-for="(prj, i) in projectsData" :key="i">
      <li v-editable="prj">
        <p>
          <strong>
            {{ prj.title }}
          </strong>
          <template v-if="prj.url">
            (<a :href="prj.url.url" :target="prj.url.target" rel="noreferrer">{{ prj.url.url | stripProtocol }}</a
            >)
          </template>
        </p>
        <rich-text-renderer v-if="prj.content" :document="prj.content" />
      </li>
    </ul>
  </article>
</template>

<script>
export default {
  filters: {
    stripProtocol(url) {
      return url.replace(/(http[s]?):\/\//g, '')
    }
  },
  props: {
    projects: {
      type: Array,
      required: true
    }
  },
  computed: {
    projectsData() {
      return this.projects.map(e => e.content)
    }
  }
}
</script>

<style scoped>
strong {
  display: inline;
}
</style>
