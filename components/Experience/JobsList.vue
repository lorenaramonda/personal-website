<template>
  <article id="work" class="p-experience textfade">
    <BaseHeading>{{ $t('jobs.title') }}</BaseHeading>
    <dl v-if="jobs && jobs.length > 0">
      <JobCard v-for="(job, index) in jobs" :key="index" v-editable="job" :blok="job" />
    </dl>
    <p v-else>{{ $t('jobs.notFound') }}</p>
  </article>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'
import JobCard from './JobCard'

export default {
  components: {
    JobCard,
    BaseHeading
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
