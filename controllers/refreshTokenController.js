const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const handleRefreshToken = async (request, response) => {
    try {
        const cookies = request.cookies;
        if(!cookies?.refresToken){
            return response.status(401).json({message:'no permitido'})
        }
        const refreshToken = cookies.refresToken;

        const user =  await User.findOne({ refreshToken })
        if(!user){
            return response.status(403).json({message:'no permitido'})
        }

        jwt.verify(
            refreshToken,
            process.env.REFRES_TOKEN_SECRETE,
            (error, decode) => {
                const accessToken = jwt.sign({
                    email: decode.email,
                    Name: decode.Name,
                    role: decode.role
                }, process.env.ACCESS_TOKEN_SECRETE, {expiresIn: '3600'})
                response.json({accessToken})
            }
        )
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = { handleRefreshToken };