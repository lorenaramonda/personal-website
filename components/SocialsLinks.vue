<template>
  <div class="socials-links">
    <span v-if="!unlabelled" class="socials-links__label">{{ $t('site.follow') }}</span>
    <ul class="socials-links__list">
      <li class="socials-links__item socials-links__item--gh">
        <a
          v-tooltip="$t('social.github')"
          class="socials-links__link"
          href="https://github.com/lorenaramonda"
          target="_blank"
          rel="noopener"
          :title="$t('social.github')"
        >
          <LucideGithub aria-label="Github" />
        </a>
      </li>
      <li class="socials-links__item socials-links__item--tw">
        <a
          v-tooltip="$t('social.twitter')"
          class="socials-links__link"
          href="https://twitter.com/loreenaramonda"
          target="_blank"
          rel="noopener"
          :title="$t('social.twitter')"
        >
          <LucideTwitter aria-label="Twitter" />
        </a>
      </li>
      <li class="socials-links__item socials-links__item--li">
        <a
          v-tooltip="$t('social.linkedin')"
          class="socials-links__link"
          href="http://it.linkedin.com/in/lorenaramonda"
          target="_blank"
          rel="noopener"
          :title="$t('social.linkedin')"
        >
          <LucideLinkedin aria-label="LinkedIn" />
        </a>
      </li>
      <li class="socials-links__item socials-links__item--sk">
        <a
          v-tooltip="$t('social.skype')"
          class="socials-links__link"
          href="skype:lorena.ramonda?call"
          target="_blank"
          rel="noopener"
          :title="$t('social.skype')"
        >
          <LucidePhone aria-label="Skype" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  unlabelled?: boolean
}>()
</script>

<style lang="scss">
.socials-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &__list {
    display: flex;
    gap: 0.8rem;
  }
  &__link {
    background-color: var(--color-main-lightest);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: block;
    overflow: hidden;
    border: none;
    color: var(--color-text);
    display: flex;
    padding: 1.5rem;
    justify-content: center;
    align-items: center;
    position: relative;
    &::before {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      background-color: var(--color-main-light);
      transform: translateY(100%);
      position: absolute;
      transition: all ease 0.3s;
      z-index: 0;
    }
    @include mq($from: tablet) {
      &:hover {
        &::before {
          transform: translateY(0);
        }
      }
    }
    svg {
      position: relative;
      z-index: 1;
    }
  }

  @include mq($until: tablet) {
    &__label {
      display: none;
    }
  }
}
</style>
