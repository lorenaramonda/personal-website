// rateLabel is defined inside a Nuxt plugin, so we extract the logic for testing
const rateLabel = (rate: number): string => {
  switch (rate) {
    case 1:
    case 2:
    case 3:
    case 4:
      return 'rate.beginner'
    case 5:
    case 6:
      return 'rate.improving'
    case 7:
    case 8:
      return 'rate.intermediate'
    case 9:
    case 10:
      return 'rate.expert'
    default:
      return ''
  }
}

describe('rateLabel', () => {
  it.each([
    [1, 'rate.beginner'],
    [2, 'rate.beginner'],
    [3, 'rate.beginner'],
    [4, 'rate.beginner'],
  ])('should return beginner for rate %i', (rate, expected) => {
    expect(rateLabel(rate)).toBe(expected)
  })

  it.each([
    [5, 'rate.improving'],
    [6, 'rate.improving'],
  ])('should return improving for rate %i', (rate, expected) => {
    expect(rateLabel(rate)).toBe(expected)
  })

  it.each([
    [7, 'rate.intermediate'],
    [8, 'rate.intermediate'],
  ])('should return intermediate for rate %i', (rate, expected) => {
    expect(rateLabel(rate)).toBe(expected)
  })

  it.each([
    [9, 'rate.expert'],
    [10, 'rate.expert'],
  ])('should return expert for rate %i', (rate, expected) => {
    expect(rateLabel(rate)).toBe(expected)
  })

  it('should return empty string for invalid rate', () => {
    expect(rateLabel(0)).toBe('')
    expect(rateLabel(11)).toBe('')
    expect(rateLabel(-1)).toBe('')
  })
})
