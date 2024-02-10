const {model, Schema} = require('mongoose')

const user =  new Schema({
  Name: {type: String, unique: true, require: true, minlength: 5, maxlength: 25},
  Email: {type: String, unique: true, require: true, minlength: 5, maxlength: 25},
  Password: {type: String, unique:true, require: true, minlength: 5, maxlength: 20}, 
  Role: {type: String, enum:['client', 'admin', 'Master'], default:'client'},
  RefreshToken: String,
  IsActive: true
});


const User = model('User', user)
module.exports = { User };