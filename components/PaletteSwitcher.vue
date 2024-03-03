<template>
  <div v-if="$colorMode.value" v-tooltip.left-start="text" class="palette-switcher">
    <input id="switcher" v-model="$colorMode.value" type="checkbox" name="switch" true-value="light" false-value="dark" @change="switchMode" />
    <label for="switcher" class="palette-switcher__slider">
      <span class="palette-switcher__label">
        <LucideSun class="palette-switcher__icon--sun" />
        <LucideMoon class="palette-switcher__icon--moon" />
        <span>{{ $colorMode.value }}</span>
      </span>
    </label>
  </div>
</template>

<script setup>
const { t } = useI18n()
const colorMode = useColorMode()

const text = computed(() => {
  return colorMode.value !== 'dark' ? t('palette.dark') : t('palette.light')
})

function switchMode() {
  colorMode.preference = colorMode.value
}

onMounted(() => {
  if (window?.matchMedia('(prefers-color-scheme: light)').matches) {
    colorMode.value = 'light'
  }
  window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (event) => {
    if (event.matches) colorMode.value = 'light'
  })
})
</script>

<style lang="scss">
.palette-switcher {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.5em;

  input[type='checkbox'] {
    display: none;
    user-select: none;
    &:focus {
      outline: none;
    }
    + .palette-switcher__slider {
      background-color: rgb(color('background'), 0.5);
      user-select: none;
      border: solid 1px color('neutral-lighter');
      height: 1em;
      width: 2em;
      border-radius: 1em;
      display: block;
      cursor: pointer;
      transition: all 0.2s;
      text-align: left;
      .palette-switcher__label {
        color: color('background');
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(1em - 2px);
        height: calc(1em - 2px);
        border: solid 0.08em transparent;
        background-color: lightgrey;
        background-clip: content-box;
        border-radius: 1em;
        box-sizing: border-box;
        transform: translateX(0) scale(1.5);
        transition: all 0.2s;
        svg {
          width: 0.5em;
        }
        span {
          display: none;
        }
      }
    }
    &:checked {
      + .palette-switcher__slider {
        border-color: color('main-light');
        .palette-switcher__label {
          background-color: color('main');
          transform: translateX(100%) scale(1.5);
        }
      }
    }
  }
}

@mixin darkModeIcon {
  .palette-switcher__icon--sun {
    display: none;
  }
  .palette-switcher__icon--moon {
    display: block;
  }
}
@mixin lightModeIcon {
  .palette-switcher__icon--sun {
    display: block;
  }
  .palette-switcher__icon--moon {
    display: none;
  }
}

.palette-switcher__icon--moon {
  display: none;
}

.dark-mode {
  @include darkModeIcon;
}
@media (prefers-color-scheme: dark) {
  @include darkModeIcon;
}

.light-mode {
  @include lightModeIcon;
}
@media (prefers-color-scheme: light) {
  @include lightModeIcon;
}
</style>
