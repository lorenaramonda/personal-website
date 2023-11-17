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
            (<a :href="prj.url.url" :target="prj.url.target" rel="noopener">{{ stripProtocol(prj.url.url) }}</a
            >)
          </template>
        </p>
        <RichtextRenderer v-if="prj.content" :document="prj.content" />
      </li>
    </ul>
  </article>
</template>

<script setup>
import BaseHeading from '@/components/BaseHeading'

const props = defineProps({
  projects: {
    type: Array,
    required: true,
  },
})

const projectsData = computed(() => {
  return props.projects.map(e => e.content)
})

function stripProtocol(url) {
  return url.replace(/(http|https):\/\//g, '')
}
</script>

<style scoped>
strong {
  display: inline;
}
</style>
