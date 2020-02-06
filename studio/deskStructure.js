import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'
import MdHome from 'react-icons/lib/md/home'

import React from 'react'

const hiddenDocTypes = listItem => !['post', 'siteSettings', 'author'].includes(listItem.getId())

const previewBaseUrl = {
  development: 'http://localhost:8000',
  staging: 'https://sanity-kitchen-3217332552.gtsb.io',
  production: 'https://sanity-kitchen-3217332552.gtsb.io'
}

const baseUrl = previewBaseUrl[process.env.NODE_ENV] || previewBaseUrl.development

const path = document => {
  if (!document) {
    return
  }

  switch (document._type) {
    case 'post':
      return `blog/${document.slug.current}`
    case 'siteSettings':
      return ''
  }
}

const PreviewPaneChild = (schemaType, documentId) => {
  return S.document()
    .schemaType(schemaType)
    .documentId(documentId)
    .views([
      S.view.form(),
      S.view
        .component(params => {
          const { displayed } = params.document
          if (!displayed) {
            return <p>Nothing to display</p>
          }
          const documentPath = path(displayed)
          if (!documentPath) {
            return <p>No path to display</p>
          }
          return (
            <iframe
              style={{
                width: '100%',
                height: '100%'
              }}
              frameBorder={'0'}
              src={`${baseUrl}/${documentPath}`}
            />
          )
        })
        .title('Preview')
    ])
}

// Helper function to create an S.view.component for rendering an iframe with an url.
// We use this for Preview pane
const previewUrl = url =>
  S.view
    .component(() => <iframe style={{ width: '100%', height: '100%' }} frameBorder="0" src={url} />)
    .title('Preview')

export default () =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(MdSettings)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .views([S.view.form(), previewUrl(baseUrl)])
        ),
      S.listItem()
        .title('Frontpage')
        .icon(MdHome)
        .child(
          S.document()
            .schemaType('page')
            .documentId('frontpage')
            .views([S.view.form(), previewUrl(baseUrl)])
        ),
      S.listItem()
        .title('Blog posts')
        .schemaType('post')
        .child(
          S.documentTypeList('post')
            .title('Blog posts')
            .child(documentId => PreviewPaneChild('post', documentId))
        ),
      S.listItem()
        .title('Authors')
        .icon(MdPerson)
        .schemaType('author')
        .child(S.documentTypeList('author').title('Authors')),
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
