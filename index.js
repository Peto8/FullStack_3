
// BACKEND for Puhelinluettelo
require('dotenv').config()   //Use .env with the dotenv library

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build')) //For express to find /build -path

//middleware Morgann
morgan.token('content', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms' +
                ' :content'))


app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo</h1>')
})


// Gets all persons from mongo DB
app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons => {
    res.json({persons})
  }) 
})


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person.toJSON())
      } else {
        res.status(404).end() 
      }
    })
    .catch(error => {
next(error)})
})



app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {res.status(204).end()})
.catch(error => next(error))
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  //Check if name or number is missing
  if (!body.name) {
    return res.status(400).json({ 
    error: 'name missing' 
  })
  }else if (!body.number){
      return res.status(400).json({ 
      error: 'number missing' 
    })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON())
  })
}) 

app.put('/api/persons/:id', (req, res, next) => {
  console.log("UPDATING  A PERSON")

  const body = req.body
  const id = req.params.id

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => {
      res.json(updatedPerson)
    }).catch(error => next(error))
  })



app.get('/info', (req, res) => {
  let num = 0
  Person.find({}).then(persons => {
    num = persons.length
    const date = new Date()
    const infopage = `<p>Phonebook has info about ${num} people</p>
                    <p>${date}</p>`
    res.send(infopage)
  })  
})

// -- Error Handling --
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return res.status(400).send({ error: 'malformatted id' })
  } 
  next(error)
}

app.use(errorHandler)
// ----


// process.env.PORT is now in the .env file
const PORT = process.env.PORT
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })