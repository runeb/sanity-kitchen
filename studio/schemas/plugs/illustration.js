export default {
  type: 'object',
  name: 'illustration',
  title: 'Illustration',
  fields: [
    {
      title: 'Image',
      name: 'image',
      type: 'image',
      options: {
        hotspot: true
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alt text',
          description: 'Alternative text for screenreaders',
          options: {
            isHighlighted: true
          }
        },
        {
          name: 'size',
          type: 'string',
          title: 'Size',
          options: {
            isHighlighted: true,
            list: ['small', 'medium', 'large', 'header']
          }
        },
        {
          name: 'style',
          type: 'string',
          title: 'Style',
          options: {
            isHighlighted: true,
            list: ['none', 'ui']
          }
        }
      ]
    }
  ],
  preview: {
    select: {
      image: 'image'
    },
    prepare({image}) {
      if (!image) {
        return {title: 'Illustration with no image'}
      }
      return {
        title: `Illustration`,
        subtitle: `${image.caption || image.alt || 'Missing capton or alt text'} | Size: ${image.size||'default'}`,
        media: image
      }
    }
  }
}
