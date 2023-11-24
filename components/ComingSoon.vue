<template>
  <div class="coming-soon">
    <img src="~/assets/images/soon.png" width="512" height="512" alt="This section is coming soon" />
    <BaseHeading><slot /></BaseHeading>
  </div>
</template>

<style lang="scss">
.coming-soon {
  align-self: center;
  justify-self: center;
  text-align: center;

  img {
    max-width: 150px;
  }
}
</style>
