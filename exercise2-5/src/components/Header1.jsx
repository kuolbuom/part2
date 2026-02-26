import React from 'react'

const Header1 = (props) => {
   console.log(props)
  return <h2>{props.courses[0].name}</h2>
}

export default Header1
