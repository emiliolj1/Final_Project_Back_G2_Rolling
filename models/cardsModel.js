const {model, Schema} = require('mongoose')

const productSchema =  new Schema({
  id: id,
  Title: String,
  img: img,
  description: String,
  price: Number
});

module.exports = model('product', productSchema)