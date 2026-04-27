import React from 'react'

const ReplaceMessage = ({ replaceMessage }) => {
    if(replaceMessage===null) return null
  return (
    <div className='replace'>
      {replaceMessage}
    </div>
  )
}

export default ReplaceMessage
