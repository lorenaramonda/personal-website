<template>
  <header class="row column layout__header layout__header--base hcard">
    <v-picture />
    <v-logo :heading="false" />
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import Picture from '@/components/Profile/Picture'

export default {
  components: {
    'v-logo': Logo,
    'v-picture': Picture
  }
}
</script>

<style></style>
