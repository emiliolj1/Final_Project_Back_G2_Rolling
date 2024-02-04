require('dotenv').config();
require('../database/dataBase')
const express = require('express')
const app = express()
const credentials = require('../middleWare/credentials');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const { corsOptions } = require('../config/corsOptions')

//Controllers
const addUser = require('../router/userRoute')
const loginUser = require('../router/authRoutes');
const changePassword = require('../router/userRoute')
// const createProduct = require('../router/adminRoute')
// const createCancha = require('../router/adminRoute')
// const getAllUsers = require('../router/adminRoute')
// const getAllProducts = require('../router/adminRoute')
// const getAllCancha = require('../router/adminRoute')
// const DeleteProducts = require('../router/adminRoute')
// const DeleteCanchas = require('../router/adminRoute')

//Middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/', addUser);
app.use('/', loginUser);
app.use('/', changePassword)

app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})