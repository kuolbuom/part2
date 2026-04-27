import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import ErrorMessage from './components/ErrorMessage'
import personServices from './services/services'
import DeleteMessage from './components/DeleteMessage'
import ReplaceMessage from './components/ReplaceMessage'
import RemovedMessage from './components/RemovedMessage'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [deleteMessage, setDeleteMessage] = useState(null)
  const [replaceMessage, setReplaceMessage] = useState(null)
  const [showMessage,setShowMessage] = useState(null)

  useEffect(() => {
    personServices
      .getUrl()
      .then(response => {
        setPersons(response)
      })
  }, [])


  const addNewPerson = (event) => {
    event.preventDefault()
    const nameExists = persons.find(person => person.name === newName)

    if (nameExists) {
      //shallow copy
      const changePerson = { ...nameExists, number: newNumber }
      //confirmation and delete
      if (window.confirm(`${newName} is already added to phonebook. Replace the old number?`)) {
        personServices
          .update(nameExists.id, changePerson)
          .then(response => {
            setPersons(persons.map(person =>
              person.id !== nameExists.id ? person : response
            ))
            setReplaceMessage(`${newName}'s number replaced successfully`)
            setTimeout(() => {
              setReplaceMessage(null)
            }, 10000);
          })
        .catch(error => {
          setShowMessage(`information of ${newName} has already been removed from server`)
          setTimeout(() => {
            setShowMessage(null)
          }, 10000);
        })
      }
    } else {
      const newNameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      personServices
      .create(newNameObject)
      .then(response => {
        setPersons(persons.concat(response))
        setErrorMessage(`Added ${newName}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      console.log('new person added', newNameObject)
    }
    setNewName('')
    setNewNumber('')
  }

  const deleteAction = (id) => {
    const numberId = persons.find(p => p.id === id)
    if (window.confirm(`Delete name: ${numberId.name} and number: ${numberId.number} `)) {
      personServices.remove(id).then(response => {
        setPersons(persons.filter(p => p.id !== id))
        setDeleteMessage(`${numberId.name} Deleted successfully`)
        setTimeout(() => {
          setDeleteMessage(null)
        }, 10000)
      })
    }
    console.log('Numbe ' + id + ' needs to be deleted')
  }

  // Filtered persons based on the filter input (case-insensitive)
  const filterData = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage errorMessage={errorMessage} />
      <DeleteMessage deleteMessage={deleteMessage} />
      <ReplaceMessage replaceMessage={replaceMessage} />
      <RemovedMessage showMessage={showMessage} />
      <Filter filter={filter} setFilter={setFilter} />

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