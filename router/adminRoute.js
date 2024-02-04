const { Route } = require('express')
const route = Route()
const { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteProducts, DeleteCanchas } = require('../controllers/adminController')

route.get('/admin/id', getAllUsers, getAllCancha, getAllProducts)
// route.post('/admin', createProduct, createCancha)
// route.delete('/admin', DeleteCanchas, DeleteProducts)

module.exports = route