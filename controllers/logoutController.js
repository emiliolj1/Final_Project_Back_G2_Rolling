const { User } = require('../models/userModel')

const handleLogout = async ( req, res ) => {
    try {
        const cookies = req.params;
        if(!cookies?.refreshToken){
            return res.status(200).json({message: 'cookies no presentes'})
        }
        const refreshToken = cookies.refreshToken;

        const user = await User.findOne({refreshToken})
        if(!user){
            res.clearCookies('refreshToken', {
                httpOnly: true, sameSite: 'None', secure: true
            })
            return response.status(200).json({message:'Cookies borradas'})
        }

        user.refreshToken = '';
        await user.save()

        res.clearCookies('refreshToken', {
            httpOnly: true, sameSite: 'None', secure: true
        })
        res.status(200).json({message:'Usuario y cookies borradas'})
    } catch (error) {
      res.status(500).json({message:''})
    }
}

module.exports = { handleLogout }