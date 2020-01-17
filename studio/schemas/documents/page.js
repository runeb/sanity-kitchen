import * as plugs from '../plugs'

export default {
  type: 'document',
  name: 'page',
  title: 'Page',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      name: 'content',
      type: 'array',
      of: [
        { type: 'pricing' },
        { type: 'uiComponentRef' },
        { type: 'hero' },
        { type: 'infoRows' },
        { type: 'ctaColumns' },
        { type: 'ctaPlug' }
      ]
    }
  ]
}
