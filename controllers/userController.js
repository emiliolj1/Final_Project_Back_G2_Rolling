require('dotenv').config();
const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');


const addUser = async (req, res) => {
  try {
    const { Name, Email, Password, Role, RefreshToken} = req.body
    const newUser = new User({
      Name,
      Email,
      Password,
      Role,
      RefreshToken
    })
    // use the tool bcrypt to generate an encrypted password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(Password, salt);
    
    newUser.Password = hash

    await newUser.save()
    res.status(200).json({ message: 'el usuario fue creado con exito' })
  } catch (error) {
    res.status(400).json({ message: 'no se pudo realizar la accion de crear usuario, disculpe las molestias', error: error.message }) 
  }
};

const changePassword = async (req, res) => {
  try {
    const { Name, Email, newPassword } = req.body;
    const user = await User.findOne({ Name, Email })
    
    if(!user){
      return response.status(400).json({message: 'usuario no existe'})
    }

    if(user.Email === Email && user.Name === Name){
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.Password = hash
      await user.save()
    }
    res.status(200).json({ message: 'el usuario cambio la contrasena con exito' })
  } catch (error) {
    res.status(400).json({ message: 'el usuario no pudo realizar la accion', error: error.message })
  }
}


module.exports = { addUser, changePassword };