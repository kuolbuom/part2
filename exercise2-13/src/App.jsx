import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')

  useEffect(() => {
    personServices.getAll().then(response => {
      setPersons(response)
    })
  },[])
  

  const addNewPerson = (event) => {
    event.preventDefault()
  const nameExists = persons.some(person => person.name === newName)

  if (nameExists) {
    alert(`${newName} is already added to phonebook`)
    return
  }

    const newNameObject = {
      name: newName,
      number:newNumber,
      id: persons.length + 1
    }

    personServices.create( newNameObject).then(response => {
      setPersons(persons.concat(response))
    })
    
    console.log('new person added', newNameObject)
    setNewName('')
    setNewNumber('')
  }

  // Filtered persons based on the filter input (case-insensitive)
  const filterData = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter = {filter} setFilter={setFilter}  />

        <h1><p>Add a new</p></h1>
       <PersonForm
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        addNewPerson={addNewPerson}
       />
      <h2>Numbers</h2>
       <Persons
        filterData={filterData}
       />
    </div>
  )
}

export default App