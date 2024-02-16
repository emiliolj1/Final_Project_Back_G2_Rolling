const { Router } = require('express')
const route = Router()
const { bookins, getAllBookin, deleteBookin } = require('../controllers/bookinController')

route.get('/getBookins', getAllBookin)

route.post('/reserva', bookins);

route.delete('/deleteBookin', deleteBookin)

module.exports = route;