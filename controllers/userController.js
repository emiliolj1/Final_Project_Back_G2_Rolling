require('dotenv').config();
const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');


const addUser = async (req, res) => {
  try {
    const { name, email, password, role} = req.body;
    //use the model of models/userModel.js
    const newUser = new User({
      name,
      email,
      password,
      role,
    })
    // use the tool bcrypt to generate an encrypted password
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    newUser.password = hash
    //then we save it in the data base
    await newUser.save()
    res.status(200).json({ message: 'el usuario fue creado con exito' })
  } catch (error) {
    res.status(500).json({ message: 'no se pudo realizar la accion de crear usuario, disculpe las molestias', error: error.message }) 
  };
};

const changePassword = async (req, res) => {
  try {
    const { name, email, newPassword } = req.body;
    const user = await User.findOne({ name, email })
    
    if(!user){
      return response.status(400).json({message: 'usuario no existe'})
    };

    if(user.email === email && user.name === name){
       // use the tool bcrypt to generate a new encrypted password 
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hash = bcrypt.hashSync(newPassword, salt);
      user.password = hash
      //then we save it in the data base
      await user.save()
    };
    res.status(200).json({ message: 'el usuario cambio la contrasena con exito' })
  } catch (error) {
    res.status(500).json({ message: 'el usuario no pudo realizar la accion', error: error.message })
  }
}


module.exports = { addUser, changePassword }; 