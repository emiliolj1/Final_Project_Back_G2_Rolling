const { Router } = require('express');
const route = Router();
const { addUser, changePassword } = require('../controllers/userController');
const { sendEmail } = require('../controllers/sendEmail');

route.post('/users', addUser);
route.patch('/change', changePassword);
route.post('/sendEmail',sendEmail);


module.exports = route