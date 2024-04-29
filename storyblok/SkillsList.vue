<template>
  <div v-editable="blok" class="skills-list">
    <div v-if="orderedSkills.length > 0" id="skills" class="cv p-skill">
      <BaseHeading v-if="blok.title">{{ blok.title }}</BaseHeading>
      <ul v-if="orderedSkills.length > 0" class="skills-list__skills">
        <li
          v-for="item in orderedSkills"
          :key="item.name"
          v-tooltip="getLabel(item.rate)"
          :class="[{ 'skills-list__skill--small': small }, `skills-list__skill--${item.rate}`]"
          class="skills-list__skill"
        >
          <span>{{ item.name || item.skill }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { $filters } = useNuxtApp()

type Skill = {
  name: string
  skill?: string
  rate?: number
}

const props = defineProps<{
  blok: Record<string, any>
  small?: boolean
}>()

const MAX_SKILLS_TO_LIST = 14
const MINIMUM_RATE = 6

const orderedSkills = computed(() => {
  if (!props.blok.items) return []
  const allSkillsAreRated = props.blok.items.every((item: Skill) => item.rate).length > 1
  return allSkillsAreRated
    ? props.blok.items.filter((e: Skill) => (e.rate ? e.rate >= MINIMUM_RATE : e)).slice(0, MAX_SKILLS_TO_LIST)
    : props.blok.items.filter((e: Skill) => e.skill || e.name)
})

function getLabel(val: string) {
  return val ? t($filters.rateLabel(parseInt(val))) : ''
}
</script>

<style lang="scss">
.skills-list {
  &__skills {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    max-width: 1090px;
    margin: 0 auto;
    &--left {
      justify-content: flex-start;
      margin: 0 auto 0 0;
    }
  }
  &__skill {
    line-height: 40px;
    padding: 0 1em;
    border: solid 2px color('main');
    border-radius: 20px;
    position: relative;
    overflow: hidden;
    margin-right: 1em;
    margin-bottom: 1em;
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
      background-color: color('main');
      transition: width linear 0.2s;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
    }
    &--small {
      line-height: 20px;
      font-size: 0.85em;
      font-weight: normal;
      border: 0;
      background-color: color('main', 0.2);
    }
    @for $i from 1 through 10 {
      &--#{$i} {
        @if $i == 10 {
          font-weight: 700;
        } @else if $i < 10 and $i >= 8 {
          font-weight: 600;
        } @else {
          font-weight: normal;
        }
        &:hover {
          span {
            color: color('background');
          }
          &::before {
            width: #{$i * 10%};
          }
        }
        &:active {
          &::before {
            width: 100%;
            background-color: color('main', 0.5);
          }
        }
      }
    }
  }
}
</style>
