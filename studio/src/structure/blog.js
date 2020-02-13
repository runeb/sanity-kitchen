import React from 'react'
import S from '@sanity/desk-tool/structure-builder'
import {
  GoMegaphone as BlogIcon,
  GoChecklist as ApprovedIcon,
  GoEye as ReviewIcon,
  GoCircleSlash as RejectedIcon,
  GoArchive as AllIcon
} from 'react-icons/lib/go'

export const icons = {
  BlogIcon,
  ApprovedIcon,
  ReviewIcon,
  RejectedIcon,
  AllIcon
}

const editorialStatusList = [
  {
    title: 'Waiting for review',
    value: 'review',
    icon: ReviewIcon
  },
  {
    title: 'Approved for publish',
    value: 'approved',
    icon: ApprovedIcon
  },
  {
    title: 'Rejected',
    value: 'rejected',
    icon: RejectedIcon
  }
]

const panes = [
  /*
  S.view
    .component(BlogPostStats)
    .title('Users and sources')
    .icon(MdInsertChart),
  S.view
    .component(BlogPostPublishedAndBounces)
    .title('Publish events')
    .icon(MdInsertChart)
    */
]

const blog = S.listItem()
  .title('Blog')
  .icon(BlogIcon)
  .child(
    S.list()
      .title('/blog posts')
      .items([
        ...editorialStatusList.map(({ title, value, icon }) =>
          S.listItem()
            .title(title)
            .icon(icon)
            .child(
              S.documentList()
                .title(title)
                .schemaType('post')
                .filter('editorialStatus.current == $status')
                .params({ status: value })
            )
        ),
        S.divider(),
        S.listItem()
          .title('Published posts')
          .icon(BlogIcon)
          .schemaType('post')
          .child(
            S.documentList('post')
              .title('Published posts')
              .menuItems(S.documentTypeList('post').getMenuItems())
              .filter('_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))')
              .child(documentId =>
                S.document()
                  .documentId(documentId)
                  .schemaType('post')
                  .views([S.view.form(), ...panes])
              )
          ),
        S.documentTypeListItem('post')
          .title('All posts')
          .icon(AllIcon)
      ])
  )

export default blog
