import MdVideocam from 'react-icons/lib/md/videocam'
import MdPhotoCamera from 'react-icons/lib/md/photo-camera'

import InstagramPreview from '../components/preview/Instagram'
import YoutubePreview from '../components/preview/YouTube'

export const instagram = {
  type: 'object',
  name: 'instagram',
  title: 'Instagram Post',
  icon: MdPhotoCamera,
  fields: [
    {
      type: 'url',
      name: 'url',
      description: 'The URL to the post as seen in a desktop browser'
    }
  ],
  preview: {
    select: { url: 'url' },
    component: InstagramPreview
  }
}

export const youtube = {
  type: 'object',
  name: 'youtube',
  title: 'YouTube Video',
  icon: MdVideocam,
  fields: [
    {
      type: 'url',
      name: 'url'
    }
  ],
  preview: {
    select: { url: 'url' },
    component: YoutubePreview
  }
}
