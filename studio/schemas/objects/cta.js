export default {
  title: 'Call to action',
  name: 'cta',
  type: 'object',
  fieldsets: [
    {
      title: 'Link',
      name: 'link'
    }
  ],
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string'
    },
    {
      title: 'Internal link',
      name: 'internalLink',
      type: 'reference',
      fieldset: 'link',
      to: [{ type: 'route' }, { type: 'post' }]
    },
    {
      title: 'External link',
      name: 'link',
      type: 'string',
      fieldset: 'link'
    },
    {
      title: 'Kind',
      name: 'kind',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['button', 'link']
      }
    },
    {
      title: 'Size',
      name: 'size',
      type: 'string',
      options: {
        layout: 'radio',
        list: ['big', 'large', 'default', 'small']
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      route: 'route.slug.current',
      link: 'link'
    },
    prepare({ title, route, link }) {
      return {
        title,
        subtitle: route ? `Route: /${route}/` : link ? `External link: ${link}` : 'Not set'
      }
    }
  }
}
