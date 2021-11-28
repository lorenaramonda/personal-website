<template>
  <main v-editable="home">
    <div class="section row">
      <v-summary v-if="summary" v-editable="summary" :title="summary.title" :content="summary.content" />
    </div>

    <client-only>
      <v-agenda />
    </client-only>

    <div class="section row">
      <v-posts :preview="preview" />
    </div>

    <div class="section row">
      <v-jobs :preview="preview" />
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
            <li class="talk">
              <strong class="item__title">{{ $t('education.teacherOf', { course: $t('education.vueCourse') }) }}</strong>
              {{ $t('education.teacherFor') }}
              <em>
                <a href="https://www.apropos.srl/" target="_blank" rel="noreferrer">Apropos Srl</a>
              </em>
              {{ $t('education.teacherTo') }}
              <em> <a href="https://www.accenture.com/it-it" target="_blank" rel="noreferrer">Accenture</a> - 2020/2021 </em>
              <br />
              <span>
                {{ $t('education.material') }}:
                <a
                  href="https://docs.google.com/presentation/d/e/2PACX-1vQ5yQ_xGRtk2btkDdSv4i4NiRzK8AXI2NHTgddYrBhpQsWhEg5U1EksGPsUHJJwXrEpcAnPVY3gXgYu/pub?start=false&loop=false&delayms=3000"
                  target="_blank"
                  rel="noreferrer"
                >
                  {{ $t('education.vueCourseName') }}
                </a>
              </span>
            </li>
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
      <article id="contributions" class="medium-6 column">
        <h2 class="section__title">{{ $t('contributions.title') }}</h2>
        <ul>
          <li>
            <svg-icon name="pen" class="icon--pen" />
            <a href="https://github.com/vuestorefront/storefront-ui" target="_blank">storefront-ui</a>
          </li>
          <li>
            <svg-icon name="pen" class="icon--pen" />
            <a href="https://github.com/vuestorefront/vue-storefront" target="_blank">vue-storefront</a>
          </li>
        </ul>
      </article>
      <v-projects v-if="projects && projects.length > 0" :projects="projects" />
    </div>

    <v-quote author="Confucio">
      {{ $t('quote.confucio') }}
    </v-quote>

    <div class="section row">
      <v-insights v-if="insights" v-editable="insights" :title="insights.title" :list="insights.items" />
      <article v-if="languages" id="languages" v-editable="languages" class="medium-6 column">
        <h2 class="section__title">{{ languages.title }}</h2>
        <ul class="graph">
          <li v-for="lang in languages.items" :key="lang.name" v-editable="lang">
            <v-meter :value="parseInt(lang.rate)" />
            {{ lang.name }}
            <small v-if="lang.info">{{ lang.info }}</small>
          </li>
        </ul>
      </article>
    </div>

    <div v-if="hobbies" id="hobbies" v-editable="hobbies" class="section row hobbies">
      <div class="column">
        <h2 class="section__title section__title--minor">{{ hobbies.title }}</h2>
        <ul>
          <li v-for="hobby in hobbies.items" :key="hobby.name" v-editable="hobby">
            <img v-if="hobby.icon" v-tooltip="hobby.name" :src="hobby.icon.filename" :title="hobby.name" alt="" />
          </li>
        </ul>
      </div>
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
  async asyncData({ $prismic, $storyapi, error, app, isDev }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)
    const apiLocale = currentLocale.code === app.i18n.defaultLocale ? '' : `?language=${currentLocale.code}`

    /**
     * Get homepage
     */
    const story = await $storyapi
      .get(`cdn/stories/home/${apiLocale}`, {
        version: isDev ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.story
      })
      .catch(res => {
        return null
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

    if (story) {
      return {
        home: story.content,
        talks: talks ? talks.results || talks : {},
        projects: projects ? projects.results || projects : {},
        skills: skills ? skills.data || skills : {},
        preview: isDev
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    home: null,
    talks: null,
    projects: null,
    skills: null,
    preview: false
  }),
  computed: {
    languages() {
      const languages = this.getBlok('languages')
      if (!languages) return null
      return languages
    },
    summary() {
      const summary = this.getBlok('summary')
      if (!summary) return null
      return summary
    },
    hobbies() {
      const hobbies = this.getBlok('hobbies')
      if (!hobbies) return null
      return hobbies
    },
    insights() {
      const insights = this.getBlok('insights')
      if (!insights) return null
      return insights
    }
  },
  methods: {
    getBlok(name) {
      if (!this.home || this.home.body.length === 0) return null
      return this.home.body.find(blok => blok.component === name)
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
