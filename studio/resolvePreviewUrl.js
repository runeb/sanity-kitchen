const env = process.env.NODE_ENV || 'development'

export default function resolvePreviewUrl(document) {
  const baseUrl = 'http://35.232.249.122'
  switch (document._type) {
    case 'route':
      return `${baseUrl}/${document.slug.current}`
    case 'post':
      return `${baseUrl}/blog/${document.slug.current}`
    case 'siteSettings':
      return baseUrl
    case 'page':
      if (document._id === 'frontpage') {
        return baseUrl
      }
    default:
      return null
  }
}