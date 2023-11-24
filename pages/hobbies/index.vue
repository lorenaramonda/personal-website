<template>
  <ComingSoon v-if="!page">{{ $t('hobbies.title') }}</ComingSoon>
  <div v-else class="section-experiences">
    <div class="container-page">
      <header class="section-experiences__title">
        <BaseHeading primary :label="$t('hobbies.subtitle')">{{ $t('hobbies.title') }}</BaseHeading>
      </header>
      <EndOfPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

defineOptions({
  name: 'HobbiesPage',
})

const { t } = useI18n()
const { $setMetadata } = useNuxtApp()

const { getParams } = useLocalizedStoryParams()

const page = await useAsyncStoryblok('hobbies', getParams()).catch(() => null)

$setMetadata({
  title: t('hobbies.title'),
})
</script>
