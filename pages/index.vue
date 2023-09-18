<template>
  <main v-editable="page">
    <div class="section row">
      <MySummary v-if="summary" v-editable="summary" :title="summary.title" :content="summary.content" />
    </div>

    <client-only>
      <BaseAgenda :preview="preview" />
    </client-only>

    <div class="section row">
      <PostsList :preview="preview" />
    </div>

    <div class="section section--column2 row">
      <JobsList :jobs="jobs" :preview="preview" />
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
          <NextMeeting :preview="preview" />
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
              <strong class="item__title">{{ $t('education.speakerAt', { conf: talk.content.conference }) }}</strong>
              {{ $t('education.organizer') }}
              <em>
                <a :href="talk.content.organizer_site.url" target="_blank" rel="noreferrer">{{ talk.content.organizer }}</a>
                , {{ talk.content.venue }} - 2017
              </em>
              <br />
              <span>
                {{ $t('education.topic') }}:
                <a :href="talk.content.slides.url" target="_blank" rel="noreferrer">{{ talk.content.title }}</a>
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
            <svg-icon name="pen" class="icon--pen" />
            <a href="https://github.com/vuestorefront/storefront-ui" target="_blank">storefront-ui</a>
          </li>
          <li>
            <svg-icon name="pen" class="icon--pen" />
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

<script>
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

export default {
  name: 'HomePage',
  components: {
    MySummary,
    PostsList,
    JobsList,
    SkillsList,
    HobbiesList,
    BaseQuote,
    InsightsList,
    ProjectsList,
    NextMeeting,
    BaseAgenda,
    BaseMeter,
    BaseHeading
  },
  async asyncData({ $storyapi, error, app, isDev }) {
    const currentLocale = app.i18n.locales.find(lang => lang.code === app.i18n.locale)
    let sbLocaleSingle = ''
    let sbLocaleMulti = ''
    if (currentLocale.code !== app.i18n.defaultLocale) {
      sbLocaleSingle = `?language=${currentLocale.code}`
      sbLocaleMulti = `${currentLocale.code}/`
    }

    /**
     * Get homepage
     */
    const story = await $storyapi
      .get(`cdn/stories/home/${sbLocaleSingle}`, {
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
    const talks = await $storyapi
      .get(`cdn/stories?starts_with=${sbLocaleMulti}talks/&is_startpage=0`, {
        version: isDev ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.stories
      })
      .catch(res => {
        return null
      })

    /**
     * Get projects
     */
    const projects = await $storyapi
      .get(`cdn/stories?starts_with=${sbLocaleMulti}projects/&is_startpage=0`, {
        version: isDev ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.stories
      })
      .catch(res => {
        return null
      })

    if (story) {
      return {
        page: story.content,
        talks,
        projects,
        preview: isDev
      }
    } else {
      error({ statusCode: 404, message: 'Page not found' })
    }
  },
  data: () => ({
    page: null,
    talks: null,
    projects: null,
    preview: false
  }),
  computed: {
    summary() {
      const summary = this.getBlok('summary')
      if (!summary) return null
      return summary
    },
    skills() {
      const skills = this.getBlok('skills')
      if (!skills) return null
      return skills
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
    },
    languages() {
      const languages = this.getBlok('languages')
      if (!languages) return null
      return languages
    },
    jobs() {
      const jobs = this.getBlok('jobs')
      if (!jobs) return null
      return jobs.items
    }
  },

  mounted() {
    this.$storybridge(
      () => {
        // eslint-disable-next-line no-undef
        const storyblokInstance = new StoryblokBridge()

        storyblokInstance.on(['input', 'published', 'change'], event => {
          if (event.action === 'input') {
            if (event.story.slug === 'home') {
              this.page = event.story.content
            }
          } else {
            this.$nuxt.$router.go({
              path: this.$nuxt.$router.currentRoute,
              force: true
            })
          }
        })
      },
      error => {
        // eslint-disable-next-line no-console
        console.warn(error)
      }
    )
  },
  methods: {
    getBlok(name) {
      if (!this.page || this.page.body.length === 0) return null
      return this.page.body.find(blok => blok.component === name)
    }
  },
  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      htmlAttrs: {
        ...i18nHead.htmlAttrs
      },
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
      ],
      link: [...i18nHead.link]
    }
  }
}
</script>

<style lang="scss">
.graph li {
  display: flex;
  justify-content: space-between;
  flex-direction: row-reverse;
  margin-bottom: 0.9em;
  span {
    float: right;
    background-color: var(--color-main);
    color: var(--color-bg);
    border-radius: 10px;
    padding: 0 0.5em;
    font-weight: bold;
  }

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
