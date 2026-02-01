import React from 'react'

const Video = () => {
  return (
    <div className='video-con'>
        <video src='/vid.mp4' loop muted autoPlay playsInline></video>
    </div>
  )
}

export default Video