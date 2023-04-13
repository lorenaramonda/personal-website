<template>
  <div v-editable="skills" class="section row skills">
    <article v-if="orderedSkills.length > 0" id="skills" class="cv p-skill">
      <BaseHeading>{{ skills.title }}</BaseHeading>
      <section>
        <ul v-if="orderedSkills.length > 0" class="tags">
          <li
            v-for="item in orderedSkills"
            :key="item.name"
            v-tooltip="getLabel(item.rate)"
            :class="`tags__single--${item.rate}`"
            class="tags__single"
          >
            <span>{{ item.name }}</span>
          </li>
        </ul>
      </section>
    </article>
  </div>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  components: { BaseHeading },
  props: {
    skills: {
      type: Object,
      required: true
    },
    max: {
      type: Number,
      default: 14
    },
    minimunRate: {
      type: Number,
      default: 6
    }
  },
  computed: {
    orderedSkills() {
      if (!this.skills.items) return []
      return this.skills.items.filter(e => e.rate >= this.minimunRate).slice(0, this.max)
    }
  },
  methods: {
    getLabel(val) {
      const str = this.$options.filters.rateLabel(val)
      return this.$t(str)
    }
  }
}
</script>

<style lang="scss">
.skills section {
  max-width: 1090px;
  margin: 0 auto;
}
.tags {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  &__single {
    line-height: 40px;
    padding: 0 1em;
    border: solid 2px var(--color-main);
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-right: 1em;
    &.has-tooltip {
      cursor: help;
    }
    span {
      position: relative;
      z-index: 1;
      transition: color linear 0.2s;
    }
    &::before {
      content: '';
      display: block;
      height: 100%;
      width: 0;
      background-color: var(--color-main);
      transition: width linear 0.2s;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    &--small {
      line-height: 20px;
      font-size: 0.8em;
      font-weight: normal;
      border: 0;
      background-color: rgba(var(--color-main-rgb), 0.2);
    }
    @for $i from 1 through 10 {
      &--#{$i} {
        @if $i == 10 {
          font-weight: 700;
        } @else if $i < 10 and $i >= 8 {
          font-weight: 600; // this font does not have 600
        } @else {
          font-weight: normal;
        }
        &:hover {
          span {
            color: var(--color-bg);
          }
          &::before {
            width: #{$i * 10%};
          }
        }
        &:active {
          &::before {
            width: 100%;
            background-color: rgba(var(--color-main-rgb), 0.5);
          }
        }
      }
    }
  }
  &--left {
    justify-content: flex-start;
  }
}
</style>
