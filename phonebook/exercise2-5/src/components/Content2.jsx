import React from 'react'

const Content2 = (props) => {
   console.log(props)
  return(
    <div>
     <p>{props.courses[1].parts[0].name} {props.courses[1].parts[0].exercises}</p>
     <p>{props.courses[1].parts[1].name} {props.courses[1].parts[1].exercises}</p>
    </div>
  )
}

export default Content2
