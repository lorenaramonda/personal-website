<template>
  <NuxtLayout name="empty">
    <div class="layout" itemscope itemtype="http://schema.org/Person">
      <div class="stage">
        <!-- <TheNavigation /> -->
        <TheHeader simple />
        <slot />
        <SocialsLinks />
        <div class="stage__bottom">
          <MagicButton />
        </div>
      </div>
      <div class="fixed">
        <TheFooter />
      </div>
    </div>
    <CookiesPolicy />
  </NuxtLayout>
</template>

<script setup>
// import TheNavigation from '@/components/TheNavigation'
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import SocialsLinks from '@/components/SocialsLinks'
import MagicButton from '@/components/MagicButton'
import CookiesPolicy from '@/components/CookiesPolicy'
</script>
