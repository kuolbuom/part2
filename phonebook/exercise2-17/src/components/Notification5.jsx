import React from 'react'

const Notification5 = ({deleteMessage}) => {
  if(deleteMessage===null){
        return null
    }
  return (
    <div className='error'>
      {deleteMessage}
    </div>
  )
}

export default Notification5
