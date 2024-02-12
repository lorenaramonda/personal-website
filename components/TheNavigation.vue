<template>
  <div class="navigation" :class="{ 'navigation--open': open }">
    <div class="navigation__top">
      <NuxtLink :to="localePath({ name: 'index' })" class="navigation__gohome" @click="toggleMenu(!open)">
        <MyPicture />
      </NuxtLink>
      <BaseLanguageSwitcher @click="toggleMenu(false)">
        <NuxtLink
          v-tooltip.top="$t('languages.others')"
          :to="localePath({ name: 'hobbies-slug', params: { slug: 'learning-new-languages' } })"
          :title="$t('languages.others')"
          :aria-label="$t('languages.othersLabel')"
          @click="toggleMenu(false)"
        >
          <span>{{ $t('languages.others') }}</span>
          <LucidePlus />
        </NuxtLink>
      </BaseLanguageSwitcher>
      <nav>
        <ul>
          <li class="navigation__item">
            <NuxtLink
              :to="localePath({ name: 'index' })"
              class="navigation__link"
              active-class="navigation__link--active"
              title="Home"
              @click="toggleMenu(false)"
            >
              <span>Home</span>
            </NuxtLink>
          </li>
          <li v-if="localePath({ name: 'experiences' })" class="navigation__item">
            <NuxtLink
              :to="localePath({ name: 'experiences' })"
              class="navigation__link"
              active-class="navigation__link--active"
              :title="$t('experiences.title')"
              @click="toggleMenu(false)"
            >
              <span>{{ $t('experiences.title') }}</span>
            </NuxtLink>
          </li>
          <li v-if="localePath({ name: 'publications' })" class="navigation__item">
            <NuxtLink
              :to="localePath({ name: 'publications' })"
              class="navigation__link"
              :class="{ 'navigation__link--active': routeName.startsWith('publications') }"
              active-class="navigation__link--active"
              :title="$t('publications.title')"
              @click="toggleMenu(false)"
            >
              <span>{{ $t('publications.title') }}</span>
            </NuxtLink>
          </li>
          <li v-if="localePath({ name: 'projects' })" class="navigation__item">
            <NuxtLink
              :to="localePath({ name: 'projects' })"
              class="navigation__link"
              :class="{ 'navigation__link--active': routeName.startsWith('projects') }"
              active-class="navigation__link--active"
              :title="$t('projects.title')"
              @click="toggleMenu(false)"
            >
              <span>{{ $t('projects.title') }}</span>
            </NuxtLink>
          </li>
          <li v-if="localePath({ name: 'hobbies' })" class="navigation__item">
            <NuxtLink
              :to="localePath({ name: 'hobbies' })"
              class="navigation__link"
              :class="{ 'navigation__link--active': routeName.startsWith('hobbies') }"
              active-class="navigation__link--active"
              :title="$t('hobbies.title')"
              @click="toggleMenu(false)"
            >
              <span>{{ $t('hobbies.title') }}</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
    <div class="navigation__bottom">
      <TheNavigationIllustration class="navigation__bg-image" />
      <SocialsLinks unlabelled />
      <TheCopyrights class="navigation__copyrights" />
    </div>
  </div>
  <TheNavigationToggle class="navigation__toggle navigation__toggle--mobile" :dark="open" @click="toggleMenu(!open)" />
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const route = useRoute()
const open = ref(false)

const routeName = computed((): string => {
  return route.name?.toString() ?? ''
})

function toggleMenu(isOpen?: boolean) {
  open.value = typeof isOpen === 'boolean' ? isOpen : !open.value
}
</script>

<style lang="scss">
$mobile-height: 643px;

.navigation {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 1rem 0;
  background-color: var(--color-background-navigation);

  &__gohome {
    text-decoration: none;
  }

  &__copyrights {
    text-align: center;
    color: var(--color-text-footer);
    position: relative;
    a {
      color: currentColor;
    }
  }

  &__item {
    padding: 1rem 0;
  }

  nav {
    text-align: center;
    margin: 2em auto;
  }

  &__link {
    line-height: 2;
    text-decoration: none;
    font-weight: 500;
    font-family: $font-family-text;
    position: relative;
    &::before {
      content: '';
      width: 13px;
      height: 13px;
      border-radius: 10px;
      position: absolute;
      left: -10%;
      top: 1rem;
      z-index: 0;
      background-color: var(--color-secondary);
      opacity: 0;
      transition: all 0.3s ease-in-out;
    }
    @include mq($from: tablet) {
      &:hover::before {
        opacity: 1;
      }
    }
    &--active::before {
      width: 120%;
      opacity: 1;
    }
    span {
      position: relative;
      z-index: 1;
    }
  }

  &__bottom {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }

  &__bg-image {
    position: absolute;
    left: -1rem;
    bottom: 0;
    width: calc(100% + 2rem);
    max-height: none;
    opacity: var(--opacity-background-navigation);
    transition: var(--transition-image-navigation);
  }

  > * {
    z-index: 1;
  }
  > .navigation__bottom {
    z-index: 0;
  }

  @include mq($until: tablet) {
    position: fixed;
    top: $mobile-toggle-height;
    left: 0;
    z-index: 10;
    transform: translateX(-100%);
    width: 80%;
    height: calc(100vh - ($mobile-toggle-height * 2)); //$mobile-height;
    overflow-y: auto;
    border-radius: 0 0 2rem 0;
    transition: all 0.2s linear;
    padding-bottom: 2rem;

    &--open {
      transform: translateX(0);
      box-shadow: 0 2px 3px 0px rgba(var(--color-text-rgb), 0.2);
      background-color: var(--color-background-navigation-mobile);
      color: var(--color-text-navigation);
      .navigation__link {
        color: var(--color-text-navigation);
        &--active:before {
          background-color: var(--color-secondary-darker);
        }
      }
      .profile-picture figcaption {
        opacity: 0;
      }
      .language-switcher {
        margin-bottom: 0;
      }
      .socials-links__link {
        background-color: transparent;
        color: var(--color-text-navigation);
      }
      .navigation__bg-image {
        display: none;
      }
    }

    &__copyrights {
      display: none;
    }
  }
}
</style>
