import React from 'react'

const Persons = ({persons, nameFilter, removePerson}) => {
  const displayPhoneBook = () => {
    const filteredPhoneBook = persons.filter(person => person.name.toLowerCase().includes(nameFilter.toLowerCase()))
    return filteredPhoneBook.map((person, index) => 
      <div key={index}>{person.name} {person.number}<button onClick={()=>removePerson(person.id)}>Delete</button></div>)
  }

  return (
    <>
      <h2>Numbers</h2>
      {displayPhoneBook()}
    </>
  )
}

export default Persons