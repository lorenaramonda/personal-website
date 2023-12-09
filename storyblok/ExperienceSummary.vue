<template>
  <div class="experience-summary" itemscope itemtype="http://schema.org/Person">
    <div class="experience-summary__intro">
      <MyPicture />
    </div>
    <div class="experience-summary__content">
      <LongText :blok="blok" />
      <p class="contact-info">
        <ClientOnly>
          <ContactAge class="contact-info__item" />
        </ClientOnly>
        <ContactAddress class="contact-info__item" />
        <ClientOnly>
          <ContactEmail class="contact-info__item" />
        </ClientOnly>
      </p>
    </div>

    <div v-if="yearsOfExperience !== '0' && yearsOfRemote" class="badges">
      <i18n-t keypath="experiences.years" tag="div" scope="global" class="badge-stat">
        <template #years>
          <span>{{ yearsOfExperience }}</span>
        </template>
      </i18n-t>
      <i18n-t keypath="experiences.remoteYears" tag="div" scope="global" class="badge-stat">
        <template #years>
          <span>{{ yearsOfRemote }}</span>
        </template>
      </i18n-t>
      <i18n-t keypath="experiences.curiosity" tag="div" scope="global" class="badge-stat">
        <template #number>
          <span>∞</span>
        </template>
      </i18n-t>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const { yearsOfExperience, yearsOfRemote } = useStore()

defineProps<{
  blok: GenericObject
}>()
</script>

<style lang="scss">
.experience-summary {
  @include mq($from: tablet) {
    display: grid;
    grid-template-columns: 35% 65%;
    grid-template-areas:
      'left right'
      'footer footer';
  }
  .long-text {
    font-family: $font-family-title;
    line-height: 2;
    font-size: 1.2em;
    font-weight: 200;
    a {
      @extend %text-link;
    }
    b,
    strong {
      font-weight: 500;
    }
  }
  &__intro {
    display: grid;
    padding: 3rem;
    .profile-picture {
      justify-self: center;
      align-self: center;
      @include mq($from: desktop) {
        transform: rotate(-4deg) scale(1.5) translate(-10px, -17px);
      }
    }
  }
  &__content {
    .contact-info {
      display: flex;
      @include mq($until: tablet) {
        flex-wrap: wrap;
        gap: 1rem;
      }
      &__item {
        flex: 1 0 auto;
        display: flex;
        align-items: center;
        gap: 1rem;
        font-weight: 600;
        font-size: 1.1em;
        white-space: nowrap;
        padding-right: 1rem;
        svg {
          color: var(--color-main-darker);
          flex: 0 0 24px;
        }
      }
    }
  }
}

.badges {
  @include mq($from: tablet) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
    grid-area: footer;
  }
}

.badge-stat {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  margin: 2rem 0;
  text-transform: uppercase;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  text-align: center;

  span {
    font-size: 2em;
    display: block;
    font-weight: bold;
  }

  &:first-of-type {
    background-color: var(--color-secondary-dark);
  }
  &:nth-of-type(2) {
    background-color: var(--color-main-dark);
    color: var(--color-bg);
  }
  &:last-of-type {
    background-color: var(--color-bg);
    color: var(--color-neutral-darker);

    &::before {
      background-color: rgba(var(--color-main-rgb), 0.1);
    }
  }

  @include mq($until: tablet) {
    span {
      transform: scale(3.5) rotate(-8deg);
      opacity: 0.2;
      position: absolute;
    }
  }

  @include mq($from: tablet) {
    flex-direction: column;
    height: 200px;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 3;
      background: rgba(255, 255, 255, 0.5);
      transition: transform 0.6s;
      transform: scale3d(3.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, -100%, 0);
    }

    &:hover:before {
      transform: scale3d(3.9, 1.4, 1) rotate3d(0, 0, 1, 45deg) translate3d(0, 100%, 0);
    }
  }
}
</style>
