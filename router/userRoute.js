const { Route } = require('express')
const route = Route()
const { addUser, loginUser, changePassword } = require('../controllers/userController')

route.post('/users', addUser)
route.get('/users', loginUser)
route.post('/users', changePassword)

module.exports = route