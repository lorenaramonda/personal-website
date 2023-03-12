<template>
  <div class="job">
    <dt>
      <strong class="p-role item__title">{{ blok.job_title }}</strong>
      {{ $t('misc.at') }}
      <em>
        <span itemprop="affiliation" class="p-org">{{ blok.company_name }}</span
        >, {{ blok.company_city }} - {{ getStartDate(blok.start_date) }}{{ getEndDate(blok.end_date, blok.start_date) }}
      </em>
    </dt>
    <dd>
      <RichtextRenderer v-if="blok.job_description" :document="blok.job_description" />
      <ul v-if="blok.skills && blok.skills.length > 0" class="tags tags--left">
        <li v-for="skill in blok.skills" :key="skill.name" class="tags__single tags__single--small">
          <span>{{ skill.name }}</span>
        </li>
      </ul>
      <ul v-if="blok.certifications && blok.certifications.length > 0" class="job__certifications">
        <li v-for="certification in blok.certifications" :key="certification._uid">
          <CertificationCard :blok="certification" />
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
import CertificationCard from './CertificationCard.vue'

export default {
  components: {
    CertificationCard
  },
  props: {
    blok: {
      type: Object,
      required: true
    }
  },
  methods: {
    getStartDate(startDate) {
      if (!startDate) return ''
      const parsedDate = new Date(startDate.substring(0, 10))
      return parsedDate.getFullYear()
    },
    getEndDate(end, start) {
      const today = new Date()
      const startDate = new Date(start)
      const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365
      const millisecondsPerMonth = millisecondsPerYear / 12

      const duration = this.blok.show_duration ? ` (${this.$tc('misc.years', Math.floor((today - startDate) / millisecondsPerYear))})` : ''
      // if current position, don't return end date
      if (!end) return `/...${duration}`

      const endDate = new Date(end)
      const yearsWorked = Math.floor((endDate - startDate) / millisecondsPerYear)
      if (yearsWorked === 0) {
        // returns years worked...
        if (this.blok.show_duration) {
          return ` (${this.$tc('misc.months', Math.floor((endDate - startDate) / millisecondsPerMonth))})`
        }
      } else {
        // ... otherwise returns months worked
        const duration = this.blok.show_duration ? ` (${this.$tc('misc.years', yearsWorked)})` : ''
        return `/${endDate.getFullYear()}${duration}`
      }
    }
  }
}
</script>

<style lang="scss">
.job {
  &__certifications {
    margin: 1rem 0 4rem;
  }
}
</style>
