const {model, Schema} = require('mongoose')

const userSchema =  new Schema({
  Name: String,
  email: {type: String, unique: true, require: true},
  password: {type: String, require: true}, 
  role: String,
  refreshToken: String
});


module.exports = model('User', userSchema);