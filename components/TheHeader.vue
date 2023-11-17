<template>
  <header class="row header hcard" :class="{ 'header--simple': simple }">
    <BaseLogo :heading="!simple" :class="{ 'logo--reduced': simple }" />
    <MyPicture />
    <template v-if="!simple">
      <MyAddress />
    </template>
    <template v-else>
      <div class="header__tools">
        <BaseLanguageSwitcher />
        <PaletteSwitcher />
      </div>
    </template>
  </header>
</template>

<script setup>
import BaseLogo from '@/components/BaseLogo'
import MyPicture from '@/components/Profile/MyPicture'
import MyAddress from '@/components/Profile/MyAddress'

defineProps({
  simple: {
    type: Boolean,
    default: false,
  },
})
</script>

<style lang="scss">
.header {
  position: relative;
  display: flex;
  margin-bottom: 4em;
  padding-top: $gutter;
  align-items: center;
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
  &--simple {
    justify-content: flex-start;
    align-items: center;
    .logo {
      text-align: left;
      border: none;
      margin: 2em 1em;

      a {
        font-family: $font-family-title;
        text-decoration: none;
        font-size: 2.5em;
      }

      @include mq($until: tablet) {
        margin: 0em 1em;
        text-align: center;
      }
    }
    .logo--reduced {
      flex: 1;
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
      order: -1;
      img {
        width: 100px;
      }
      figcaption {
        display: none;
      }
    }
    @include mq($until: tablet) {
      margin-bottom: 2em !important;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }

  &__tools {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1em;
    .palette-switcher {
      margin: 0;
    }
  }

  @include mq($until: tablet) {
    flex-direction: column;
    .logo {
      width: 100%;
    }
    .profile-picture {
      order: -1;
    }
    &__tools {
      flex: 1 0 100%;
      order: -2;
    }
  }
  @include mq($from: tablet) {
    padding-top: 0;
    .hgroup {
      flex: 0 0 50%;
    }
    .profile-address {
      flex: 1 0 auto;
      order: 2;
    }
    &__tools {
      flex: 1;
      justify-content: flex-end;
    }
  }
}
</style>
