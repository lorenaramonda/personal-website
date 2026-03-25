import { getDatesDiff, getDurationInYears, getDurationInMonth } from '~/helpers'

describe('getDatesDiff', () => {
  it('should return 0 for empty startDate', () => {
    expect(getDatesDiff({ startDate: '' })).toBe(0)
  })

  it('should calculate diff in milliseconds between two dates', () => {
    const result = getDatesDiff({ startDate: '2020-01-01', endDate: '2021-01-01' })
    const expectedMs = Date.parse('2021-01-01') - Date.parse('2020-01-01')
    expect(result).toBe(expectedMs)
  })

  it('should apply dividend correctly', () => {
    const result = getDatesDiff({ startDate: '2020-01-01', endDate: '2021-01-01', dividend: 1000 })
    const expectedMs = Date.parse('2021-01-01') - Date.parse('2020-01-01')
    expect(result).toBe(Math.floor(expectedMs / 1000))
  })
})

describe('getDurationInYears', () => {
  it('should return correct number of years between two dates', () => {
    expect(getDurationInYears('2020-01-01', '2025-01-01')).toBe(5)
  })

  it('should return 0 for dates less than a year apart', () => {
    expect(getDurationInYears('2024-06-01', '2025-01-01')).toBe(0)
  })

  it('should return 0 for empty startDate', () => {
    expect(getDurationInYears('')).toBe(0)
  })
})

describe('getDurationInMonth', () => {
  it('should return correct number of months between two dates', () => {
    expect(getDurationInMonth('2025-06-01', '2025-01-01')).toBe(4)
  })

  it('should return 0 for empty startDate', () => {
    expect(getDurationInMonth('2025-01-01', '')).toBe(0)
  })
})
