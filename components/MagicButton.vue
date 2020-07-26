<template>
  <button class="magic-button" type="button" @click="doTheMagic">
    <span class="magic-button__inner">
      {{ $t('site.magicButton') }}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        version="1.1"
        x="0"
        y="0"
        viewBox="0 0 512 512"
        style="enable-background: new 0 0 512 512;"
        xml:space="preserve"
        width="512px"
        height="512px"
      >
        <g>
          <g>
            <g>
              <path
                d="M396.742,102.088c-17.984-30.604-38.579-54.991-61.213-72.485C310.116,9.96,283.358,0,256,0    c-27.357,0-54.115,9.96-79.528,29.603c-22.634,17.494-43.23,41.882-61.213,72.485C80.813,160.703,60.25,236.26,60.25,304.201    c0,34.003,5.102,64.808,15.165,91.557c9.669,25.702,23.921,47.756,42.36,65.549C152.144,494.471,199.941,512,256,512    s103.856-17.529,138.226-50.693c18.439-17.793,32.691-39.847,42.359-65.549c10.063-26.749,15.165-57.554,15.165-91.557    C451.75,236.26,431.186,160.703,396.742,102.088z"
                data-original="#000000"
                class="active-path"
                fill="#FFFFFF"
              />
            </g>
          </g>
        </g>
      </svg>
    </span>
  </button>
</template>

<script>
export default {
  methods: {
    doTheMagic() {
      this.$gtm.push({ event: 'magicButton' })
      // eslint-disable-next-line no-console
      console.log('COMING SOON BABE! :)')
    }
  }
}
</script>

<style lang="scss">
.magic-button {
  display: inline-block;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  margin: 0;
  border: none;
  background-color: var(--color-main);
  font-size: 0;
  padding: 4px;
  box-sizing: border-box;
  cursor: pointer;
  &__inner {
    border: dashed 1px #fff;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    width: 30px;
    transform: rotate(5deg);
  }
  &:hover {
    svg {
      animation: thrill 0.8s linear;
    }
  }
  &:active {
    background-color: var(--color-main-dark);
    svg {
      animation: none;
      transform: rotate(0);
    }
  }
}
@keyframes thrill {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(0deg) translateY(-5px);
  }
  50% {
    transform: rotate(0deg) translateY(0);
  }
  75% {
    transform: rotate(0deg) translateY(-5px);
  }
  100% {
    transform: rotate(0deg) translateY(0);
  }
}
</style>
