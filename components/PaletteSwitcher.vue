<template>
  <button v-tooltip.left-start="text" class="palette-switcher" @click="togglePalette">
    <svg-icon name="sun" /> <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  data: () => ({
    ally: null,
    cookieName: 'palette-version',
    cookieDomain: '.ramonda.me'
  }),
  computed: {
    text() {
      return this.ally ? this.$i18n.t('palette.original') : this.$i18n.t('palette.ally')
    }
  },
  mounted() {
    this.ally = this.$cookies.get(this.cookieName) === 'ally' || !this.$cookies.get(this.cookieName)
  },
  methods: {
    togglePalette() {
      this.ally = !this.ally
      // save cookie
      this.$cookies.set(this.cookieName, this.ally ? 'ally' : 'default', {
        domain: this.cookieDomain,
        maxAge: 60 * 60 * 24 * 365
      })
    }
  },
  head() {
    return {
      htmlAttrs: {
        class: this.ally === null ? '' : this.ally ? 'palette--ally' : 'palette--original'
      }
    }
  }
}
</script>

<style lang="scss">
.palette-switcher {
  display: table;
  background: none;
  border: none;
  cursor: pointer;
  font-size: inherit;
  font-family: inherit;
  margin: 2rem auto 0;
  background-color: var(--color-main);
  color: var(--color-bg);
  font-size: 0.8em;
  padding: 0.4em 1em;
  border-radius: 20px;
  svg {
    width: 15px;
    height: 15px;
    vertical-align: middle;
    fill: white;
  }
  span {
    position: absolute;
    font-size: 0;
  }
}
@media #{$medium-up} {
  .palette-switcher {
    margin: 2rem 0 0 auto;
  }
}
</style>
