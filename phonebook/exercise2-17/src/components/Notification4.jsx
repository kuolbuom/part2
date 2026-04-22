import React from 'react'

const Notification4 = ({validationError}) => {
  if (validationError === null) {
    return null
  }

  return (
    <div className="error3">
      {validationError}
    </div>
  )
}

export default Notification4
