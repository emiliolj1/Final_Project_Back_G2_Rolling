const { Router } = require('express')
const route = Router()
const { addUser, changePassword } = require('../controllers/userController')

route.post('/users', addUser)
route.post('/users', changePassword)

module.exports = route