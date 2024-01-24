const {model, Schema} = require('mongoose')

const cardSchema =  new Schema({
  id: id,
  Title: String,
  img: img,
  cuantity: Number,
  description: String,
  price: Number
});

module.exports = model('card', cardSchema)