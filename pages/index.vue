<template>
  <main>
    <div class="section row">
      <v-summary v-if="page" :title="page.summary_title" :content="page.summary_content" />
    </div>

    <client-only>
      <v-agenda />
    </client-only>

    <div v-if="posts" class="section row">
      <v-posts v-if="posts && posts.length > 0" :posts="posts" />
    </div>

    <div class="section row">
      <v-jobs v-if="jobs && jobs.length > 0" :jobs="jobs" />
      <article id="study" :data-readmore="$t('misc.showMore')" class="medium-6 column p-education textfade">
        <h2 class="section__title">{{ $t('education.title') }}</h2>
        <ul>
          <li>
            <img
              v-lazy-load
              data-src="~/assets/images/frontend_developer_certification.png"
              src="/images/default-image.jpg"
              :alt="$t('education.magento.logoTitle')"
              width="128"
              height="228"
            />
            <strong class="item__title">
              <a
                :title="$t('education.magento.linkTitle')"
                href="http://www.magentocommerce.com/certification/directory/dev/1776391/"
                target="_blank"
                rel="noreferrer"
                >{{ $t('education.magento.title') }}</a
              >
            </strong>
            {{ $t('misc.at') }}
            <em itemscope itemtype="http://schema.org/Organization">
              <span itemprop="name">
                <a href="http://www.magentocommerce.com/" target="_blank" title="Magento Inc." rel="noreferrer">Magento Inc.</a> </span
              >, <span itemprop="address">Campbell, CA, USA</span> - 2015
            </em>
          </li>
          <li>
            <strong class="item__title">{{ $t('education.coursePost') }} {{ $t('education.coursePostTitle') }} (600 {{ $t('misc.hours') }})</strong>
            {{ $t('misc.at') }}
            <em itemscope itemtype="http://schema.org/Organization">
              <span itemprop="name">Azienda di Formazione Professionale</span>, <span itemprop="address">Cuneo</span> - 2002/2003
            </em>
          </li>
        </ul>

        <client-only>
          <v-next-meeting />
        </client-only>

        <section>
          <h3 class="section__subtitle">{{ $t('education.subtitle') }}</h3>
          <ul>
            <li v-for="talk in talks" :key="talk.id" class="talk">
              <strong class="item__title">{{ $t('education.speakerAt', { conf: talk.data.conference }) }}</strong>
              {{ $t('education.organizer') }}
              <em>
                <a :href="talk.data.organizer_site.url" :target="talk.data.organizer_site.target" rel="noreferrer">{{
                  talk.data.organizer[0].text
                }}</a>
                , {{ talk.data.venue }} - 2017
              </em>
              <br />
              <span>
                {{ $t('education.topic') }}:
                <a :href="talk.data.slide.url" :target="talk.data.slide.target" rel="noreferrer">{{ talk.data.title[0].text }}</a>
              </span>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Vue.js Amsterdam</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://passionatepeople.io" target="_blank" rel="noreferrer">Passionate People</a>, Amsterdam - 2019 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} From the Front</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://www.fromthefront.it/" target="_blank" rel="noreferrer">From The Front</a>, Bologna - 2016 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Meet Magento Netherlands</strong>
              {{ $t('education.organizer') }}
              <em> <a href="https://www.dutchento.org/" target="_blank" rel="noreferrer">Dutchento</a>, Utrecht - 2016 </em>
            </li>
            <li>
              <strong class="item__title">{{ $t('education.conference') }} Mage Titans IT</strong>
              {{ $t('education.organizer') }}
              <em> <a href="http://www.bitbull.it" target="_blank" rel="noreferrer">Bitbull</a>, Milano - 2016 </em>
            </li>
          </ul>
        </section>
      </article>
    </div>

    <v-quote author="Albert Einstein">
      {{ $t('quote.einstein') }}
    </v-quote>

    <v-skills v-if="skills" :skills="skills" />

    <v-quote>
      {{ $t('quote.anonymous') }}
    </v-quote>

    <div class="section row">
      <article v-if="languages" id="languages" class="medium-6 column">
        <h2 class="section__title">{{ languages.title[0].text }}</h2>
        <ul class="graph">
          <li v-for="lang in languages.items" :key="lang.name">
            <v-meter :value="lang.rate" />
            {{ lang.name }}
            <small v-if="lang.info">{{ lang.info }}</small>
          </li>
        </ul>
      </article>
      <article v-if="hobbies" id="hobbies" class="medium-6 column">
        <h2 class="section__title">{{ hobbies.title[0].text }}</h2>
        <ul class="hobbies">
          <li v-for="hobby in hobbies.items" :key="hobby.name">{{ hobby.name }}</li>
        </ul>
      </article>
    </div>

    <v-quote author="Confucio">
      {{ $t('quote.confucio') }}
    </v-quote>

    <div class="section row">
      <v-insights v-if="insights" :title="insights.title" :list="insights.items" />
      <v-projects v-if="projects && projects.length > 0" :projects="projects" />
    </div>
  </main>
