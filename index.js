require('dotenv').config()
const express = require('express')
const Phonebook = require('./models/phonebook')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const requestLogger = (request, response, next) => {
  console.log('method:', request.method)
  console.log('path:', request.path)
  console.log('body:', request.body)
  console.log('---')
  next()
}

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(morgan())
app.use(requestLogger)

app.get('/api/persons', (request, response) => {
  Phonebook.find({}).then((persons) => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  Phonebook.findById(request.params.id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => next(error))
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // if (!body.name || !body.number) {
  //   return response.status(400).json({
  //     error: 'Name or Phonenumber is missing',
  //   })
  // }

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

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const editedPerson = {
    name: body.name,
    number: body.number
  }

  Phonebook.findByIdAndUpdate(request.params.id, editedPerson, { new: true }).then(updatedPerson => {
    response.json(updatedPerson)
  }).catch(error => next(error))
})
// let currenttime = new Date()

// app.get('/info', (request, response) => {
//   response.send(
//     `<p>Phonebook has info for ${persons.length} people</p>
//     <p>${new Date()}</p>
//     `
//   )
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id)
    .then(person => {
      if (person) {
        response.status(204).end()
      } else {
        response.status(404).send({ error: 'Contact doesnt exist' })
      }

    })
    .catch(error => next(error))
})




const errorHandler = (error, request, response, next) => {

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
