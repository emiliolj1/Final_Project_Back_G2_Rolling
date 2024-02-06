const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: String,
  Url: String,
  description: String,
})

const Cancha = model('cancha', canchaSchema)
module.exports = {Cancha}