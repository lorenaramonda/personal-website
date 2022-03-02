<template>
  <article id="work" class="medium-6 column p-experience textfade" data-readmore="Mostra di più">
    <h2 class="section__title">{{ $t('jobs.title') }}</h2>
    <dl v-if="jobs && jobs.length > 0">
      <job v-for="(job, index) in jobs" :key="index" v-editable="job" :blok="job" />
    </dl>
    <p v-else>{{ $t('jobs.notFound') }}</p>
  </article>
</template>

<script>
import Job from './Job'

export default {
  components: {
    job: Job
  },
  props: {
    preview: {
      type: Boolean,
      default: false
    }
  },
  async fetch() {
    const currentLocale = this.$i18n.locales.find(lang => lang.code === this.$i18n.locale)
    const apiLocale = currentLocale.code === this.$i18n.defaultLocale ? '' : `?language=${currentLocale.code}`
    /**
     * Get jobs
     */
    const story = await this.$storyapi
      .get(`cdn/stories/career${apiLocale}`, {
        version: this.preview ? 'draft' : 'published'
      })
      .then(res => {
        return res.data.story
      })
      .catch(res => {
        return null
      })
    this.story = story
  },
  data: () => ({
    story: null
  }),
  computed: {
    jobs() {
      return this.story ? this.story.content.body : []
    }
  },
  mounted() {
    this.$storybridge(
      () => {
        // eslint-disable-next-line no-undef
        const storyblokInstance = new StoryblokBridge()

        storyblokInstance.on(['input', 'published', 'change'], event => {
          if (event.action === 'input') {
            if (event.story.id === this.story.id) {
              this.story.content = event.story.content
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
  }
}
</script>

<style></style>
