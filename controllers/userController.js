require('dotenv').config();
const { response } = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const addUser = async (request, response) => {
  // in a constant we put everything we want to control
  const { Name, email, password, role, refreshToken} = request.body
  try {
    // we use the schema
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
    const myModal = new bootstrap.Modal(document.getElementById(''),{});
    myModal.show()
  } catch (error) {
    response.status(400).json({ message: 'no se pudo crear el usuario' })
    const myModal = new bootstrap.Modal(document.getElementById(''),{});
    myModal.show() 
  }
};

const loginUser =  async (request, response) => {
  try {
    const {email, password} = request.body
    const user = await User.findOne({ email })

    // searching for the user if it exists 
    if(!user){
      const myModal = new bootstrap.Modal(document.getElementById('ModalError'), {});
      myModal.show()
      return response.status(400).json({message: 'usuario no existe'})
    }

    // the user exist, their password is the same?
    const isMatch = bcrypt.compareSync(password, user.password)
    if(!isMatch){
      const myModal = new bootstrap.Modal(document.getElementById('ModalError'), {});
      myModal.show()
      return response.status(400).json({ message: 'contraseña invalida' })
    }

    const accessToken = jwt.sign(
      { 
        id: user._id,
        email: user.email,
        Name: user.Name,
        role: user.role
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '60s'
      }
    )

    const refreshToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
        Name: user.Name,
        role: user.role
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:'1d'
      }
    )

    // saving the refreshtoken in the user
    user.refreshToken = refreshToken;
    await user.save()

    response.cookie('refreshToken', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 })
    response.status(200).json({ accessToken })
    const myModal = new bootstrap.Modal(document.getElementById('ModalError'), {});
    myModal.show()
  } catch (error) {
    response.status(500).json({ message: error.message })
    const myModal = new bootstrap.Modal(document.getElementById('ModalError'), {});
    myModal.show()
  }
};

const changePassword = async () => {
  try {
    
  } catch (error) {
    
  }
}


module.exports = { addUser, loginUser };