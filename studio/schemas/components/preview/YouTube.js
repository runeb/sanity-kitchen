import React from 'react'
import YouTube from 'react-youtube'
import getYouTubeId from 'get-youtube-id'

const YouTubePreview = ({ value }) => {
  if (!value.url) {
    return null
  }

  const id = getYouTubeId(value.url)
  if (!id) {
    return null
  }

  return <YouTube videoId={id} />
}

export default YouTubePreview
