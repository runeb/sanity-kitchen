import { MdLink } from 'react-icons/lib/md'

export default {
  name: 'route',
  type: 'document',
  title: 'Route',
  liveEdit: false,
  icon: MdLink,
  fieldsets: [
    {
      title: 'Visibility',
      name: 'visibility'
    }
  ],
  fields: [
    {
      name: 'title',
      type: 'string',
      description: 'This title populates meta-tags on the webpage'
    },
    {
      name: 'description',
      type: 'text',
      description: 'This description populates meta-tags on the webpage'
    },
    {
      name: 'slug',
      type: 'slug'
    },
    // https://www.sanity.io/docs/schema-types/reference-type
    {
      title: 'Navigation menu',
      name: 'navMenu',
      type: 'reference',
      weak: false,
      to: [{ type: 'navigationMenu' }],
      description: 'Which nav menu should be shown, if any'
    },
    {
      name: 'queries',
      type: 'array',
      description: 'Search queries to match',
      of: [
        {
          type: 'string'
        }
      ]
    },
    {
      name: 'campaign',
      type: 'string',
      title: 'Campaign',
      description: 'UTM for campaings'
    },
    {
      name: 'page',
      type: 'reference',
      to: [
        {
          type: 'page'
        }
      ]
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      type: 'openGraph'
    },
    /*
    {
      name: 'experiment',
      type: 'object',
      fields: [
        {
          name: 'active',
          type: 'boolean',
          title: 'Experiment',
          description: '(De)activate this as a experiment'
        },
        {
          name: 'id',
          type: 'string',
          title: 'Google Experiment ID'
        },
        {
          name: 'variations',
          type: 'array',
          of: [{ type: 'variation' }],
          validation: Rule =>
            Rule.custom(value => {
              if (!value) {
                return true
              }
              let sum = 0
              value.forEach(variation => {
                sum += variation.percentage
              })

              return sum > 100 ? 'Total percentage cannot exceed 100%' : true
            })
        }
      ]
    },
    */
    {
      title: 'Include in sitemap',
      description: 'For search engines. Will be generateed to /sitemap.xml',
      name: 'includeInSitemap',
      type: 'boolean',
      fieldset: 'visibility'
    },
    {
      title: 'Disallow in robots.txt',
      description: 'Hide this route for search engines like google',
      name: 'disallowRobots',
      type: 'boolean',
      fieldset: 'visibility'
    }
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      variations: 'experiment.variations'
    },
    prepare({ title, subtitle, variations }) {
      return {
        title,
        subtitle:
          variations && variations.length
            ? `/${subtitle} (${variations.length} experiments)`
            : `/${subtitle}`
      }
    }
  }
}
