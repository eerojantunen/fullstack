const mongoose = require("mongoose")

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI

console.log("connecting to", url)
mongoose.set('strictQuery', false)
mongoose.connect(url)
  .then(() => {
    console.log("connected to MongoDB")
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message)
  })

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
        return /^(\d{3}|\d{2})-\d+$/.test(v)
      }
    }
  } })


personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model("Person", personSchema)
