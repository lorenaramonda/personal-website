<template>
  <header class="row  column layout__header hcard">
    <v-logo />
    <v-address />
    <v-picture />
  </header>
</template>

<script>
import Logo from '@/components/Logo'
import Picture from '@/components/Profile/Picture'
import Address from '@/components/Profile/Address'

export default {
  components: {
    'v-logo': Logo,
    'v-picture': Picture,
    'v-address': Address
  }
}
</script>

<style></style>
