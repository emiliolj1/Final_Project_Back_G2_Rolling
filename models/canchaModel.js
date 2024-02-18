const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: {type: String, required: true, minlength: 5, maxlength: 25},
  Url: {type: String, required: true},
  Description: {type: String, required: true, minlength: 5, maxlength: 400},
  Array: [{
    date: { type: String },
    name: { type: String }
  }]
})

const Cancha = model('cancha', canchaSchema)
module.exports = {Cancha}