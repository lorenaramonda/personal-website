<template>
  <div class="cookies">
    <div class="cookies__content">
      <p>
        Do you want to eat cookies? Cookies are good for your diet. We, in Europe, just care about your health :) Give us the permission to treat you
        like a boss. <a title="Information about Cookies Privacy law" href="/cookie-privacy/">What the hell are u sayin'?</a>
      </p>
      <button>Cookie accepted!</button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.cookies {
  position: fixed;
  z-index: 3;
  top: 0px;
  width: 100%;
  &::before {
    content: '';
    display: block;
    background-color: rgba(black, 0.2);
    position: fixed;
    width: 100%;
    height: 100%;
  }
  &__content {
    position: relative;
    font-family: $font-family-text;
    background-color: var(--color-main-lightest); //#cff2ef;
    text-align: center;
    padding: 1em;
  }
  a {
    color: var(--color-main-darkest);
  }
  p {
    margin: 1em;
  }
  button {
    background-color: var(--color-main-dark);
    border: none;
    font-family: $font-family-text;
    border-radius: 20px;
    border-bottom: solid 3px var(--color-main-darkest);
    padding: 0.5em 1.5em;
    cursor: pointer;
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
