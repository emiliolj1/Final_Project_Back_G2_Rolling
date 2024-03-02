const { Router } = require('express');
const route = Router();
const { handleLogout } = require('../controllers/logoutController');

route.get('/logout', handleLogout);

module.exports = route;