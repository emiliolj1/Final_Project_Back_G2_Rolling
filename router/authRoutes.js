const { Router } = require('express')
const route = Router()
const { loginUser } = require('../controllers/authControllers');

route.post('/login', loginUser);

module.exports = route;