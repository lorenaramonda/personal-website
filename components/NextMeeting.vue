<template>
  <section v-if="meeting" :class="{ 'event--today': isTodayConf }" class="event" itemscope itemtype="http://schema.org/Event">
    <h3 class="section__subtitle">{{ $t('nextEvent.title') }}</h3>
    <meta :content="new Date(meeting.date)" itemprop="startDate" />
    <p>
      <span itemprop="location" itemscope itemtype="http://schema.org/Place">
        <span itemprop="name">{{ meeting.location }}</span>
        <span itemprop="address" itemscope itemtype="http://schema.org/PostalAddress">{{ meeting.city }}</span
        >,
      </span>
      {{ new Date(meeting.date).toLocaleDateString(currentLocale.iso, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) }}
      {{ $t('misc.for') }}
      <a v-if="meeting.url" :href="meeting.url.url" :target="meeting.url.target" itemprop="url" rel="nofollow noreferrer">
        <strong itemprop="name">{{ meeting.name }}</strong>
      </a>
      <strong v-else itemprop="name">{{ meeting.name }}</strong>
    </p>
    <svg-icon name="coffee" />
  </section>
</template>

<script>
export default {
  data() {
    return {
      meeting: null
    }
  },
  computed: {
    isTodayConf() {
      return new Date(this.meeting.date).toDateString() === new Date().toDateString()
    },
    currentLocale() {
      return this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
    }
  },
  async created() {
    const meetings = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'event'), {
      orderings: '[my.event.date]',
      lang: this.currentLocale.iso.toLowerCase()
    })
    if (meetings.results_size > 0) {
      const nextMeetings = meetings.results.filter(e => Date.parse(new Date(e.data.date).toDateString()) - Date.parse(new Date().toDateString()) >= 0)
      if (nextMeetings.length > 0) this.meeting = nextMeetings[0].data
    }
  }
}
</script>

<style lang="scss">
.event {
  &--today {
    padding: 1em;
    border: dashed 1px $color-main;
    margin: 1em 0;
    position: relative;
  }
  p {
    margin-bottom: 0;
  }
  svg {
    max-height: 80px;
    width: 100px;
    fill: rgba($color-main, 0.3);
    font-size: 6em;
    position: absolute;
    top: 0.2em;
    right: 0.1em;
  }
  span[itemprop='location'] {
    span[itemprop='name'] {
      display: none;
    }
  }
  span[itemprop='offers'] {
    display: none;
  }
}
</style>
