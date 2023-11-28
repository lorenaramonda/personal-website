<template>
  <div class="onepage-intro-wrapper">
    <section id="intro" v-editable="blok" class="onepage-intro">
      <div class="onepage-intro__left" itemscope itemtype="http://schema.org/Person">
        <span v-if="blok.greetings" class="onepage-intro__text">{{ blok.greetings }}</span>
        <h1 class="onepage-intro__title p-name" itemprop="name">{{ name }}</h1>
        <h2 class="onepage-intro__subtitle p-job-title" itemprop="jobTitle">{{ jobTitle }}</h2>
        <RichtextRenderer :document="blok.description" class="onepage-intro__text" />
        <div class="onepage-intro__actions">
          <StoryblokComponent v-for="action in blok.actions" :key="action._uid" :blok="action" />
        </div>
      </div>

      <div class="onepage-intro__right">
        <StoryblokImage
          v-if="blok.image_background?.filename"
          :image="blok.image_background"
          :width="512"
          :height="512"
          class="onepage-intro__background"
        />
        <svg v-else class="onepage-intro__background" width="680" height="701" viewBox="0 0 680 701" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="384" cy="406" r="295" fill="currentColor" />
          <path d="M1 557.656C1 557.656 361.283 778.271 426.143 497.286C491.004 216.302 679 191 679 191" stroke="black" stroke-width="2" />
          <path d="M103 297C139 195.5 229 148 229 148" stroke="black" stroke-width="2" />
          <path
            d="M513.135 4.994C513.346 4.45054 513.534 3.92869 513.7 3.44276C513.897 4.02574 514.121 4.65881 514.366 5.31464C514.874 6.66979 515.483 8.13658 516.163 9.46487C516.834 10.7777 517.61 12.0239 518.471 12.8848C519.331 13.7456 520.578 14.521 521.891 15.1929C523.219 15.8727 524.686 16.4815 526.041 16.9891C526.572 17.1882 527.089 17.3726 527.576 17.5404C527.177 17.6521 526.759 17.7754 526.327 17.9106C523.721 18.7276 520.478 20.0328 518.483 21.9582C516.387 23.9816 514.951 27.3582 514.048 30.0826C513.878 30.596 513.725 31.093 513.588 31.5621C513.424 31.0818 513.243 30.5716 513.044 30.044C512.016 27.3227 510.452 23.9664 508.372 21.9582C506.386 20.0411 503.28 18.7348 500.792 17.915C500.446 17.8009 500.108 17.6953 499.784 17.598C500.089 17.4924 500.405 17.3787 500.731 17.2569C503.195 16.3347 506.272 14.9026 508.368 12.901C510.568 10.8012 512.132 7.58387 513.135 4.994Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M547.775 30.8044C548.139 29.8648 548.449 28.9771 548.706 28.1898C549.002 29.0923 549.358 30.1244 549.764 31.2061C550.394 32.8875 551.147 34.7036 551.988 36.3454C552.82 37.9717 553.771 39.4958 554.815 40.54C555.86 41.5842 557.384 42.5353 559.01 43.3677C560.652 44.2079 562.468 44.9619 564.149 45.5918C565.092 45.9449 565.997 46.2607 566.811 46.5324C566.097 46.7214 565.313 46.9438 564.493 47.2008C561.254 48.2165 557.266 49.8273 554.828 52.1807C552.266 54.6542 550.494 58.8058 549.371 62.1926C549.065 63.1142 548.803 63.9931 548.584 64.786C548.322 63.9832 548.014 63.0906 547.66 62.154C546.382 58.7703 544.452 54.639 541.905 52.1807C539.476 49.8356 535.656 48.2237 532.565 47.2052C531.864 46.9744 531.192 46.7715 530.572 46.5956C531.166 46.3998 531.808 46.1764 532.479 45.925C535.538 44.7801 539.329 43.0118 541.901 40.5562C544.598 37.9817 546.529 34.02 547.775 30.8044Z"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M521.135 68.994C521.346 68.4505 521.534 67.9287 521.7 67.4428C521.897 68.0257 522.121 68.6588 522.366 69.3146C522.874 70.6698 523.483 72.1366 524.163 73.4649C524.834 74.7777 525.61 76.0239 526.471 76.8848C527.331 77.7456 528.578 78.521 529.891 79.1929C531.219 79.8727 532.686 80.4815 534.041 80.9891C534.572 81.1882 535.089 81.3726 535.576 81.5404C535.177 81.6521 534.759 81.7754 534.327 81.9106C531.721 82.7276 528.478 84.0328 526.483 85.9582C524.387 87.9816 522.951 91.3582 522.048 94.0826C521.878 94.596 521.725 95.093 521.588 95.5621C521.424 95.0818 521.243 94.5716 521.044 94.044C520.016 91.3227 518.452 87.9664 516.372 85.9582C514.386 84.0411 511.28 82.7348 508.792 81.915C508.446 81.8009 508.108 81.6953 507.784 81.598C508.089 81.4924 508.405 81.3787 508.731 81.2569C511.195 80.3347 514.272 78.9026 516.368 76.901C518.568 74.8012 520.132 71.5839 521.135 68.994Z"
            stroke="black"
            stroke-width="2"
          />
        </svg>

        <picture v-if="blok.image">
          <StoryblokImage :image="blok.image" itemprop="image" :width="512" :height="512" class="onepage-intro__image u-photo" />
        </picture>
      </div>

      <div v-if="blok.show_socials" class="onepage-intro__socials">
        <SocialsLinks />
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import type { GenericObject } from '@/types'

