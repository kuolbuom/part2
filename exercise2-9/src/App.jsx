import { useState } from 'react'

const App = () => {
   const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const ifNameExists = persons.some(person => person.name===newName)

    if(ifNameExists) {
      alert(`${newName} is already added to phone book`)
      return
    }

    const newPerson = {
      name: newName,
      number:newNumber,
      id: persons.length + 1
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
   console.log(newPerson)
  }

  const handlePerson = (e) => {
    setNewName(e.target.value)
    console.log(e.target.value)
  }

  const handleNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const filterData = persons.filter(person => person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()))

  const handleFilterData = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterData}/>
      </div>
      <h1><p>add a new</p></h1>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handlePerson} />
        </div>
        <div>
          number <input value={newNumber} onChange={handleNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterData.map(person => 
        <p key={person.id}>{person.name} {person.number}</p>
      )}
    </div>
  )
}

export default App