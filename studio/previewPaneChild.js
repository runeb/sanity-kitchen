import React from 'react'
import S from '@sanity/desk-tool/structure-builder'

const path = document => {
  if (!document) {
    return
  }
  if (document._type === 'post') {
    return `blog/${document.slug.current}`
  }
}

const previewPane = (schemaType, documentId) => {
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
              src={`http://localhost:8000/${path(displayed)}`}
            />
          )
        })
        .title('Preview')
    ])
}

export default previewPane
