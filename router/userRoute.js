const { Router } = require('express')
const route = Router()
const { addUser, loginUser, changePassword } = require('../controllers/userController')

route.post('/users', addUser)
route.post('/login', loginUser)
route.post('/users', changePassword)

module.exports = route