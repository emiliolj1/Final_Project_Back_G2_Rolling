const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: 'usuario no existente'});
    
    const isMatch = bcrypt.compareSync(password, user.password);
    if(!isMatch) return res.status(400).json({message: 'contraseña erronea'});

    const accessToken = jwt.sign({ 
      name: user.name, 
      lastName: user.lastName,
      email: user.email, 
      role: user.role
    },
      process.env.ACCESS_TOKEN_SECRET, 
    {
      expiresIn: 30 //por defecto en segundos.
    });

    const refreshToken = jwt.sign({
      name: user.name, 
      lastName: user.lastName,
      email: user.email, 
      role: user.role
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: '1d'
    });

    //guardado de refreshToken
    user.refreshToken = refreshToken;
    await user.save();

    res.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      sameSite: 'None', 
      secure: true,
      maxAge: 24*60*60*1000
    })
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({message: error })
  }
}

module.exports = { loginUser };