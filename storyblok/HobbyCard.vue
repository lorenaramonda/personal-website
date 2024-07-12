<template>
  <div v-editable="blok" class="hobby-card">
    <div>
      <span class="hobby-card__index">
        {{ index }}
      </span>
      <h2 class="hobby-card__title">
        {{ blok.title }}
      </h2>

      <picture v-if="blok.icon?.filename" class="hobby-card__image">
        <StoryblokImage :image="blok.icon" :width="imgHeight" />
      </picture>

      <RichtextRenderer v-if="blok.description" :document="blok.description" class="hobby-card__content" />
    </div>

    <BaseActionLink
      v-if="blok.enable_content && blok.body.length"
      :to="`/${blok.full_slug}`"
      :title="blok.title"
      class="hobby-card__action"
      type="ghost"
      icon="lightbulb"
    >
      <span>{{ $t('misc.more') }}</span>
    </BaseActionLink>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

defineProps<{
  blok: GenericObject
  index?: string
}>()

const imgHeight = 150
</script>

<style lang="scss">
.hobby-card {
  padding: 2rem;
  transition: all 0.3s ease-in-out;
  border: solid 1px color('main-lighter');
  background-color: color('background');
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  &:hover {
    transform: translateY(-0.5rem);
  }

  &__index {
    display: block;
    margin-bottom: 1rem;
    font-family: $font-family-special;
    font-size: 4rem;
    color: color('main-darker');
  }

  &__title {
    @extend %item-title;
    font-size: 2.3rem;
  }
  &__content {
    font-family: $font-family-title;
    color: color('neutral-darker');
    font-size: 0.9em;
    a {
      color: color('main-darker');
      text-decoration: none;
      font-weight: 700;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__link {
    color: color('neutral');
    font-size: 1.5rem;
    font-weight: normal;
    a {
      @extend %text-link;
    }
  }
  &__image {
    display: flex;
    justify-content: center;
    height: v-bind(imgHeight);
    margin: 1rem 0;
    img {
      vertical-align: middle;
    }
  }
}
</style>
