import React from 'react'

const Header2 = (props) => {
  console.log(props)
  return(
    <div>
     <h2>{props.courses[1].name}</h2>
    </div>
  )
}

export default Header2
