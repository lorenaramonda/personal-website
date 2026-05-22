export const getURLDomain = (url: string) => {
  return new URL(url).hostname.replace('www.', '')
}