const store = useStore()

const props = defineProps<{
  blok: GenericObject
}>()

const name = computed(() => props.blok.name || 'Lorena Ramonda')
const jobTitle = computed(() => props.blok.job_title || store.lastJobTitle || 'Frontend Developer')

// const bgColor = computed(() => {
//   if (props.blok.bg_color === 'main') return 'var(--color-main-dark)'
//   if (props.blok.bg_color === 'secondary') return 'var(--color-secondary)'
//   return 'transparent'
// })
</script>

<style lang="scss">
.onepage-intro-wrapper {
  // background-color: v-bind(bgColor);
}
.onepage-intro {
  @include container;
  background-color: var(--color-bg);
  padding: 2rem;
  font-family: $font-family-text;
  position: relative;
  box-sizing: border-box;

  &__left {
    flex: 1 0 40%;
  }
  &__right {
    align-self: flex-end;
    flex: 1;
    text-align: right;
    position: relative;
  }
  &__image {
    position: relative;
    z-index: 1;
  }
  &__background {
    position: absolute;
    bottom: 0;
    z-index: 0;
    color: var(--color-main);
    display: none;
  }

  &__title {
    font-size: 2.5em;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 1rem;
    @include mq($from: tablet) {
      font-size: 3em;
    }
  }
  &__subtitle {
    font-size: 1.4em;
    display: flex;
    align-items: center;
    gap: 10px;
    white-space: nowrap;
    &:before {
      content: '';
      width: 40px;
      height: 1px;
      background-color: var(--color-text);
      @include mq($from: tablet) {
        width: 80px;
      }
    }
  }
  &__text {
    color: rgb(84, 84, 84);
  }

  &__actions {
    margin-top: 3em;
    display: flex;
    gap: 10px;
  }
  &__socials {
    margin-top: 3rem;
  }

  @include mq($from: tablet) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    height: calc(100vh - 90px);

    &__image {
      max-width: 500px;
    }

    &__background {
      display: block;
    }
    &__socials {
      position: absolute;
      bottom: 0;
      margin-bottom: 3rem;
    }
  }

  @include mq($from: desktop) {
    &__image {
      max-width: 512px;
    }
  }
}
</style>
