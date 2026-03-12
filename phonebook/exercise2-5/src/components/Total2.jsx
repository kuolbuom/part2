import React from 'react'

const Total2 = (props) => {
   const totalExerc2 = props.courses[1].parts.reduce((sum, part) => {
    return sum + part.exercises
   
  }, 0)

   return <h4><p>Total of {totalExerc2} exercises</p></h4>
}

export default Total2
