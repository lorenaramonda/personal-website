<template>
  <article v-if="jobs && jobs.length > 0" id="work" class="medium-6 column p-experience textfade" data-readmore="Mostra di più">
    <h2 class="section__title">{{ $t('jobs.title') }}</h2>
    <dl>
      <template v-for="(job, index) in jobs">
        <dt :key="index">
          <strong class="p-role item__title">{{ job.job_title }}</strong>
          {{ $t('misc.at') }}
          <em>
            <span itemprop="affiliation" class="p-org">{{ job.company_name }}</span
            >, {{ job.company_city }} - {{ getStartDate(job.start_date) }}{{ getEndDate(job.end_date, job.start_date) }}
          </em>
        </dt>
        <dd :key="job._uid">
          <rich-text-renderer v-if="job.job_description" :document="job.job_description" />
          <ul v-if="job.skills && job.skills.length > 0" class="tags tags--left">
            <li v-for="skill in job.skills" :key="skill.name" class="tags__single tags__single--small">
              <span>{{ skill.name }}</span>
            </li>
          </ul>
        </dd>
      </template>
    </dl>
  </article>
</template>

<script>
export default {
  async fetch() {
    const currentLocale = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
    const apiLocale = currentLocale.code === this.$i18n.defaultLocale ? '' : `?language=${currentLocale.code}`
    /**
     * Get jobs
     */
    const jobs = await this.$storyapi
      .get(`cdn/stories/experience${apiLocale}`, {
        version: 'published' // 'draft'
      })
      .then(res => {
        return res.data.story.content.body
      })
      .catch(res => {
        if (!res.response) {
          console.error(res)
        } else {
          console.error(res.response.data)
        }
        return []
      })
    this.jobs = jobs
  },
  data: () => ({
    jobs: []
  }),
  methods: {
    getStartDate(startDate) {
      if (!startDate) return ''
      const parsedDate = new Date(startDate.substring(0, 10))
      return parsedDate.getFullYear()
    },
    getEndDate(endDate, startDate) {
      if (!endDate) return '/...'
      const parsedDate = new Date(endDate.substring(0, 10))
      const parsedStartDate = new Date(startDate.substring(0, 10))
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
