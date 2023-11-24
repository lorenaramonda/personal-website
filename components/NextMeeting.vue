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
      <a v-if="meeting.url?.url" :href="meeting.url.url" target="_blank" itemprop="url" rel="nofollow noopener">
        <strong itemprop="name">{{ meeting.name }}</strong>
      </a>
      <strong v-else itemprop="name">{{ meeting.name }}</strong>
    </p>
    <SvgIcon name="coffee" />
  </section>
</template>

<script setup>
const { localeProperties: currentLocale } = useI18n()

const config = useRuntimeConfig()
const sbOptions = config.public.storyblok.apiOptions

const today = new Date()
const parsedToday = today.toISOString().split('T')[0]

const storiesParams = {
  ...sbOptions,
  starts_with: 'events/',
  filter_query: {
    date: {
      like: `${parsedToday}*`,
    },
  },
  is_startpage: false,
  language: currentLocale.value.code,
}

const storyblokApi = useStoryblokApi()

const { data: meetingsStories } = await useAsyncData(async () => await storyblokApi.get(`cdn/stories`, storiesParams), {
  transform: (value) =>
    value.data.stories.sort((a, b) => {
      return new Date(a.content.date) - new Date(b.content.date)
    }),
})

const meeting = computed(() => {
  return meetingsStories.value ? meetingsStories.value[0]?.content : null
})

const isTodayConf = computed(() => {
  return new Date(meeting.value.date).toDateString() === new Date().toDateString()
})
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
