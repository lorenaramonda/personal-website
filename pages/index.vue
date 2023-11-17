<template>
  <main v-editable="page">
    <div class="section row">
      <MySummary v-if="summary" v-editable="summary" :title="summary.title" :content="summary.content" />
    </div>

    <client-only>
      <BaseAgenda />
    </client-only>

    <div class="section row">
      <PostsList />
    </div>

    <div class="section section--column2 row">
      <JobsList :jobs="jobs.items" />
      <article id="study" class="p-education textfade">
        <BaseHeading>{{ $t('education.title') }}</BaseHeading>
        <ul>
          <li>
            <strong class="item__title">{{ $t('education.coursePost') }} {{ $t('education.coursePostTitle') }} (600 {{ $t('misc.hours') }})</strong>
            {{ $t('misc.at') }}
            <em itemscope itemtype="http://schema.org/Organization">
              <span itemprop="name">Azienda di Formazione Professionale</span>, <span itemprop="address">Cuneo</span> - 2002/2003
            </em>
          </li>
        </ul>

        <client-only>
          <NextMeeting />
        </client-only>

        <section>
          <h3 class="section__subtitle">{{ $t('education.subtitle') }}</h3>
          <ul>
            <li class="talk">
              <strong class="item__title">{{ $t('education.teacherOf', { course: $t('education.vueCourse') }) }}</strong>
              {{ $t('education.teacherFor') }}
              <em>
                <a href="https://www.apropos.srl/" target="_blank" rel="noopener">Apropos Srl</a>
              </em>
              {{ $t('education.teacherTo') }}
              <em> <a href="https://www.accenture.com/it-it" target="_blank" rel="noopener">Accenture</a> - 2020/2021 </em>
              <br />
              <span>
                {{ $t('education.material') }}:
                <a
                  href="https://docs.google.com/presentation/d/e/2PACX-1vQ5yQ_xGRtk2btkDdSv4i4NiRzK8AXI2NHTgddYrBhpQsWhEg5U1EksGPsUHJJwXrEpcAnPVY3gXgYu/pub?start=false&loop=false&delayms=3000"
                  target="_blank"
                  rel="noopener"
                >
                  {{ $t('education.vueCourseName') }}
                </a>
              </span>
            </li>
            <li v-for="talk in talks" :key="talk.id" class="talk">
              <strong class="item__title">{{ $t('education.speakerAt', { conf: talk.content.conference }) }}</strong>
              {{ $t('education.organizer') }}
              <em>
                <a :href="talk.content.organizer_site.url" target="_blank" rel="noopener">{{ talk.content.organizer }}</a>
                , {{ talk.content.venue }} - 2017
              </em>
              <br />
              <span>
                {{ $t('education.topic') }}:
                <a :href="talk.content.slides.url" target="_blank" rel="noopener">{{ talk.content.title }}</a>
              </span>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Vue.js Amsterdam</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://passionatepeople.io" target="_blank" rel="noopener">Passionate People</a>, Amsterdam - 2019 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} From the Front</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://www.fromthefront.it/" target="_blank" rel="noopener">From The Front</a>, Bologna - 2016 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Meet Magento Netherlands</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://www.dutchento.org/" target="_blank" rel="noopener">Dutchento</a>, Utrecht - 2016 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Mage Titans IT</strong>
              {{ $t('education.organizer') }}
              <em> <a href="http://www.bitbull.it" target="_blank" rel="noopener">Bitbull</a>, Milano - 2016 </em>
            </li>
          </ul>
        </section>
      </article>
    </div>

    <BaseQuote author="Albert Einstein">
      {{ $t('quote.einstein') }}
    </BaseQuote>

    <SkillsList v-if="skills" :skills="skills" />

    <BaseQuote>
      {{ $t('quote.anonymous') }}
    </BaseQuote>

    <div class="section section--column2 row">
      <article id="contributions">
        <BaseHeading>{{ $t('contributions.title') }}</BaseHeading>
        <ul>
          <li>
            <SvgIcon name="pen" class="icon--pen" />
            <a href="https://github.com/vuestorefront/storefront-ui" target="_blank">storefront-ui</a>
          </li>
          <li>
            <SvgIcon name="pen" class="icon--pen" />
            <a href="https://github.com/vuestorefront/vue-storefront" target="_blank">vue-storefront</a>
          </li>
        </ul>
      </article>
      <ProjectsList v-if="projects && projects.length > 0" :projects="projects" />
    </div>

    <BaseQuote author="Confucio">
      {{ $t('quote.confucio') }}
    </BaseQuote>

    <div class="section section--column2 row">
      <InsightsList v-if="insights" v-editable="insights" :title="insights.title" :list="insights.items" />
      <article v-if="languages" id="languages" v-editable="languages">
        <BaseHeading>{{ languages.title }}</BaseHeading>
        <ul class="graph">
          <li v-for="lang in languages.items" :key="lang.name" v-editable="lang">
            <BaseMeter :value="parseInt(lang.rate)" />
            <p>
              {{ lang.name }}
              <small v-if="lang.info">{{ lang.info }}</small>
            </p>
          </li>
        </ul>
      </article>
    </div>

    <HobbiesList v-if="hobbies" :hobbies="hobbies" class="row" />
  </main>
