const {model, Schema} = require('mongoose')

const bookinSchema = new Schema ({
    Date: Date,
    Time: Time,
    email: String
})

module.exports = model ('bookin', bookinSchema)