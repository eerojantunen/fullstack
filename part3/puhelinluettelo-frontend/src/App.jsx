import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from "./services/persons"
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleDelete = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
    personService
      .deletePerson(person.id)
      .then(() =>{
        setPersons(persons.filter(n => n.id !== person.id))
      })
      handleNotification(`Deleted ${person.name}`)}
  }

  const handleNotification = (message) => {
    setNotificationMessage(message)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 2500)
  }
  const handleError = (message) => {
    setErrorMessage(message)
      setTimeout(() => {
        setErrorMessage(null)
      }, 2500)
  }

  const personsToShow = (newFilter === '')
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {name: newName, number: newNumber}
    const check = persons.find(person => person.name === newName)
    
    if (check) {
      if (window.confirm(`${check.name} is already added to phonebook, replace the old number with a new one?`)) {
        personService.replaceNumber({...check, number:newNumber}).then(updatedPerson =>{
          setPersons(persons.map(person => person.id !== updatedPerson.id ? person : updatedPerson))
          handleNotification(`Updated number of ${newPerson.name}`)})
          .catch(error => {
            handleError(`Information of ${newPerson.name} has already been removed from server`)
          })

      }
    } else {
    personService
      .create(newPerson)
      .then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson))
      })
      handleNotification(`Added ${newPerson.name}`)
  }}


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage}/>
        <Error message={errorMessage}/>
        <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>add a new</h3>
        <PersonForm addName={addName} 
                    newName={newName}
                    newNumber={newNumber} 
                    handleNameChange={handleNameChange}
                    handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <Persons personsToShow={personsToShow} handleDelete={handleDelete}/>
      
    </div>
  )

}

const Persons = ({personsToShow, handleDelete}) => {
  return (
    personsToShow.map(person => (    
      <div key={person.id} style={{display:"flex", gap:"5px"}}>  
      <p style={{margin:1}} key={person.name}>{person.name} {person.number}</p>
        <button onClick={() => handleDelete(person)}>delete</button>
      </div>
    )
  ))
}

const PersonForm=({addName,newName,newNumber,handleNameChange,handleNumberChange}) => {

  return (
    <div>
    <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
           />
        </div>
        <div>
          number: <input 
          value = {newNumber}
          onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  </div>
  )
}


const Filter=({newFilter,handleFilterChange}) => {
  return (
    <form>
      <div>
          filter shown with <input
          value={newFilter}
          onChange={handleFilterChange}/>
      </div>
    </form>
  )
}

const Notification = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="notification">
      {message}
    </div>
  )
}

const Error = ({message}) => {
  if (message === null) {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}



export default App