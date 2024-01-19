<template>
  <div v-editable="blok" class="experience-card" itemscope itemtype="http://schema.org/Person">
    <span class="experience-card__duration">{{ getStartDate(blok.start_date) }}{{ getEndDate(blok.end_date, blok.start_date) }}</span>
    <h2 class="experience-card__job-title" :itemprop="schemaJobTitle">{{ blok.job_title }}</h2>

    {{ $t('misc.at') }}
    <em>
      <span :itemprop="schemaWorksFor">{{ blok.company_name }}</span
      >, {{ place }}
    </em>

    <RichtextRenderer v-if="blok.job_description" :document="blok.job_description" />

    <SkillsList :blok="{ items: blok.skills }" small />
    <ul v-if="blok.certifications && blok.certifications.length > 0" class="job__certifications">
      <li v-for="certification in blok.certifications" :key="certification._uid">
        <CertificationCard :blok="certification" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import SkillsList from '~/storyblok/SkillsList.vue'

import type { GenericObject } from '@/types'

const { $getDurationInYears, $getDurationInMonth } = useNuxtApp()

const { t } = useI18n()

const props = defineProps<{
  blok: GenericObject
  index?: string
}>()

const place = computed(() => {
  const isRemote = props.blok.is_remote ? `, ${t('experiences.remote')}` : ''
  return `${props.blok.company_city}${isRemote}`
})

const schemaJobTitle = computed(() => {
  return !props.blok.end_date ? 'jobTitle' : undefined
})
const schemaWorksFor = computed(() => {
  return !props.blok.end_date ? 'worksFor' : undefined
})

function getStartDate(startDate: string) {
  if (!startDate) return 0
  const parsedDate = new Date(startDate.split(' ')[0])
  return parsedDate.getFullYear()
}

function getEndDate(end: string, start: string) {
  const yearsWorked = $getDurationInYears(start, end)

  const duration = props.blok.show_duration ? ` (${t('misc.years', yearsWorked)})` : ''
  // if current position, don't return end date
  if (!end) return `-${t('misc.present')} ${duration}`

  const endDate = new Date(end.split(' ')[0])

  if (yearsWorked === 0) {
    // returns months worked...
    if (props.blok.show_duration) {
      return ` (${t('misc.months', $getDurationInMonth(end, start))})`
    }
  } else {
    // ... otherwise returns years worked
    const duration = props.blok.show_duration ? ` (${t('misc.years', yearsWorked)})` : ''
    return `-${endDate.getFullYear()}${duration}`
  }
}
</script>

<style lang="scss">
.experience-card {
  background-color: var(--color-background);
  border-radius: 2rem;
  padding: 3rem;

  &__job-title {
    font-weight: 700;
    font-size: 2rem;
  }

  &__duration {
    font-weight: 600;
    color: var(--color-main-dark);
  }

  .skills-list__skills {
    justify-content: flex-start;
  }
}
</style>
