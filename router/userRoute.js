const { Router } = require('express')
const route = Router()
const { addUser, changePassword } = require('../controllers/userController')
const { getAllUsers } = require('../controllers/adminController')

route.post('/users', addUser)
route.post('/change', changePassword)
route.get('/obtener', getAllUsers)

module.exports = route