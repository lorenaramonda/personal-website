<template>
  <article v-if="jobs" id="work" class="p-experience textfade">
    <BaseHeading>{{ $t('jobs.title') }}</BaseHeading>
    <dl v-if="jobs && jobs.length > 0">
      <JobCard v-for="(job, index) in jobs" :key="index" :blok="job" />
    </dl>
    <p v-else>{{ $t('jobs.notFound') }}</p>
  </article>
</template>

<script>
import JobCard from './JobCard'
import BaseHeading from '@/components/BaseHeading'

export default {
  components: {
    JobCard,
    BaseHeading,
  },
  props: {
    jobs: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
