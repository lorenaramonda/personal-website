<template>
  <div v-editable="skills" class="section row">
    <article v-if="orderedSkills.length > 0" id="skills" class="cv column p-skill">
      <h2 class="section__title">{{ skills.title }}</h2>
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
export default {
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

<style scoped>
section {
  max-width: 1090px;
  margin: 0 auto;
}
</style>
