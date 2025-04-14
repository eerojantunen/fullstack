const express = require('express')
const morgan = require("morgan")
const app = express()
app.use(express.json())
const cors = require('cors')

app.use(cors())
morgan.token("person-data", (req, res) =>{
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
    response.json(persons)
  })

  app.get("/api/persons/:id", (request,response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)
    if (person) {
        response.json(person)
    } else {
        response.status(404).end()
    }
  })

  app.delete("/api/persons/:id", (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
  })



  app.post("/api/persons/", (request, response) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: "content missing"
        })
    }
    if (persons.find(person => person.name === body.name)){
        return response.status(400).json({
            error: "name must be unique"
        })
    }
    const person = {
        id: String(Math.floor(Math.random()*45000)),
        name: body.name,
        number: body.number
    }
    persons = persons.concat(person)
    response.json(person)
  })


  app.get("/info", (request,response) => {
    const responseData = 
        `<h2>Phonebook has info for ${persons.length} people</h2>
        <h2>${Date()}</h2>`
    
    response.send(responseData)

  })


  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })