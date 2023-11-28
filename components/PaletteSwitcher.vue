<template>
  <button v-tooltip.left-start="text" class="palette-switcher" type="button" @click="togglePalette">
    <LucideSun /> <span class="palette-switcher__label">{{ text }}</span>
  </button>
</template>

<script setup>
const { t } = useI18n()
const cookie = useCookie('palette-version', {
  // domain: '.ramonda.me',
  maxAge: 60 * 60 * 24 * 365,
})

const ally = ref(null)

const text = computed(() => {
  return ally.value ? t('palette.original') : t('palette.ally')
})

function togglePalette() {
  ally.value = !ally.value
  // save cookie
  cookie.value = ally.value ? 'ally' : 'default'
}

onMounted(() => {
  ally.value = cookie.value === 'ally' || !cookie
})

useHead(() => ({
  htmlAttrs: {
    class: ally.value === null ? '' : ally.value ? 'palette--ally' : 'palette--original',
  },
}))
</script>

<style lang="scss">
.palette-switcher {
  display: table;
  background: none;
  border: none;
  cursor: pointer;
  font-family: inherit;
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
  &__label {
    position: absolute;
    font-size: 0;
  }
}
</style>
