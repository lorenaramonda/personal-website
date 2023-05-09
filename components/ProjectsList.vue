<template>
  <article v-if="projects" id="projects">
    <BaseHeading>{{ $t('projects.title') }}</BaseHeading>
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
        <RichtextRenderer v-if="prj.content" :document="prj.content" />
      </li>
    </ul>
  </article>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  components: { BaseHeading },
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
