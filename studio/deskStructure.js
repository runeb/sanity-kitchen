import S from '@sanity/desk-tool/structure-builder'
import MdSettings from 'react-icons/lib/md/settings'
import MdPerson from 'react-icons/lib/md/person'
import MdHome from 'react-icons/lib/md/home'

import React from 'react'

const hiddenDocTypes = listItem => !['post', 'siteSettings'].includes(listItem.getId())

const baseUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:8000'
    : 'https://sanity-kitchen-3217332552.gtsb.io'

const path = document => {
  if (!document) {
    return
  }
  if (document._type === 'post') {
    return `blog/${document.slug.current}`
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
            return null
          }
          return (
            <iframe
              style={{
                width: '100%',
                height: '100%'
              }}
              frameBorder="0"
              src={`${baseUrl}/${path(displayed)}`}
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
      // This returns an array of all the document types
      // defined in schema.js. We filter out those that we have
      // defined the structure above
      ...S.documentTypeListItems().filter(hiddenDocTypes)
    ])
