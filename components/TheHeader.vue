<template>
  <header class="row column layout__header hcard">
    <BaseLogo />
    <MyPicture />
    <MyAddress />
  </header>
</template>

<script>
import BaseLogo from '@/components/BaseLogo'
import MyPicture from '@/components/Profile/MyPicture'
import MyAddress from '@/components/Profile/MyAddress'

export default {
  components: {
    BaseLogo,
    MyPicture,
    MyAddress
  }
}
</script>
