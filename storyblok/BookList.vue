<template>
  <div v-if="blok.items.length > 0" v-editable="blok" class="books-list">
    <h3>{{ years }}</h3>
    <ul v-if="blok.items.length > 0" class="books-list__books">
      <li
        v-for="(item, i) in blok.items"
        :key="i"
        v-tooltip="
          $t('misc.bookBy', {
            book: item.title,
            writer: item.author,
          })
        "
        class="books-list__book"
        :class="{ 'books-list__book--noimage': !item.cover.filename }"
      >
        <StoryblokImage v-if="item.cover.filename" :image="item.cover" :height="200" />
        <span v-else>{{ item.title }} - {{ item.author }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { StoryblokImage } from '@/types'

type Book = {
  title: string
  author: string
  finished_at?: string
  cover: StoryblokImage
  comment?: Record<string, unknown>
}

const props = defineProps<{
  blok: {
    items: Book[]
  }
}>()

const years = computed(() =>
  Array.from(new Set(props.blok.items.filter((item) => item.finished_at).map((item) => item.finished_at.split('-')[0]))).join('-'),
)
</script>

<style lang="scss">
.books-list {
  max-width: 1000px;

  &__books {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    max-width: 800px;
    padding-left: 2rem;
  }
  &__book {
    border: solid 2px color('main');
    border-radius: 1rem;
    position: relative;
    overflow: hidden;
    background-color: color('background');
    transition: all 0.05s ease-in-out;
    overflow: hidden;

    &:not(:first-of-type) {
      margin-left: -4rem;
    }

    &:hover {
      z-index: 1;
      transform: translateY(-0.5rem) scale(1.05);
    }

    &--noimage {
      width: 150px;
      padding: 1rem;
      font-size: 0.8em;
    }
  }
}
</style>
