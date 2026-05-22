<template>
  <figure :class="[$style.profilePicture, { [$style.profilePictureFeatured]: featured }]">
    <FlipBox @mouseenter="toggleTitle(true)" @mouseleave="toggleTitle(false)">
      <template #front>
        <img
          src="~/assets/images/lorena-ramonda_400x400.jpg"
          width="400"
          height="400"
          alt="Lorena Ramonda"
          itemprop="image"
        />
      </template>
      <template #back>
        <img src="~/assets/images/rocket.png" width="512" height="512" alt="Logo The Rocket Dev" />
      </template>
    </FlipBox>
    <figcaption
      :class="[
        $style.profilePictureTitle,
        { [$style.profilePictureTitleHighlighted]: highlightTitle },
      ]"
    >
      <span>the rocket dev</span>
      <div :class="$style.pictureCaption" itemprop="name">
        <span itemprop="givenName">Lorena</span> <span itemprop="familyName">Ramonda</span>
      </div>
    </figcaption>
  </figure>
</template>

<script setup lang="ts">
defineProps<{
  featured?: boolean
}>()

const highlightTitle = ref(false)

function toggleTitle(shouldShow?: boolean) {
  highlightTitle.value = typeof shouldShow === 'boolean' ? shouldShow : !highlightTitle.value
}
</script>

<style lang="scss" module>
.profilePicture {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 auto;
}

.profilePictureFeatured {
  justify-self: center;
  align-self: center;
  @include mq($from: desktop) {
    transform: rotate(-4deg) scale(1.5) translate(-10px, -17px);
  }
}

.pictureCaption {
  font-weight: bold;
  font-size: 2rem;
  color: color('text-logo');
  font-family: $font-family-text;
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}

.profilePictureTitle {
  font-family: $font-family-special;
  color: color('neutral-lighter');
  font-size: 6rem;
  position: relative;
  display: block;
  margin: 0 auto;
  line-height: 0.8;
  text-align: center;
  span {
    transition: all 0.8s ease-in-out;
  }
  .pictureCaption {
    transition: all 0.4s ease-in-out;
  }
}
.profilePictureTitleHighlighted {
  span {
    color: color('main');
  }
  .pictureCaption {
    opacity: 0;
    color: color('background');
  }
}
</style>
