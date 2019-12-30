import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'
import phonebookService from '../services/phonebook'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  useEffect(() =>{
    phonebookService
      .getAll()
      .then(currentPhonebook => {
        setPersons(currentPhonebook)
      })
  }, [])

  const handleNewNameChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setNameFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if(persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const personToUpdate = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
      const updatedPerson = {
        name: newName,
        number: newNumber,
        id: personToUpdate.id
      }
      phonebookService
        .update(personToUpdate.id, updatedPerson)
        .then(() => {
          setPersons(persons.map(person => person.id !== personToUpdate.id ? person : updatedPerson))
          setNewName('')
          setNewNumber('')
        })
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
      }
      phonebookService
        .create(newPerson)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removePerson = (removedPersonId) => {
    const removedPersonName = persons.filter(person => person.id === removedPersonId)[0].name
    if(window.confirm(`Are you sure you would like to delete ${removedPersonName}`)) {
      phonebookService
        .remove(removedPersonId)
        .then(() => {
          setPersons(persons.filter(person => person.id !== removedPersonId))
        })
    }
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange} />
      <PersonForm addPerson={addPerson} handleNewNameChange={handleNewNameChange} 
                  newName={newName} handleNewNumberChange={handleNewNumberChange} 
                  newNumber={newNumber} />
      <Persons persons={persons} nameFilter={nameFilter} removePerson={removePerson} />
    </div>
  )
}

export default App
