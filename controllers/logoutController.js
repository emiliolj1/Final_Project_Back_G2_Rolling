const { response } = require('express')
const User = require('../models/userModel')

const handleLogout = async ( request, response ) => {
    try {
        const cookies = request.cookies;
        if(!cookies?.refreshToken){
            return response.status(204).json({message: 'cookies no presentes'})
        }
        const refreshToken = cookies.refreshToken;

        const user = await User.findOne({refreshToken})
        if(!user){
            response.clearCookies('refreshToken', {httpOnly: true, sameSite: 'None', secure: true})
            return response.status(204).json({message:'Cookies borradas'})
        }

        user.refreshToken = '';
        await user.save()

        response.clearCookies('refreshToken',  {httpOnly: true, sameSite: 'None', secure: true})
        response.status(204).json({message:'Usuario y cookies borradas'})
    } catch (error) {
        response.status(500).json(error)
    }
}

module.exports = { handleLogout }