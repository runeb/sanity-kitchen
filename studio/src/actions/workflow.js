import React from 'react'
import { useDocumentOperation } from '@sanity/react-hooks'
import { PublishAction } from 'part:@sanity/base/document-actions'
import client from 'part:@sanity/base/client'
import userStore from 'part:@sanity/base/user'

import { icons } from '../structure/blog'

function setEditorialState(newState) {
  return [
    {
      setIfMissing: {
        editorialStatus: {
          _type: 'editorialStatus'
        }
      }
    },
    {
      set: {
        editorialStatus: {
          current: newState
        }
      }
    }
  ]
}

function editorialStatus(object) {
  return object && object.editorialStatus && object.editorialStatus.current
}

function hasStatus(object, status) {
  return editorialStatus(object) === status
}

export function PublishApproved(props) {
  if (!props.draft) return PublishAction(props)
  if (props.type === 'post') {
    if (!hasStatus(props.draft, 'approved')) return null
  }

  const { patch, commit, publish } = useDocumentOperation(props.id, props.type)
  return {
    label: 'Publish',
    onHandle: () => {
      patch.execute([
        {
          unset: ['editorialStatus']
        }
      ])
      publish.execute()
    }
  }
}

const createStatus = async (id, rev, status) => {
  client.createOrReplace({
    _type: 'workflow.status',
    rev,
    docId: id,
    status
  })
}

export function RejectAction({ id, type, published, draft, onComplete }) {
  if (type !== 'post') return null
  if (!hasStatus(draft, 'review')) return null

  const [reason, setReason] = React.useState('')
  const [isDialogOpen, setDialogOpen] = React.useState(false)
  const { patch, commit } = useDocumentOperation(id, type)

  return {
    icon: icons.RejectedIcon,
    label: 'Reject',
    onHandle: () => {
      setDialogOpen(true)
    },
    dialog: isDialogOpen && {
      type: 'modal',
      content: (
        <>
          <h2>Reason</h2>
          <input type="text" onChange={event => setReason(event.target.value)} />
          <button
            onClick={() => {
              patch.execute([
                {
                  set: {
                    editorialStatus: {
                      current: 'rejected',
                      reason
                    }
                  }
                }
              ])
              commit.execute()
              setDialogOpen(false)
            }}
          >
            Done
          </button>
        </>
      )
    }
  }
}

export function Approve({ id, type, published, draft, onComplete }) {
  if (type !== 'post') return null
  if (!hasStatus(draft, 'review')) return null

  const { patch, commit } = useDocumentOperation(id, type)
  return {
    label: 'Approve',
    onHandle: () => {
      patch.execute([
        {
          set: {
            editorialStatus: {
              current: 'approved'
            }
          }
        }
      ])
      commit.execute()
      onComplete()
    }
  }
}

export function RequestReview({ id, type, published, draft, onComplete }) {
  if (type !== 'post' || !draft) return null
  if (hasStatus(draft, 'review')) return null
  if (hasStatus(draft, 'approved')) return null

  const { patch, commit } = useDocumentOperation(id, type)
  return {
    label: 'Request review',
    onHandle: () => {
      const userSubscription = userStore.currentUser.subscribe({
        next: evt => {
          return client
            .createOrReplace({
              _type: 'workflow.status',
              _id: `workflow.${id}.${draft._rev}`,
              rev: draft._rev,
              status: 'review',
              user: evt.user.id
            })
            .then(() => onComplete())
        },
        error: error => console.error('Failed to get current user', error)
      })
    }
  }
}

// Badges

export function WorkflowBadge(props) {
  if (props.type !== 'post') return null
  const status = editorialStatus(props.draft)
  if (!status) return null

  switch (status) {
    case 'rejected':
      return {
        label: 'Rejected',
        title: 'This draft has been rejected and need more editing',
        color: 'danger'
      }
    case 'review':
      return {
        label: 'Waiting review',
        title: 'This draft is waiting for someone to start a review',
        color: 'warning'
      }
    case 'approved':
      return {
        label: 'Approved',
        title: 'This draft is ready to be published',
        color: 'success'
      }
    default:
      return null
  }
}
