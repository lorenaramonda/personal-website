<template>
  <div v-editable="blok" class="project-card" itemscope itemtype="https://schema.org/WebSite">
    <div>
      <span class="project-card__index">
        {{ index }}
      </span>
      <h2 class="project-card__title">
        {{ blok.title }}

        <span v-if="blok.url" class="project-card__link">
          (<a :href="blok.url.url" :target="blok.url.target" rel="noopener" itemprop="url">{{ $getURLDomain(blok.url.url) }}</a
          >)
        </span>
      </h2>

      <picture v-if="blok.image?.filename && blok.show_image" class="project-card__image">
        <StoryblokImage :image="blok.image" :width="400" itemprop="thumbnail" />
      </picture>

      <RichtextRenderer v-if="blok.content" :document="blok.content" class="project-card__content" itemprop="abstract" />
    </div>

    <ActionButton v-if="blok.url" :blok="link" class="project-card__action" />
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { $getURLDomain } = useNuxtApp()
const { t } = useI18n()

const props = defineProps<{
  blok: GenericObject
  index?: string
}>()

const imgHeight = 500

const link = computed(() => {
  return {
    label: t('misc.visitLink'),
    link: props.blok.url,
    icon: 'external-link',
  }
})
</script>

<style lang="scss">
.project-card {
  border-radius: 2rem;
  padding: 3rem;
  transition: all 0.3s ease-in-out;
  border: solid 1px var(--color-main-lighter);
  background-color: var(--color-bg);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  &:hover {
    transform: translateY(-0.5rem);
  }

  &__index {
    display: block;
    margin-bottom: 1rem;
    font-family: $font-family-special;
    font-size: 4rem;
    color: var(--color-main-darker);
  }

  &__title {
    @extend %item-title;
  }
  &__content {
    font-family: $font-family-title;
    color: var(--color-neutral-darker);
    font-size: 0.9em;
    a {
      color: var(--color-main-darker);
      text-decoration: none;
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__link {
    color: var(--color-neutral);
    font-size: 1.5rem;
    font-weight: normal;
    a {
      @extend %text-link;
    }
  }
  &__action {
    align-self: flex-end;
  }
  &__image {
    display: flex;
    height: v-bind(imgHeight);
    margin: 1rem 0;
    img {
      border-radius: 1rem;
      vertical-align: middle;
      filter: grayscale(1);
      transition: all 0.3s ease-in-out;
      &:hover {
        filter: none;
      }
    }
  }
}
</style>
