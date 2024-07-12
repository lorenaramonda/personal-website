<template>
  <div class="pagination">
    <div class="pagination__pages">
      <template v-if="showPages"></template>
    </div>
    <div class="pagination__layout">
      <template v-if="showMode">
        <button
          class="pagination__layout-button"
          :class="{ 'pagination__layout-button--active': activeMode === 'list' }"
          @click="$emit('set-mode', 'list')"
        >
          <LucideLayoutList />
        </button>
        <button
          class="pagination__layout-button"
          :class="{ 'pagination__layout-button--active': activeMode === 'grid' }"
          @click="$emit('set-mode', 'grid')"
        >
          <LucideLayoutGrid />
        </button>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  activeMode: 'grid' | 'list'
  showPages?: boolean
  showMode?: boolean
}>()
</script>

<style lang="scss">
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  position: sticky;
  top: 4rem;
  background-color: color('background');
  padding: 1rem 0;

  &__layout {
    display: flex;
    gap: 1rem;
  }

  &__layout-button {
    appearance: none;
    border: 0;
    background: none;
    cursor: pointer;
    opacity: 0.2;
    margin: 0;
    padding: 0;
    color: color('text');

    &--active {
      opacity: 1;
    }

    &:not(.pagination__layout-button--active):hover {
      opacity: 0.5;
    }
  }

  @include mq($from: tablet) {
    top: 0;
  }
}
</style>