</template>

<script>
import Summary from '@/components/Profile/Summary'
import Posts from '@/components/Publications/Posts'
import Jobs from '@/components/Experience/Jobs'
import Insights from '@/components/Education/Insights'
import Skills from '@/components/Skills'
import Quote from '@/components/Quote'
import Projects from '@/components/Projects'
import NextMeeting from '@/components/NextMeeting'
import Agenda from '@/components/Agenda'
import Meter from '@/components/Meter'

export default {
  components: {
    'v-summary': Summary,
    'v-posts': Posts,
    'v-jobs': Jobs,
    'v-skills': Skills,
    'v-quote': Quote,
    'v-insights': Insights,
    'v-projects': Projects,
    'v-next-meeting': NextMeeting,
    'v-agenda': Agenda,
    'v-meter': Meter
  },
  async asyncData({ $prismic, error, app }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)
    // Doc: https://prismic.io/docs/javascript/query-the-api/query-a-single-type-document

    /**
     * Get homepage
     */
    const home = await $prismic.api.getSingle('homepage', {
      lang: currentLocale.iso.toLowerCase()
    })

    /**
     * Get posts
     */
    const posts = await $prismic.api.query([$prismic.predicates.at('document.type', 'post')], {
      orderings: '[my.post.pubblication_date desc]',
      lang: currentLocale.iso.toLowerCase()
    })

    /**
     * Get jobs
     */
    const jobs = await $prismic.api.query([$prismic.predicates.at('document.type', 'job'), $prismic.predicates.at(`my.job.public`, true)], {
      orderings: '[my.job.start_date desc]',
      lang: currentLocale.iso.toLowerCase()
    })

    /**
     * Get talks
     */
    const talks = await $prismic.api.query($prismic.predicates.at('document.type', 'talk'), {
      orderings: '[my.talks.date desc]',
      lang: currentLocale.iso.toLowerCase()
    })

    /**
     * Get projects
     */
    const projects = await $prismic.api.query($prismic.predicates.at('document.type', 'project'), {
      orderings: '[document.first_publication_date desc]',
      lang: currentLocale.iso.toLowerCase()
    })

    /**
     * Get skills
     */
    const skills = await $prismic.api.getSingle('skills')

    if (home) {
      return {
        page: home.data || home,
        posts: posts ? posts.results || posts : [],
        jobs: jobs ? jobs.results || jobs : [],
        talks: talks ? talks.results || talks : {},
        projects: projects ? projects.results || projects : {},
        skills: skills ? skills.data || skills : {}
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    page: null,
    jobs: null,
    talks: null,
    projects: null,
    skills: null
  }),
  computed: {
    languages() {
      const languages = this.getSlice('languages')
      if (!languages) return null
      return {
        title: languages.primary.title,
        items: languages.items
      }
    },
    hobbies() {
      const hobbies = this.getSlice('hobbies')
      if (!hobbies) return null
      return {
        title: hobbies.primary.title,
        items: hobbies.items
      }
    },
    insights() {
      const insights = this.getSlice('insights')
      if (!insights) return null
      return {
        title: insights.primary.title,
        items: insights.items
      }
    }
  },
  methods: {
    getSlice(name) {
      if (!this.page) return null
      return this.page.body.find(e => e.slice_type === name)
    }
  },
  head() {
    return {
      title: this.page && this.page.meta_title ? this.page.meta_title : 'Lorena Ramonda - Front End Developer, Cuneo Italia',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.page && this.page.meta_description ? this.page.meta_description : ''
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.page && this.page.meta_keywords ? this.page.meta_keywords : ''
        }
      ]
    }
  }
}
</script>

<style></style>
