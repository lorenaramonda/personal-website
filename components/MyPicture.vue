<template>
  <figure class="profile-picture">
    <FlipBox @mouseenter="toggleTitle(true)" @mouseleave="toggleTitle(false)">
      <template #front>
        <img src="~/assets/images/lorena-ramonda_400x400.jpg" width="400" height="400" alt="Lorena Ramonda" itemprop="image" />
      </template>
      <template #back>
        <img src="~/assets/images/rocket.png" width="512" height="512" alt="Logo The Rocket Dev" />
      </template>
    </FlipBox>
    <div class="profile-picture__title" :class="{ 'profile-picture__title--highlighted': highlightTitle }">
      <span>the rocket dev</span>
      <figcaption itemprop="name"><span itemprop="givenName">Lorena</span> <span itemprop="familyName">Ramonda</span></figcaption>
    </div>
  </figure>
</template>

<script setup lang="ts">
const highlightTitle = ref(false)

function toggleTitle(shouldShow?: boolean) {
  highlightTitle.value = typeof shouldShow === 'boolean' ? shouldShow : !highlightTitle.value
}
</script>

<style lang="scss">
.profile-picture {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;

  figcaption {
    font-weight: bold;
    font-size: 2rem;
    color: #130f49;
    font-family: $font-family-text;
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
  }

  &__title {
    font-family: $font-family-special;
    color: var(--color-neutral-lighter);
    font-size: 6rem;
    position: relative;
    display: block;
    margin: 0 auto;
    line-height: 0.8;
    text-align: center;
    span {
      transition: all 0.8s ease-in-out;
    }
    figcaption {
      transition: all 0.4s ease-in-out;
    }
    &--highlighted {
      span {
        color: var(--color-main);
      }
      figcaption {
        opacity: 0;
        color: var(--color-bg);
      }
    }
  }
}
</style>
