const { Router } = require('express')
const route = Router()
const { createProduct, createCancha, getAllProducts, getAllCancha, getAllUsers, DeleteProducts, DeleteCanchas, changeRole, DeleteUser } = require('../controllers/adminController')

//get all documents
route.get('/admin/getUsers', getAllUsers)
route.get('/admin/getProducts', getAllProducts)
route.get('/admin/getCanchas', getAllCancha)

// Create all products and cancha
route.post('/admin/createProduct', createProduct)
route.post('/admin/createCancha', createCancha)

// Path all products canchas and users
route.post('/admin/changeRole', changeRole)

// Delete al products and canchas
route.delete('/admin/deleteProduct', DeleteProducts)
route.delete('/admin/deleteCancha', DeleteCanchas)
route.delete('/admin/deleteUser', DeleteUser)

module.exports = route