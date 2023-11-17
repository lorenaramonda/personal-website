<template>
  <div v-tooltip="label" class="meter">
    <SvgIcon v-for="star in stars" :key="star.id" class="meter__icon" :class="{ 'meter__icon--full': star.full }" :name="icon" />
    <span class="meter__text">{{ label }}</span>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      default: 'star', // star | heart
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 10,
    },
    low: {
      type: Number,
      default: 5,
    },
    high: {
      type: Number,
      default: 8,
    },
    value: {
      type: Number,
      required: true,
    },
  },
  computed: {
    stars() {
      const stars = []
      for (let i = 1; i <= this.max; i++) {
        stars.push({
          id: i,
          full: i <= this.value,
        })
      }
      return stars
    },
    label() {
      const str = this.$filters.rateLabel(this.value)
      return this.$t(str)
    },
  },
}
</script>

<style lang="scss">
.meter {
  cursor: help;
  display: flex;
  &__icon {
    width: 20px;
    height: 20px;
    max-width: none;
    max-height: none;
    fill: var(--color-main-light);
    &--full {
      fill: var(--color-main-darker);
    }
  }
  &__text {
    display: none;
  }
}
</style>
