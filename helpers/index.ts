const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
const millisecondsPerMonth = millisecondsPerYear / 12

export const getDurationInYears = (endDate: string, startDate: string) => {
  const parsedEndDate = endDate ? new Date(endDate) : new Date()
  return Math.floor((parsedEndDate - new Date(startDate)) / millisecondsPerYear)
}

export const getDurationInMonth = (endDate: string, startDate: string) => {
  const parsedEndDate = endDate ? new Date(endDate) : new Date()
  return Math.floor((parsedEndDate - new Date(startDate)) / millisecondsPerMonth)
}
