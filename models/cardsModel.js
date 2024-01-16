const {model, Schema} = require('mongoose')

const cardSchema =  new Schema({
  Title: String,
  id: id,
  cuantity: Number,
  img: img,
  description: String,
});

module.exports = model('card', Schema)