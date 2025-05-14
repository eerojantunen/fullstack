const express = require('express')
const morgan = require("morgan")
const app = express()
app.use(express.static('dist'))
app.use(express.json())
const cors = require('cors')
require("dotenv").config()
const Person = require("./models/person")
app.use(cors())

morgan.token("person-data", (req) => {
  if (req.method === "POST") {
    return JSON.stringify(req.body)
  }
  return
})

app.use(morgan(":method :url :status :res[content-length] :response-time ms :person-data"))

let persons = [
  {
    id:"1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id:"2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id:"3",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
]

app.get("/api/persons", (request,response) => {
  Person.find({}).then(persons => {
    console.log(persons)
    response.json(persons)
  })
})

app.get("/api/persons/:id", (request,response,next) => {
  const id = request.params.id
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  })
    .catch(error => next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndDelete(request.params.id).
    then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))

  const id = request.params.id
  persons = persons.filter(person => person.id !== id)
})



app.post("/api/persons/", (request, response) => {
  const body = request.body
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "content missing"
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  }).catch(error => {
    return response.status(400).json({
      error: error
    })
  })
  persons = persons.concat(person)
})


app.get("/info", (request,response) => {
  const responseData =
        `<h2>Phonebook has info for ${persons.length} people</h2>
        <h2>${Date()}</h2>`

  response.send(responseData)

})

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body
  Person.findById(request.params.id)
    .then(person => {
      if (!person) {
        return response.status(404).end()
      }
      person.name = name
      person.number = number

      return person.save().then((updatedPerson) => {
        response.json(updatedPerson)
      })
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)



const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})