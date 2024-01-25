const { Route } = require('express')
const route = Route()
const { addUser, loginUser } = require('../controllers/userController')

route.post('/users', addUser)
route.get('/users', loginUser)

module.exports = route