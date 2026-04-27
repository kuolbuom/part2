import React from 'react'

const DeleteMessage = ({ deleteMessage }) => {
    if(deleteMessage===null) return null
  return (
    <div className='delError'>
      {deleteMessage}
    </div>
  )
}

export default DeleteMessage
