import React from 'react'

const Total = (props) => {
   const totalExerc1 = props.courses[0].parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return <h4><p>Total of {totalExerc1} exercises</p></h4>
}

export default Total