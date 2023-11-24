<template>
  <footer class="footer">
    <div class="row">
      <TheCopyrights class="left" />
      <div class="right">
        <p><a v-tooltip="$t('personality.title')" :href="$t('personality.link')" :title="$t('personality.title')" target="_blank">INFJ-T</a></p>
        <a
          href="https://www.iubenda.com/privacy-policy/262452"
          class="iubenda-white iubenda-embed"
          title="Privacy Policy"
          target="_blank"
          rel="noopener"
        >
          {{ $t('site.privacy') }}
        </a>
      </div>
    </div>
  </footer>
</template>

<style lang="scss">
.footer {
  border-top: 1px solid var(--color-main-darker);
  background-color: var(--color-main-lighter);
  padding-top: 1.2em;
  padding-bottom: 1.2em;
  line-height: normal;
  color: var(--color-main-darker);
  position: relative;

  .lang {
    text-transform: uppercase;
  }

  p,
  li {
    text-shadow: none;
    margin: 0;
    padding: 0;
    a {
      color: var(--color-main-darker);
      text-decoration: none;
      border-bottom: dashed 1px var(--color-main);
      &.nibbler {
        border: none;
      }
    }
  }
  small {
    color: var(--color-text-minor);
  }
  .iubenda-white {
    color: var(--color-text-minor);
    font-size: 0.75em;
    margin: 1em auto;
    text-decoration: none;
    display: block;
    text-align: center;
    &:hover {
      text-decoration: underline;
    }
    @include mq($from: tablet) {
      margin: 1em 0;
      display: inline-block;
      text-align: right;
    }
  }

  @include mq($until: tablet) {
    text-align: center;
  }
  .row {
    @include mq($from: tablet) {
      display: flex;
      justify-content: space-between;
      .right {
        text-align: right;
      }
    }
  }
}
</style>
