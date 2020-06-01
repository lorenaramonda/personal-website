<template>
  <div class="section row">
    <article v-if="orderedSkills.length > 0" id="skills" class="cv column p-skill">
      <h2 class="section__title">{{ $t('skills.title') }}</h2>
      <section v-for="(slice, i) in orderedSkills" :key="i">
        <ul v-if="slice.items.length > 0" class="tags">
          <li v-for="item in slice.items" :key="item.name" v-tooltip="getLabel(item.rate)" :class="`tags__single--${item.rate}`" class="tags__single">
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
      default: 10
    },
    minimunRate: {
      type: Number,
      default: 6
    }
  },
  computed: {
    orderedSkills() {
      if (!this.skills.body) return []
      const newArray = []
      this.skills.body.forEach((slice, index) => {
        const items = slice.items
          .filter(e => e.rate >= this.minimunRate)
          // .sort((a, b) => b.rate - a.rate)
          .slice(0, this.max)
        newArray.push({ ...slice, items })
      })
      return newArray
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

<style></style>
