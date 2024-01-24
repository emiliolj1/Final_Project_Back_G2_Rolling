const {model, Schema} = require('mongoose')

const canchaSchema = new Schema ({
  Title: String,
  id: id,
  img: Image,
  description: String,
})

module.exports = model('cancha', canchaSchema)