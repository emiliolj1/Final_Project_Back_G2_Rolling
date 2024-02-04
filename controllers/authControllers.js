const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email});
//     if(!user) return res.status(400).json({ message: 'usuario no existente'});
    
//     const isMatch = bcrypt.compareSync(password, user.password);
//     if(!isMatch) return res.status(400).json({message: 'contraseña erronea'});

//     const accessToken = jwt.sign({ 
//       name: user.name, 
//       email: user.email, 
//       role: user.role
//     },
//       process.env.ACCESS_TOKEN_SECRET, 
//     {
//       expiresIn: 30 //por defecto en segundos.
//     });

//     const refreshToken = jwt.sign({
//       name: user.name, 
//       email: user.email, 
//       role: user.role
//     },
//     process.env.REFRESH_TOKEN_SECRET,
//     {
//       expiresIn: '1d'
//     });

//     user.refreshToken = refreshToken;
//     await user.save();

//     res.cookie('refreshToken', refreshToken, { 
//       httpOnly: true, 
//       sameSite: 'None', 
//       secure: true,
//       maxAge: 24*60*60*1000
//     })
//     res.status(200).json({ accessToken });
//   } catch (error) {
//     res.status(500).json({message: 'todo mal' })
//   }
// }

const loginUser =  async (request, response) => {
  try {
    const {email, password} = request.body
    
    const user = await User.findOne({ email })
    // searching for the user if it exists 
    if(!user){
      return response.status(400).json({message: 'usuario no existe'})
    }

    // the user exist, their password is the same?
    const isMatch = bcrypt.compareSync(password, user.password)
    if(!isMatch){
      return response.status(400).json({ message: 'contraseña invalida' })
    }

    const accessToken = jwt.sign(
      { 
        email: user.email,
        Name: user.Name,
        role: user.role
      }, 
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '120s'
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

    response.cookie('refreshToken', refreshToken, { 
      httpOnly: true, 
      sameSite: 'None', 
      secure: true, 
      maxAge: 24 * 60 * 60 * 1000 
    })
    response.status(200).json({ accessToken, message: 'Succesfull User Logged'})
  } catch (error) {
    response.status(500).json({ message: error.message })
  }
};

module.exports = { loginUser };