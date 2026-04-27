import React from 'react'

const RemovedMessage = ({ showMessage }) => {
if(showMessage===null) return null
  return (
    <div className='remove'>
    {showMessage}
    </div>
  )
}

export default RemovedMessage
