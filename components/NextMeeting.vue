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
      <a v-if="meeting.url" :href="meeting.url.url" target="_blank" itemprop="url" rel="nofollow noreferrer">
        <strong itemprop="name">{{ meeting.name }}</strong>
      </a>
      <strong v-else itemprop="name">{{ meeting.name }}</strong>
    </p>
    <svg-icon name="coffee" />
  </section>
</template>

<script>
export default {
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
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
    let sbLocaleMulti = ''
    if (this.currentLocale.code !== this.$i18n.defaultLocale) {
      sbLocaleMulti = `${this.currentLocale.code}/`
    }

    const today = new Date()
    const parsedToday = today.toISOString().split('T')[0]

    const meetings = await this.$storyapi
      .get(`cdn/stories?starts_with=${sbLocaleMulti}events/&filter_query[date][like]=${parsedToday}*&is_startpage=0`, {
        version: this.preview ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.stories
      })

    if (meetings.length > 0) {
      this.meeting = meetings[0].content
    }
  }
}
</script>

<style lang="scss">
.event {
  position: relative;
  &--today {
    padding: 1em;
    border: dashed 1px var(--color-main);
    margin: 1em 0;
  }
  p {
    margin-bottom: 0;
  }
  svg {
    max-height: 80px;
    width: 100px;
    fill: var(--color-main);
    font-size: 6em;
    position: absolute;
    top: 0.2em;
    right: 0.1em;
    opacity: 0.3;
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
