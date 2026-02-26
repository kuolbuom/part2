import React from 'react'

const Content = (props) => {
   console.log(props)
  return(
    <div>
      <p>{props.courses[0].parts[0].name} {props.courses[0].parts[0].exercises}</p>
      <p>{props.courses[0].parts[1].name} {props.courses[0].parts[1].exercises}</p>
      <p>{props.courses[0].parts[2].name} {props.courses[0].parts[2].exercises}</p>
      <p>{props.courses[0].parts[3].name} {props.courses[0].parts[3].exercises}</p>
    </div>
  )
}

export default Content
