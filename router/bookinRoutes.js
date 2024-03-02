const { Router } = require('express');
const route = Router();
const { bookins, deleteBookin } = require('../controllers/bookinController');


route.post('/reserva', bookins);
route.delete('/deleteBookin', deleteBookin);

module.exports = route;