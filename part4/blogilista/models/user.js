const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Blog"
        }
    ],
})

userSchema.set("toJSON", {
    transform: (document, reutrnedObject) => {
        reutrnedObject.id = reutrnedObject._id.toString()
        delete reutrnedObject._id
        delete reutrnedObject.__v
        delete reutrnedObject.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User