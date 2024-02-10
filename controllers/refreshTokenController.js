const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (req, res) => {
    try {
        const cookies = req.cookies;
        if(!cookies?.refresToken){
            return res.status(401).json({message:'no permitido'})
        }
        const refreshToken = cookies.refresToken;

        const user =  await User.findOne({ refreshToken })
        if(!user){
            return res.status(403).json({message:'no permitido'})
        }

        jwt.verify(
            refreshToken,
            process.env.REFRES_TOKEN_SECRETE,
            (error, decode) => {
                const accessToken = jwt.sign({
                    email: decode.Email,
                    Name: decode.Name,
                    role: decode.Role
                }, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: '3600'})
                res.json({accessToken})
            }
        )
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = { handleRefreshToken };