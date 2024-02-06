const { Router } = require('express')
const route = Router()
const { bookins, getAllBookin, checkTime, deleteBookin } = require('../controllers/bookinController')

route.get('/getBookins', getAllBookin)

route.post('/reserva', bookins);

route.delete('/checktime', checkTime)
route.delete('/deleteBookin', deleteBookin)

module.exports = route;