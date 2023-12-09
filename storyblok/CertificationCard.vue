<template>
  <div class="certification-card">
    <StoryblokImage
      v-if="blok.badge?.filename"
      :image="blok.badge"
      :width="40"
      :height="40"
      :alt="$t('education.certification.logoTitle', { certification: blok.title })"
    />
    <p>
      <strong class="certification-card__title">
        <a
          :title="$t('education.certification.linkTitle', { certification: blok.title })"
          :href="blok.certification_url.url"
          target="_blank"
          rel="noopener"
        >
          {{ blok.title }}
        </a>
      </strong>
      {{ $t('misc.at') }}
      <em>
        <span>
          <a :href="blok.institution_url.url" target="_blank" :title="blok.institution" rel="noopener">{{ blok.institution }}</a> </span
        >, <span>{{ blok.city }}</span> - {{ releasedAt }}{{ expiredAt }}
      </em>
    </p>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const props = defineProps<{
  blok: GenericObject
}>()

const releasedAt = computed(() => {
  return new Date(props.blok.released_at.split(' ')[0]).getFullYear()
})
const expiredAt = computed(() => {
  return props.blok.expired_at ? `/${new Date(props.blok.expired_at.split(' ')[0]).getFullYear()}` : ''
})
</script>

<style lang="scss">
.certification-card {
  display: flex;
  gap: 1rem;

  img {
    grid-area: logo;
    align-self: center;
  }
  p {
    grid-area: text;
  }
}
</style>
