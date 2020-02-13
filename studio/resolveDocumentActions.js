// import the default document actions
import defaultResolve, { PublishAction, DuplicateAction } from 'part:@sanity/base/document-actions'
import { useDocumentOperation } from '@sanity/react-hooks'
import { RejectAction, Approve, PublishApproved, RequestReview } from './src/actions/workflow'

const actionsMap = {
  siteSettings: {
    siteSettings: [PublishAction]
  },
  page: {
    frontpage: [PublishAction, DuplicateAction]
  }
}

const filteredDefaultActions = props => {
  if (actionsMap[props.type]) {
    if (actionsMap[props.type][props.id]) {
      return actionsMap[props.type][props.id]
    }
  }

  return defaultResolve(props).filter(a => a !== PublishAction)
}

export default function resolveDocumentActions(props) {
  const result = [
    Approve,
    RejectAction,
    RequestReview,
    PublishApproved,
    ...filteredDefaultActions(props)
  ]
  return result
}
