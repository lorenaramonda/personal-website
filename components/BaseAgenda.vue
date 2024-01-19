<template>
  <div v-if="meetings.length > 0" class="section row">
    <article class="agenda">
      <BaseHeading>{{ $t('agenda.title') }}</BaseHeading>
      <p>{{ $t('nextEvents.title') }}</p>
      <ul class="meetings">
        <li v-for="meeting in meetings" :key="meeting.id">
          <time :datetime="meeting.content.date">
            <span class="day">{{ getDay(meeting.content.date) }}</span>
            <span class="month">{{ getMonth(meeting.content.date) }}</span>
          </time>
          <p>
            <a v-if="meeting.content.url.url" :href="meeting.content.url.url" target="_blank" rel="nofollow noopener" class="event__name">
              {{ meeting.content.name }}
            </a>
            <span v-else class="event__name">{{ meeting.content.name }}</span>
            <span>{{ $t('nextEvents.at') }} {{ meeting.content.city }}</span>
          </p>
        </li>
      </ul>
    </article>
  </div>
</template>

<script setup>
import BaseHeading from '@/components/BaseHeading'

const { localeProperties: currentLocale } = useI18n()
const storyblokApi = useStoryblokApi()

const config = useRuntimeConfig()
const sbOptions = config.public.storyblok.apiOptions

const today = new Date().toISOString().split('T')[0]

const storiesParams = {
  ...sbOptions,
  starts_with: 'events/',
  filter_query: {
    date: {
      gt_date: today,
    },
  },
  is_startpage: false,
  language: currentLocale.value.code,
}

function getDay(value) {
  if (!value) return 0
  return new Date(Date.parse(value)).getDate()
}

function getMonth(date) {
  if (!date) return date
  return new Date(date.split(' ')[0]).toLocaleDateString(currentLocale.value.iso, {
    month: 'short',
  })
}

const { data: meetingsStories } = await useAsyncData(async () => await storyblokApi.get(`cdn/stories`, storiesParams), {
  transform: (value) =>
    value.data.stories.sort((a, b) => {
      return new Date(a.content.date.split(' ')[0]) - new Date(b.content.date.split(' ')[0])
    }),
})

const meetings = computed(() => {
  return meetingsStories.value || []
})
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
      border-right: solid 2px var(--color-text);
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
