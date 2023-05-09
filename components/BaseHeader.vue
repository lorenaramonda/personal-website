<template>
  <header class="row layout__header layout__header--base hcard">
    <MyPicture />
    <BaseLogo :heading="false" />
  </header>
</template>

<script>
import BaseLogo from '@/components/BaseLogo'
import MyPicture from '@/components/Profile/MyPicture'

export default {
  components: {
    BaseLogo,
    MyPicture
  }
}
</script>
