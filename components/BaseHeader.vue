<template>
  <header class="row layout__header layout__header--base hcard">
    <MyPicture />
    <BaseLogo :heading="false" class="logo--reduced" />
    <div>
      <BaseLanguageSwitcher />
      <PaletteSwitcher />
    </div>
  </header>
</template>

<script>
import BaseLogo from '@/components/BaseLogo'
import MyPicture from '@/components/Profile/MyPicture'
import PaletteSwitcher from '@/components/PaletteSwitcher'
import BaseLanguageSwitcher from '@/components/BaseLanguageSwitcher'

export default {
  components: {
    BaseLogo,
    MyPicture,
    PaletteSwitcher,
    BaseLanguageSwitcher
  }
}
</script>

<style scoped>
.layout__header--base .logo--reduced {
  flex: 1;
}
</style>
