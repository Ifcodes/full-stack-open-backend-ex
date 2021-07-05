require('dotenv').config()
const express = require('express')
const Phonebook = require('./models/phonebook')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Phonebook.findById(request.params.id).then(person => {
    response.json(person)
  })
})

// let currenttime = new Date()

// app.get('/info', (request, response) => {
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people</p>
//     <p>${new Date()}</p>
//     `
//   )
// })

// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   const person = persons.find((person) => person.id === id)
//   persons = persons.filter((p) => p.id !== person.id)
//   response.json(person)
//   response.status(204).end()
// })

const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: 'Name or Phonenumber is missing',
    })
  }

  const person = new Phonebook({
    name: body.name,
    number: body.number,
    dateAdded: new Date(),
  })

  person
    .save()
    .then((savedContact) => savedContact.toJSON())
    .then((saved) => {
      response.json(saved)
    })
    .catch((error) => errorHandler(error))
})

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
