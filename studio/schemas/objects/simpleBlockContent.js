export default {
  title: 'Simple Block Content',
  name: 'simpleBlockContent',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Italic', value: 'italic' },
          { title: 'Code', value: 'code' }
        ],
        annotations: [
          {
            title: 'URL',
            type: 'link'
          },
          {
            title: 'Internal link to another document',
            type: 'reference',
            to: [{ type: 'page' }, { type: 'post' }],
            description: 'Locate a document you want to link to'
          }
        ]
      },
      of: []
    },
    {
      title: 'dangerous HTML',
      type: 'code',
      options: {
        language: 'html'
      }
    }
  ]
}
