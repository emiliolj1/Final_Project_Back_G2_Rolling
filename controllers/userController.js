require('dotenv').config();
const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');


const addUser = async (request, response) => {
  try {
    const { Name, email, password, role, refreshToken} = request.body
    const newUser = new User({
      Name,
      email,
      password,
      role,
      refreshToken
    })
    // use the tool bcrypt to generate an encrypted password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    
    newUser.password = hash

    await newUser.save()
    response.status(200).json({ message: 'el usuario fue creado con exito' })
  } catch (error) {
    response.status(400).json({ message: 'no se pudo crear el usuario' }) 
  }
};

// en desarrollo

const changePassword = async (request, response) => {
  try {
    const { Name, email, newPassword } = request.body
    const user = await User.findOne({ Name, email })

    // searching for the user if it exists 
    if(!user){
      return response.status(400).json({message: 'usuario no existe'})
    }

    // if the user exist, we compare the info with the data base
    if(user.email === email || user.Name === Name){
      //then encrypt the new password and save it
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.password = hash
      await user.save()
    }
    response.status(200).json({ message: 'el usuario cambio la contrasena con exito' })
  } catch (error) {
    response.status(400).json({ message: 'el usuario no pudo realizar la accion', error: error.message })
  }
}


module.exports = { addUser, changePassword };