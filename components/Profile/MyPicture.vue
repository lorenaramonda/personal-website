<template>
  <figure class="profile-picture">
    <picture>
      <source media="(max-width: 1024px)" srcset="~/assets/images/lorena-ramonda.jpg" />
      <img src="~/assets/images/lorena-ramonda_400x400.jpg" width="400" height="400" alt="Lorena Ramonda" itemprop="image" class="u-photo" />
    </picture>
    <figcaption class="show-for-medium-up">Lorena Ramonda</figcaption>
  </figure>
</template>

<script>
export default {}
</script>

<style lang="scss">
.profile-picture {
  min-width: 200px;
  min-height: 200px;
  margin-bottom: 1em;
  position: relative;
  display: inline-block;
  margin: 0 auto;
  img {
    width: 100%;
    height: auto;
    max-width: 200px;
    border-radius: 1000px;
    padding: 5px;
    margin-top: 0.5em;
    border: dashed 2px var(--color-main);
  }
  figcaption {
    display: none;
    @media #{$medium-up} {
      line-height: 2em;
      text-align: center;
      background-color: var(--color-main);
      color: var(--color-bg);
      font-size: 0.8em;
      padding: 0.2em 0.5em;
      display: block;
      border-radius: 20px;
      position: absolute;
      top: 10%;
      right: -20%;
      z-index: 2;
    }
  }
}
</style>
