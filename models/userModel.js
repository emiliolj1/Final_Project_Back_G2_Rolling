const {model, Schema} = require('mongoose')

const user =  new Schema({
  Name: String,
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true}, 
  role: String
});


const User = model('User', user)
module.exports = { User };