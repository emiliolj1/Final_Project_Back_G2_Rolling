const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();


const loginUser =  async (req, res) => {
  try {
    const {email, password} = req.body
    
    const user = await User.findOne({ email })
    // searching for the user if it exists 
    if(!user){
      return res.status(400).json({message: 'usuario no existe'})
    }

    // the user exist, their password is the same?
    const isMatch = bcrypt.compareSync(password, user.password)
    if(!isMatch){
      return res.status(400).json({ message: 'contraseña invalida', error: error.message})
    }

    const accessToken = jwt.sign(
      { 
        id: user._id,
        Email: user.email,
        Name: user.name,
        Role: user.role,
        IsActive: user.isActive
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '300s'
      }
    )

    const refreshToken = jwt.sign(
      {
        id: user._id,
        Email: user.email,
        Name: user.name,
        Role: user.role,
        IsActive: user.isActive
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn:'1d'
      }
    )

    // saving the refreshtoken in the user
    user.refreshToken = refreshToken;
    await user.save()

    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      sameSite: 'None', 
      secure: true, 
      maxAge: 24 * 60 * 60 * 1000 
    })
    res.status(200).json({ accessToken, message: 'Succesfull User Logged'})
  } catch (error) {
    res.status(500).json({ message: 'no se pudo realizar la accion, disculpe las molestias', error: error.message})
  }
};

module.exports = { loginUser };