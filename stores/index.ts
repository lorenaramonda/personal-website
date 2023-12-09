import { getDurationInYears } from '~/helpers'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'
import type { StoryblokComponent, StoryblokSpace, StoryblokStory } from '~/types'

type Job = StoryblokComponent & { is_remote: boolean; end_date?: string; job_title: string; start_date: string }

type State = {
  space: StoryblokSpace
  jobs: Job[]
}

export const useStore = defineStore('store', {
  state: (): State => {
    return {
      space: {},
      jobs: [],
    }
  },
  getters: {
    spaceLanguages: (state) => {
      const defaultLocale = ['it']
      return state.space?.language_codes ? [defaultLocale].concat(state.space?.language_codes).flat() : defaultLocale
    },
    lastJobTitle: (state) => state.jobs.find((item) => !item.end_date)?.job_title ?? '',
    careerBeginning: (state) => state.jobs.slice().reverse()[0]?.start_date ?? '',
    remoteBeginning: (state) => {
      return (
        state.jobs
          .slice()
          .reverse()
          .find((item) => item.is_remote)?.start_date ?? ''
      )
    },
    yearsOfExperience() {
      const exactYears = getDurationInYears(this.careerBeginning)
      const multipleOf5 = exactYears % 5
      const sign = multipleOf5 ? '+' : ''
      return `${exactYears - multipleOf5}${sign}`
    },
    yearsOfRemote() {
      return getDurationInYears(this.remoteBeginning)
    },
  },
  actions: {
    async fetchSpace() {
      const storyblokApi = useStoryblokApi()

      const { getParams } = useLocalizedStoryParams()

      this.space = await storyblokApi
        .get(`cdn/spaces/me/`, {
          ...getParams(),
          token: process.env.STORYBLOK_TOKEN,
        })
        .then((response) => response.data.space)
    },
    async fetchJobs() {
      const storyblokApi = useStoryblokApi()

      const { getParams } = useLocalizedStoryParams()

      this.jobs = await storyblokApi
        .get(`cdn/stories`, {
          ...getParams(),
          is_startpage: false,
          starts_with: 'experiences/',
          sort_by: 'content.start_date:desc',
        })
        .then((response) => response.data.stories.map((item: StoryblokStory) => item.content) ?? [])
    },
  },
})
