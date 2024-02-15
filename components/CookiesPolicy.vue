<template>
  <div v-if="showWarning" class="cookies">
    <div class="cookies__content">
      <p>
        {{ $t('policy.text') }}
        <a :href="privacyLink" :title="$t('policy.link.text')" target="_blank" rel="nofollow">{{ $t('policy.link.text') }}</a>
      </p>
      <button class="cookies__button cookies__button--primary" @click="acceptTracking">{{ $t('policy.buttonText.ok') }}</button>
      <button class="cookies__button" @click="refuseTracking">{{ $t('policy.buttonText.ko') }}</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { $config } = useNuxtApp()

const shouldShowWarning = ref(false)

const cookieAccepted = useCookie('gtm-consent', {
  maxAge: 60 * 60 * 24 * 365,
})
const cookieDenied = useCookie('gtm-consent', {
  maxAge: 60 * 60 * 24,
})

const privacyLink = computed(() => {
  return locale.value === 'it' ? 'https://www.iubenda.com/privacy-policy/262452' : 'https://www.iubenda.com/privacy-policy/730236'
})

function acceptTracking() {
  useGtagConsent(true)
  cookieAccepted.value = '1'
  shouldShowWarning.value = false
}

function refuseTracking() {
  cookieDenied.value = '0'
  shouldShowWarning.value = false
}

const showWarning = computed(() => {
  if ($config?.public.gtag?.initialConsent) return false
  return shouldShowWarning.value
})

onMounted(() => {
  if (cookieAccepted.value === undefined) {
    shouldShowWarning.value = true
  } else {
    if (cookieAccepted.value) useGtagConsent(true)
    shouldShowWarning.value = false
  }
})
</script>

<style lang="scss">
.cookies {
  position: fixed;
  z-index: 3;
  bottom: 0px;
  width: 100%;
  box-shadow: 0 -2px 10px 1px rgba(var(--color-main-rgb), 0.8);
  @include mq($from: tablet) {
    right: 0;
    max-width: 300px;
  }
  &__content {
    position: relative;
    font-family: $font-family-text;
    background-color: var(--color-main-lightest);
    text-align: center;
    padding: 1em;
    a {
      color: var(--color-main-darker);
    }
    p {
      margin: 1em;
      font-size: 0.75em;
    }
  }
  &__button {
    border: none;
    font-family: $font-family-text;
    border-radius: 20px;
    color: var(--color-text);
    background-color: var(--color-main-lighter);
    border-bottom: solid 3px var(--color-main-lighter);
    padding: 0.5em 1.5em;
    cursor: pointer;
    position: relative;
    margin: 0 0.5rem;
  }
  &__button--primary {
    background-color: var(--color-main);
    border-bottom: solid 3px var(--color-main-dark);
  }
}

.overlay {
  background-color: rgba(black, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2;
}
</style>
