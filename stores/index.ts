import type { ISbStoriesParams } from 'storyblok-js-client'

import { getDurationInYears } from '~/helpers'
import { useLocalizedStoryParams } from '@/composables/useLocalizedStoryParams'

export const useStore = defineStore('store', {
  state: () => {
    return {
      jobs: [],
    }
  },
  getters: {
    lastJobTitle: (state) => state.jobs.find((item) => !item.end_date)?.job_title,
    careerBeginning: (state) => state.jobs.slice().reverse()[0].start_date,
    remoteBeginning: (state) =>
      state.jobs
        .slice()
        .reverse()
        .find((item) => item.is_remote).start_date,
    yearsOfExperience: (state) => {
      const today = new Date()
      const exactYears = getDurationInYears(today, state.careerBeginning)
      const multipleOf5 = exactYears % 5
      const sign = multipleOf5 ? '+' : ''
      return `${exactYears - multipleOf5}${sign}`
    },
    yearsOfRemote: (state) => {
      const today = new Date()
      return getDurationInYears(today, state.remoteBeginning)
    },
  },
  actions: {
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
        .then((response) => response.data.stories.map((item) => item.content) ?? [])
    },
  },
})
