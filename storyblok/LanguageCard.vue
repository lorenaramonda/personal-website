<template>
  <BaseMeter :value="rate" :label="label" />
  <p>
    {{ lang.name }}
    <small v-if="lang.info">{{ lang.info }}</small>
  </p>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { t } = useI18n()
const { $filters } = useNuxtApp()

const { lang } = defineProps<{
  lang: GenericObject
}>()

const rate = computed(() => {
  const abilitiesSum = parseInt(lang?.listening) + parseInt(lang?.speaking) + parseInt(lang?.reading) + parseInt(lang?.writing)
  return Math.round((10 * abilitiesSum) / 40)
})

const label = computed(() => {
  const str = $filters.rateLabel(rate.value) || 'rate.beginner'
  const values = []
  if (lang?.listening) values.push(`${t('language.listening')}: ${lang.listening}`)
  if (lang?.speaking) values.push(`${t('language.speaking')}: ${lang.speaking}`)
  if (lang?.reading) values.push(`${t('language.reading')}: ${lang.reading}`)
  if (lang?.writing) values.push(`${t('language.writing')}: ${lang.writing}`)

  return values.length ? `${t(str)}: ${values.join(' / ')}` : t(str)
})
</script>
