<template>
  <hr class="end-of-page" :title="$t('misc.endPage')" />
</template>

<style lang="scss">
.end-of-page {
  display: block;
  margin: 2rem;
  border: 0;
  &:after {
    content: '~';
    display: block;
    text-align: center;
    color: var(--color-neutral-darker);
    font-size: 2rem;
  }
}
</style>
