const {model, Schema} = require('mongoose')

const bookinSchema = new Schema ({
    Date: Date,
    Hora: String,
    email: String
})

module.exports = model ('bookin', bookinSchema)