</template>

<script setup>
import MySummary from '@/components/Profile/MySummary'
import PostsList from '@/components/Publications/PostsList'
import JobsList from '@/components/Experience/JobsList'
import InsightsList from '@/components/Education/InsightsList'
import SkillsList from '@/components/SkillsList'
import HobbiesList from '@/components/HobbiesList'
import BaseQuote from '@/components/BaseQuote'
import ProjectsList from '@/components/ProjectsList'
import NextMeeting from '@/components/NextMeeting'
import BaseAgenda from '@/components/BaseAgenda'
import BaseMeter from '@/components/BaseMeter'
import BaseHeading from '@/components/BaseHeading'

const metadata = {
  meta: [],
}

const storyblokApi = useStoryblokApi()

const config = useRuntimeConfig()
const sbOptions = config.public.storyblok.apiOptions

const { locale, locales } = useI18n()

const currentLocale = locales.value.find(lang => lang.code === locale.value)

// Doc: https://github.com/storyblok/storyblok-js-client/blob/00f817d5ebd1f6644d4a2eae2669959f6a65e67b/src/interfaces.ts#L3
const storiesParams = {
  ...sbOptions,
  language: currentLocale.code,
}

/**
 * Get homepage
 */
const homeStory = await useAsyncStoryblok('onepage', storiesParams).catch(() => {})

const talks = await storyblokApi
  .get('cdn/stories', {
    ...storiesParams,
    is_startpage: 0,
    starts_with: 'talks/',
  })
  .then(response => response.data.stories ?? [])

const projects = await storyblokApi
  .get('cdn/stories', {
    ...storiesParams,
    is_startpage: 0,
    starts_with: 'projects/',
  })
  .then(response => response.data.stories ?? [])

const page = computed(() => {
  return homeStory.value?.content || {}
})

const summary = computed(() => {
  const blok = getBlok('summary')
  if (!blok) return null
  return blok
})

const skills = computed(() => {
  const blok = getBlok('skills')
  if (!blok) return null
  return blok
})

const hobbies = computed(() => {
  const blok = getBlok('hobbies')
  if (!blok) return null
  return blok
})

const insights = computed(() => {
  const blok = getBlok('insights')
  if (!blok) return null
  return blok
})

const languages = computed(() => {
  const blok = getBlok('languages')
  if (!blok) return null
  return blok
})

const jobs = computed(() => {
  const blok = getBlok('jobs')
  if (!blok) return null
  return blok
})

function getBlok(name) {
  return page.value?.body?.find(blok => blok.component === name)
}

onMounted(() => {
  useStoryblokBridge(page.value.id, updatedStory => (page.value = updatedStory))
})

if (page.value && page.value.meta_title) metadata.title = page.value.meta_title

if (page.value && page.value.meta_description) {
  metadata.meta.push({
    name: 'description',
    content: page.value.meta_description,
  })
}

if (page.value && page.value.meta_keywords) {
  metadata.meta.push({
    name: 'keywords',
    content: page.value.meta_keywords,
  })
}

useHead(metadata)
</script>

<style lang="scss">
.graph li {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 0.9em;

  p {
    margin: 0 1.5em 0 0;
    font-size: 1em;
  }

  small {
    display: block;
    color: lighten($color-text, 20%);
    line-height: 2;
    font-size: 0.8em;
  }
}

.icon--pen {
  width: 16px;
  height: 16px;
  fill: var(--color-main);
  vertical-align: middle;
  margin-right: 0.5rem;
  display: inline-block;
}
</style>
