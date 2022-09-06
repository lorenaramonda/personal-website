<template>
  <article id="work" class="medium-6 column p-experience textfade" data-readmore="Mostra di più">
    <h2 class="section__title">{{ $t('jobs.title') }}</h2>
    <dl v-if="jobs && jobs.length > 0">
      <job v-for="(job, index) in jobs" :key="index" v-editable="job" :blok="job" />
    </dl>
    <p v-else>{{ $t('jobs.notFound') }}</p>
  </article>
</template>

<script>
import Job from './Job'

export default {
  components: {
    job: Job
  },
  props: {
    jobs: {
      type: Array,
      default: () => []
    },
    preview: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style></style>
