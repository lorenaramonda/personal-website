export const getDate = (date: string, iso: string = 'it', options?: Intl.DateTimeFormatOptions) => {
  if (!date) {
    return date
  }
  const dateFormat = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  } as Intl.DateTimeFormatOptions
  if (options?.weekday === undefined) {
    delete dateFormat.weekday
  }
  return new Date(date).toLocaleDateString(iso, dateFormat)
}
