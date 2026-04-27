import React from 'react'

const Persons = ({filterData,deleteAction}) => {
  return (
    <div>
       {filterData.map(person => 
        <p 
         key={person.id}> {person.name}  {person.number}
          <button onClick={()=> deleteAction(person.id)}>Delete</button>
        </p>
       )}
    </div>
  )
}

export default Persons
