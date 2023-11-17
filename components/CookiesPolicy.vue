<template>
  <div v-if="showWarning" class="cookies">
    <div class="cookies__content">
      <p>
        {{ $t('policy.text') }}
        <a :href="privacyLink" :title="$t('policy.link.text')" target="_blank" rel="nofollow">{{ $t('policy.link.text') }}</a>
      </p>
      <button @click="acceptTracking">{{ $t('policy.button.text') }}<span class="cookie-emoji">🍪</span></button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const showWarning = ref(false)
const cookieAccepted = useCookie('gtm-consent', {
  maxAge: 60 * 60 * 24 * 365,
})

const privacyLink = computed(() => {
  return locale.value === 'it' ? 'https://www.iubenda.com/privacy-policy/262452' : 'https://www.iubenda.com/privacy-policy/730236'
})

function acceptTracking() {
  useGtagConsent(true)
  cookieAccepted.value = '1'
  showWarning.value = false
}

onMounted(() => {
  if (cookieAccepted.value) {
    acceptTracking()
  } else {
    showWarning.value = true
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
  &__content {
    position: relative;
    font-family: $font-family-text;
    background-color: var(--color-main-lightest); //#cff2ef;
    text-align: center;
    padding: 1em;
    a {
      color: var(--color-main-darkest);
    }
    p {
      margin: 1em;
      font-size: 0.75em;
    }
  }
  button {
    background-color: var(--color-main-dark);
    color: var(--color-text);
    border: none;
    font-family: $font-family-text;
    border-radius: 20px;
    border-bottom: solid 3px var(--color-main-darkest);
    padding: 0.5em 1.5em;
    cursor: pointer;
    position: relative;
  }
  .cookie-emoji {
    position: absolute;
    top: -10px;
    right: -4px;
    font-size: 2.5rem;
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
