const {model, Schema} = require('mongoose')

const productSchema =  new Schema({
  Title: {type: String, require: true, minlength: 3, maxlength: 20},
  Url: {type: String, require: true},
  Description: {type: String, require: true, minlength: 5, maxlength: 120},
  Price: Number
});

const Product = model('Products', productSchema)
module.exports = { Product }