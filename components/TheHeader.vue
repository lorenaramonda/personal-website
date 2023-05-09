<template>
  <header class="row layout__header hcard">
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

<style lang="scss">
.layout__header {
  position: relative;
  display: flex;
  margin-bottom: 4em;
  padding-top: $gutter;
  p {
    a {
      color: var(--color-main);
      text-decoration: none;
      &:hover {
        border-bottom: dashed 1px var(--color-main);
      }
    }
    strong {
      color: var(--color-main);
      font-weight: normal;
    }
  }
  @include mq($until: desktop) {
    flex-direction: column;
    .logo {
      width: 100%;
    }
    .profile-picture {
      order: -1;
    }
  }
  @include mq($from: desktop) {
    padding-top: 0;
    .hgroup {
      flex: 0 0 50%;
    }
    .profile-address {
      flex: 1 0 auto;
      order: 2;
    }
  }
  &--base {
    justify-content: flex-start;
    align-items: center;
    .logo {
      text-align: left;
      border: none;
      margin: 2em 1em;
    }
    a {
      font-family: $font-family-title;
      text-decoration: none;
      font-size: 2.5em;
    }
    .palette--ally & .logo {
      &::after {
        content: none;
      }
    }
    .hgroup {
      flex: 0;
    }
    .profile-picture {
      min-width: 100px;
      min-height: 100px;
      margin: 1rem 1rem 1rem 0;
      img {
        width: 100px;
      }
      figcaption {
        display: none;
      }
    }
    @include mq($until: desktop) {
      flex-direction: row;
    }
  }
}
</style>
