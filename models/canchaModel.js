const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: String,
  id: id,
  img: Image,
  description: String,
  Date: Date,
})

module.exports = model('cancha', canchaSchema)