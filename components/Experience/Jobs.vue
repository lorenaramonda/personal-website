<template>
  <article id="work" class="medium-6 column p-experience textfade" data-readmore="Mostra di più">
    <h2 class="section__title">{{ $t('jobs.title') }}</h2>
    <dl>
      <template v-for="(job, index) in jobs">
        <dt :key="index">
          <strong class="item__title">{{ job.data.job_title[0].text }}</strong>
          {{ $t('misc.at') }}
          <em>
            <span itemprop="affiliation" class="p-org">{{ job.data.company_name[0].text }}</span
            >, {{ job.data.company_city[0].text }} - {{ job.data.start_date | justYear }}{{ getEndDate(job.data.end_date, job.data.start_date) }}
          </em>
        </dt>
        <dd :key="job.id" class="p-role">
          <prismic-rich-text :field="job.data.job_description" />
        </dd>
      </template>
    </dl>
  </article>
</template>

<script>
export default {
  filters: {
    justYear(date) {
      const parsedDate = new Date(date)
      if (!parsedDate) return date
      return parsedDate.getFullYear()
    }
  },
  props: {
    jobs: {
      type: Array,
      required: true
    }
  },
  methods: {
    getEndDate(endDate, startDate) {
      if (!endDate) return '/...'
      const parsedDate = new Date(endDate)
      const parsedStartDate = new Date(startDate)
      if (!parsedDate || !parsedStartDate) return endDate
      if (parsedStartDate.getFullYear() === parsedDate.getFullYear()) {
        return ` (${parsedDate.getMonth() - parsedStartDate.getMonth()} ${this.$t('misc.months')})`
      } else {
        return `/${parsedDate.getFullYear()}`
      }
    }
  }
}
</script>

<style></style>
