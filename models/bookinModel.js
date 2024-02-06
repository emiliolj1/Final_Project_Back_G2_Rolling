const {model, Schema} = require('mongoose')

const bookinSchema = new Schema ({
    Date: Date,
    Hora: String,
    Email: String
})

const bookin = model('bookin', bookinSchema)
module.exports = { bookin }