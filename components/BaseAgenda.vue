<template>
  <div v-if="meetings.length > 0" class="section row">
    <article class="agenda">
      <BaseHeading>{{ title }}</BaseHeading>
      <p>{{ $t('Mi troverai qui') }}</p>
      <ul class="meetings">
        <li v-for="meeting in meetings" :key="meeting.id">
          <time :datetime="meeting.content.date">
            <span class="day">{{ meeting.content.date | getDay }}</span>
            <span class="month">{{ getMonth(meeting.content.date) }}</span>
          </time>
          <p>
            <a v-if="meeting.content.url.url" :href="meeting.content.url.url" target="_blank" rel="nofollow noreferrer" class="event__name">{{
              meeting.content.name
            }}</a>
            <span v-else class="event__name">{{ meeting.content.name }}</span>
            <span>{{ $t('a') }} {{ meeting.content.city }}</span>
          </p>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import BaseHeading from '@/components/BaseHeading'

export default {
  components: { BaseHeading },
  filters: {
    getDay: value => {
      if (!value) return ''
      return new Date(Date.parse(value)).getDate()
    }
  },
  props: {
    preview: {
      type: Boolean,
      default: false
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
    let sbLocaleMulti = ''
    if (this.currentLocale.code !== this.$i18n.defaultLocale) {
      sbLocaleMulti = `${this.currentLocale.code}/`
    }

    const today = new Date().toISOString().split('T')[0]

    const meetings = await this.$storyapi
      .get(`cdn/stories?starts_with=${sbLocaleMulti}events/&filter_query[date][gt_date]=${today}&is_startpage=0`, {
        version: this.preview ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.stories.sort((a, b) => {
          return new Date(a.content.date) - new Date(b.content.date)
        })
      })
      .catch(e => {
        console.error(e)
        return []
      })

    this.meetings = meetings.filter(e => Date.parse(new Date(e.content.date).toDateString()) - Date.parse(new Date().toDateString()) >= 0)
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
        color: var(--color-main);
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
