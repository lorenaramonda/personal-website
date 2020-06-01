<template>
  <div v-if="meetings.length > 0" class="section row">
    <article class="agenda column">
      <h2 class="section__title">{{ title }}</h2>
      <p>{{ $t('Mi troverai qui') }}</p>
      <ul class="meetings">
        <li v-for="meeting in meetings" :key="meeting.id">
          <time :datetime="meeting.data.date">
            <span class="day">{{ meeting.data.date | getDay }}</span>
            <span class="month">{{ getMonth(meeting.data.date) }}</span>
          </time>
          <p>
            <a v-if="meeting.data.url.url" :href="meeting.data.url.url" target="_blank" rel="nofollow noreferrer" class="event__name">{{
              meeting.data.name
            }}</a>
            <span v-else class="event__name">{{ meeting.data.name }}</span>
            <span>{{ $t('a') }} {{ meeting.data.city }}</span>
          </p>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
export default {
  filters: {
    getDay: value => {
      if (!value) return ''
      return new Date(Date.parse(value)).getDate()
    }
  },
  data() {
    return {
      title: 'Agenda',
      meetings: []
    }
  },
  computed: {
    dateStart() {
      if (!this.meeting.conference_date) return
      return new Date(this.meeting.conference_date)
    },
    // return new Date(Date.parse(value)).getMonth() + 1 // because January is 0
    currentLocale() {
      return this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
    }
  },
  async created() {
    const meetings = await this.$prismic.api.query(this.$prismic.predicates.at('document.type', 'event'), {
      orderings: '[my.event.date]',
      lang: this.currentLocale.iso.toLowerCase()
    })
    const nextMeetings = meetings.results.filter(e => Date.parse(new Date(e.data.date).toDateString()) - Date.parse(new Date().toDateString()) >= 0)
    if (nextMeetings.length > 0) this.meetings = nextMeetings
  },
  methods: {
    getMonth(date) {
      if (!date) return date
      return new Date(date).toLocaleDateString(this.currentLocale.iso, {
        month: 'short'
      })
    }
  }
}
</script>

<style lang="scss">
.agenda {
  margin-bottom: 2em;
  .meetings {
    li {
      clear: both;
      padding-top: 1em;
      ~ li {
        margin-top: 1rem;
      }
    }
    time {
      float: left;
      clear: both;
      text-align: center;
      margin-right: 1.8rem;
      line-height: normal;
      width: 7rem;
      border-right: solid 2px $color-text;
      padding-right: 1em;
      .day {
        font-size: 2.4em;
        color: $color-main;
      }
      .month {
        display: block;
        text-transform: uppercase;
      }
    }
    p {
      margin: 0.7em 0 1.2em;
    }
  }
  .event {
    &__name {
      font-size: 1.5em;
      ~ span {
        margin-top: 0.5em;
        display: block;
      }
    }
  }
}
</style>
