import { mount } from '@vue/test-utils'
import BaseLogo from '~/components/BaseLogo.vue'

describe('BaseLogo', () => {
  it('should render the logo', () => {
    const wrapper = mount(BaseLogo, {
      mocks: {
        $t: value => value
      }
    })
    expect(wrapper.text()).toBe('Lorena Ramonda job.title')
  })
})
