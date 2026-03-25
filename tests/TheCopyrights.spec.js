import { mount } from '@vue/test-utils'
import TheCopyrights from '~/components/TheCopyrights.vue'

describe('TheCopyrights', () => {
  it('should render the copyrights with correct links', () => {
    const wrapper = mount(TheCopyrights, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
        directives: {
          tooltip: () => {},
        },
      },
    })
    expect(wrapper.find('.copyrights').exists()).toBe(true)
    expect(wrapper.find('a[href="https://lorena.ramonda.me/"]').text()).toBe('lorena.ramonda.me')
    expect(wrapper.find('a[href="https://therocket.dev/"]').text()).toBe('therocket.dev')
  })

  it('should have role="contentinfo"', () => {
    const wrapper = mount(TheCopyrights, {
      global: {
        mocks: {
          $t: (msg) => msg,
        },
        directives: {
          tooltip: () => {},
        },
      },
    })
    expect(wrapper.find('[role="contentinfo"]').exists()).toBe(true)
  })
})
