const {model, Schema} = require('mongoose')

const productSchema =  new Schema({
  Title: String,
  Url: String,
  description: String,
  price: Number
});

const Product = model('Products', productSchema)
module.exports = { Product }