import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personServices from './services/persons'
import Notification from './components/Notification'
import Notification2 from './components/Notification2'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter,setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [replaceMessage, setReplaceMessage] = useState(null)

  useEffect(() => {
    personServices.getAll().then(response => {
      setPersons(response)
    })
  },[])
  

  const addNewPerson = (event) => {
  event.preventDefault()
  // finding and shecking for existance base on it name
  const existingPerson = persons.find(person => person.name === newName)

  if (existingPerson) {
     //shallow copy
    const changePerson = { ...existingPerson, number: newNumber}
     //confirmation and delete
    if (window.confirm(`${newName} is already added. Replace the old number?`)) {
      personServices
        .update(existingPerson.id, changePerson)
        .then(response => {
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : response
          ))
          setReplaceMessage(`${newName}'s number replaced successfully`)
          setTimeout(() => {
            setReplaceMessage(null)
          }, 10000);
        })
    }

  } else {
    // the rest stay as its
    const newNameObject = {
      name: newName,
      number: newNumber
    }

    personServices
      .create(newNameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setMessage(`added '${newName}' sucessfully`)
          setTimeout(() => {
          setMessage(null)
        }, 10000)
      })
  }

  setNewName('')
  setNewNumber('')
}

  const deleteAction = (id) => {
    const numberId = persons.find(p => p.id===id)
     if(window.confirm(`Delete name: ${numberId.name} and number: ${numberId.number} `)) {
      personServices.remove(id).then(response => {
        setPersons(persons.filter(p => p.id !==id))
      })
     }
    console.log('number ' + id + ' needs to be deleted')
  }

  // Filtered persons based on the filter input (case-insensitive)
  const filterData = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Notification2 replaceMessage={replaceMessage} />
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
        deleteAction={deleteAction}
       />
    </div>
  )
}

export default App