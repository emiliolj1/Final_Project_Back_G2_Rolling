const {model, Schema} = require('mongoose')

const userSchema =  new Schema({
  Name: String,
  email: {
    type: String,
    unique: true
  },
  password: Strign, 
  role: String,
  refreshToken: String
});


module.exports = model('User', userSchema);