const today = new Date()
const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25
const millisecondsPerMonth = millisecondsPerYear / 12

export const getDatesDiff = ({ startDate, endDate = '', dividend = 1 }: { startDate: string; endDate?: string; dividend?: number }) => {
  if (!startDate) return 0
  const parsedEndDate = endDate ? Date.parse(endDate.split(' ')[0]) : Date.parse(today.toString())
  return Math.floor((parsedEndDate - Date.parse(startDate.split(' ')[0])) / dividend)
}

export const getDurationInYears = (startDate: string, endDate: string = '') => {
  return getDatesDiff({
    startDate,
    endDate,
    dividend: millisecondsPerYear,
  })
}

export const getDurationInMonth = (endDate: string, startDate: string) => {
  return getDatesDiff({
    startDate,
    endDate,
    dividend: millisecondsPerMonth,
  })
}
