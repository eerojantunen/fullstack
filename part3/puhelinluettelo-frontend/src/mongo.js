import mongoose from "mongoose";
import { validate } from "../../puhelinluettelo-backend/models/person";
if (process.argv.length < 5 && process.argv.length != 3) {
  console.log('give password, name, number as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://janteero:${password}@cluster0.epf5n4s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  
mongoose.set('strictQuery', false)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [3, "Name too short"],
    required: true
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /(\d{3}|\d{2})-\d+/.test(v)
      }
    }

  }
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length == 3) {
    console.log("phonebook:")
    mongoose.connect(url).then(() => {
    Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name,person.number)
    })
    mongoose.connection.close().then(process.exit(1))
    })
  })  
}

const newName = process.argv[3]
const newNumber = process.argv[4]

const person = new Person({
  name: newName,
  number: newNumber,
})
if (process.argv.length == 5) {
    mongoose.connect(url).then(() => {
    person.save().then(result => {
    console.log(`added ${newName} number ${newNumber} to phonebook!`)
    mongoose.connection.close()
  })})
}
