export default {
  type: 'object',
  name: 'ctaColumns',
  title: 'CTA columns',
  fields: [
    {
      type: 'string',
      name: 'title'
    },
    {
      type: 'array',
      name: 'columns',
      of: [{ type: 'ctaPlug' }]
    }
  ]
}
