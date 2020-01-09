const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('arguments [password] [name] [number]')
  process.exit(1)
}

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]


//current password 12345

const url =
  `mongodb+srv://fullstack:${password}@cluster0-hqhbw.mongodb.net/phone-app?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)


const person = new Person({
  name,
  number,
})

if(process.argv[3]){
  console.log('adding person ...')
  person.save().then(() => {
    console.log(`person ${name} saved`)
    mongoose.connection.close()
  })
}else{

  Person.find({}).then(result => {
    console.log('Phonebook:'),
    //console.log(result),
    result.forEach(person => {
      console.log(person.name + ' ' + person.number)
    })
    mongoose.connection.close()
  })

}
