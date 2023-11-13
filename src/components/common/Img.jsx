import React from 'react'

const Img = ({src}) => {
  return (
    <img loading="lazy" className="postImg" src={src}/>
  )
}

export default Img