export default function (doc) {
  if (doc.type === 'post') return `/${doc.lang.substring(0, 2)}/publication/${doc.uid}`

  return '/'
}
