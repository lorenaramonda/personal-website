<template>
  <div class="logo hgroup card-name" data-version="Ally version">
    <template v-if="heading">
      <h1 itemprop="name" class="p-name"><strong class="p-given-name">Lorena</strong> <span class="p-family-name">Ramonda</span></h1>
      <h2 itemprop="jobTitle" class="p-job-title">{{ $t('job.title') }}</h2>
    </template>
    <template v-else>
      <n-link :to="localePath({ name: 'index' })"> <strong>lorena</strong>.ramonda.me </n-link>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.logo {
  text-align: center;
  transition: transform 1200ms cubic-bezier(0.18, 0.89, 0.32, 1.28);
  align-self: center;
  border-top: dashed 2px #404040;
  border-bottom: dashed 2px #404040;
  padding: 1em 0;
  line-height: normal;
  font-size: 1.4rem;
  margin: 2em 0;
  background-color: var(--color-bg);

  .palette--ally & {
    position: relative;
    &::after {
      content: attr(data-version);
      display: block;
      background-color: var(--color-main);
      color: var(--color-bg);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 100%;
      padding: 1rem 2rem;
    }
  }
  h1 {
    font-family: $font-family-title;
    font-size: 3.5em;
    text-align: center;
    text-transform: uppercase;
    @media #{$large-up} {
      font-size: 6.5em;
      text-align: left;
    }
    strong {
      font-weight: normal;
    }
  }
  h2 {
    font-family: $font-family-title;
    text-transform: lowercase;
    color: var(--color-main);
    font-size: 2em; //1.5em;
    font-weight: bold;
    @media #{$medium-up} {
      font-size: 2.5em;
      font-weight: normal;
    }
    @media #{$small-only} {
      span {
        display: none;
      }
    }
  }
}
</style>
