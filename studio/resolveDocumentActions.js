// import the default document actions
import defaultResolve, {
  PublishAction,
  DuplicateAction,
  DiscardChangesAction
} from 'part:@sanity/base/document-actions'

import { RejectAction, Approve, RequestReview } from './src/actions/workflow'

const actionsMap = {
  siteSettings: {
    siteSettings: [PublishAction, DiscardChangesAction]
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
  if (props.type === 'post') {
    return [
      RequestReview,
      Approve,
      RejectAction,
      ...defaultResolve(props).filter(a => a !== PublishAction)
    ]
  }

  return filteredDefaultActions(props).filter(r => r !== null)
}
