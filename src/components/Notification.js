import React from 'react'

const Notification = ({message, type}) => {
  if (message) {
    return (
      <div className={type}>
        {message}
      </div>
    )
  } else {
    return (
      null
    )
  }
}

export default Notification