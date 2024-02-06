const { Router } = require('express')
const route = Router()
const { bookins, getAllBookin, checkTime, deleteBookin } = require('../controllers/bookinController')

route.post('/reserva', bookins);

module.exports = route;