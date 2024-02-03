require('dotenv').config();
require('../database/dataBase')
const express = require('express')
const app = express()

const addUser = require('../router/userRoute')
// const loginUser = require('../router/userRoute')
// const createProduct = require('../router/adminRoute')
// const createCancha = require('../router/adminRoute')
// const getAllUsers = require('../router/adminRoute')
// const getAllProducts = require('../router/adminRoute')
// const getAllCancha = require('../router/adminRoute')
// const DeleteProducts = require('../router/adminRoute')
// const DeleteCanchas = require('../router/adminRoute')

//Middleware
app.use(express.json());

//Routes
app.use('/', addUser);

app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})