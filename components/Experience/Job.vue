<template>
  <div>
    <dt>
      <strong class="p-role item__title">{{ blok.job_title }}</strong>
      {{ $t('misc.at') }}
      <em>
        <span itemprop="affiliation" class="p-org">{{ blok.company_name }}</span
        >, {{ blok.company_city }} - {{ getStartDate(blok.start_date) }}{{ getEndDate(blok.end_date, blok.start_date) }}
      </em>
    </dt>
    <dd>
      <rich-text-renderer v-if="blok.job_description" :document="blok.job_description" />
      <ul v-if="blok.skills && blok.skills.length > 0" class="tags tags--left">
        <li v-for="skill in blok.skills" :key="skill.name" class="tags__single tags__single--small">
          <span>{{ skill.name }}</span>
        </li>
      </ul>
    </dd>
  </div>
</template>

<script>
export default {
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
    getEndDate(endDate, startDate) {
      const today = new Date()
      const parsedStartDate = new Date(startDate.substring(0, 10))
      if (!endDate) return `/... (${this.$tc('misc.years', parseInt(today.getFullYear() - parsedStartDate.getFullYear()))})`
      const parsedDate = new Date(endDate.substring(0, 10))
      if (!parsedDate || !parsedStartDate) return endDate
      if (parsedStartDate.getFullYear() === parsedDate.getFullYear()) {
        return ` (${this.$tc('misc.months', parsedDate.getMonth() - parsedStartDate.getMonth())})`
      } else {
        return `/${parsedDate.getFullYear()} (${this.$tc('misc.years', parsedDate.getFullYear() - parsedStartDate.getFullYear())})`
      }
    }
  }
}
</script>

<style></style>
