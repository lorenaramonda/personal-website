import { mount } from '@vue/test-utils'
import TheCopyrights from '~/components/TheCopyrights.vue'

describe('TheCopyrights', () => {
  it('should render the the copyrigths', () => {
    const wrapper = mount(TheCopyrights)
    expect(wrapper.text()).toBe('2023 . lorena.ramonda.meistherocket.dev')
  })
})
