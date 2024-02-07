const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: {type: String, unique: true},
  Url: String,
  description: String,
  Array: [{
    date: { type: String },
    name: { type: String }
  }]
})

const Cancha = model('cancha', canchaSchema)
module.exports = {Cancha}