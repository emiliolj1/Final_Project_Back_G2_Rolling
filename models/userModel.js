const {model, Schema} = require('mongoose')

const user =  new Schema({
  name: {type: String, require: true, minlength: 5, maxlength: 25}, 
  email: {type: String, unique: true, require: true, minlength: 5, maxlength:30},
  password: {type: String, require: true, minlength: 5},
  role: {type: String, enum:['client', 'admin', 'Master'], default:'client'},
  refreshToken: String,
  isActive: {type: Boolean, default: true}
});


const User = model('User', user)
module.exports = { User };