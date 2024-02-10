const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: {type: String, require: true, minlength: 5, maxlength: 2},
  Url: {type: String, require: true},
  Description: {type: String, require: true, minlength: 5, maxlength: 150},
  Array: [{
    date: { type: String },
    name: { type: String }
  }]
})

const Cancha = model('cancha', canchaSchema)
module.exports = {Cancha}