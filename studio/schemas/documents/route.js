import { MdLink } from 'react-icons/lib/md'

export default {
  name: 'route',
  type: 'document',
  title: 'Landing page routes',
  icon: MdLink,
  fieldsets: [
    {
      title: 'Visibility',
      name: 'visibility'
    }
  ],
  fields: [
    {
      name: 'slug',
      type: 'slug'
    },
    {
      title: 'Navigation menu',
      name: 'navMenu',
      type: 'reference',
      weak: false,
      to: [{ type: 'navigationMenu' }],
      description: 'Which nav menu should be shown, if any'
    },
    /*
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
    */
    {
      name: 'page',
      type: 'reference',
      description: 'This is the page we will render at this slug',
      to: [
        {
          type: 'page'
        }
      ]
    },
    {
      title: 'Open graph',
      name: 'openGraph',
      description: 'These values populate meta tags',
      type: 'openGraph'
    }
    /*
    {
      name: 'experiment',
      type: 'object',
      description: 'Use this to A/B/n test this route towards different pages',
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
          title: 'Google Experiment ID',
          description:
            'You will have to create an experiment with a correct number of variations on Google Optimize first'
        },
        {
          name: 'variations',
          type: 'array',
          description:
            'These are the different variations (pages) this route will point to in this experiment',
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
    */
  ],
  preview: {
    select: {
      title: 'openGraph.title',
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
