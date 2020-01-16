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
      of: [{ type: 'image' }, { type: 'hero' }]
    }
  ]
}
