<script setup>
const { $pwa } = useNuxtApp()

const showAction = ref(false)

onMounted(() => {
  if ($pwa?.offlineReady) {
    console.log('App ready to work offline')
  }
})
</script>

<template>
  <Transition name="slide-down" @after-enter="showAction = true" @after-leave="showAction = false">
    <div v-show="$pwa?.needRefresh" class="pwa-notification">
      <div class="container">
        <p class="pwa-notification__text">
          <NuxtImg src="/surprise.png" class="pwa-notification__image" alt="" />
          <i18n-t keypath="pwa.updatesWarning" tag="span" scope="global">
            <template #emphasis>
              <strong>{{ $t('pwa.updatesWarningEmphasis') }}</strong>
            </template>
          </i18n-t>
          <Transition name="shake">
            <button v-show="showAction" class="pwa-notification__button" @click="$pwa?.updateServiceWorker()">{{ $t('pwa.reload') }}</button>
          </Transition>
        </p>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss">
.pwa-notification {
  position: fixed;
  top: 5rem;
  left: 0;
  z-index: 10;
  width: 100%;
  padding: 1em 0;
  background-color: color('secondary');
  text-align: center;

  &__image {
    width: 100px;
    height: auto;
    max-height: none;
    margin-bottom: 1rem;
  }
  &__text {
    font-family: $font-family-ruda;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    margin: 0;
    font-size: 0.8em;

    strong {
      border-bottom: dashed 1px color('text');
    }
  }

  &__button {
    @extend %button;
    background-color: color('text');
    color: color('background');
  }

  @include mq($from: tablet) {
    &__image {
      position: absolute;
      top: -3rem;
      margin-left: -120px;
    }
    &__text {
      position: relative;
      display: block;
    }
    &__button {
      margin-left: 1rem;
      margin-bottom: 0;
    }
  }
}
</style>
