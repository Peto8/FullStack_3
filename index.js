
// BACKEND for Puhelinluettelo
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build')) //For express to find /build -path

//middleware Morgann
morgan.token('content', req => JSON.stringify(req.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms' +
                ' :content'))


let data = 
{
    "persons": [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Abraham Lincoln",
        "number": "000000000000",
        "id": 4
      }
    ]
  }

app.get('/', (req, res) => {
  res.send('<h1>Puhelinluettelo</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(data)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = data.persons.find(p => p.id === id)

  if(!person) {res.status(404).end()}
  else res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  data.persons = data.persons.filter(p => p.id !== id)

  res.status(204).end()
})


app.post('/api/persons', (req, res) => {
  const body = req.body
  let match = false
  data.persons.forEach(p => {if(p.name === body.name) match=true})

  if (!body.name) {
      return res.status(400).json({ 
      error: 'name missing' 
    })
  }else if (!body.number){
      return res.status(400).json({ 
      error: 'number missing' 
    })
  }else if (match){
      return res.status(400).json({ 
      error: 'Name alredy exists, must be unique' })
  }
  
  const id = Math.floor(Math.random()*100000000)
  const person = {
    name: body.name,
    number: body.number,
    id: id,
  }
  data.persons = data.persons.concat(person)
  res.json(person)
})


app.get('/info', (req, res) => {
  const num = data.persons.length
  const date = new Date()
  const infopage = `<p>Phonebook has info about ${num} people</p>
                    <p>${date}</p>`
  res.send(infopage)
})




// Will use port 3001 unless env. Variable PORT is defined
const PORT = process.env.PORT || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })