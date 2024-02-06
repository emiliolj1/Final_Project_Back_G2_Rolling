require('dotenv').config();
require('../database/dataBase');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const credentials = require('../middleWare/credentials');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { corsOptions } = require('../config/corsOptions');

// Controllers
const addUser = require('../router/userRoute');//users controllers
const loginUser = require('../router/authRoutes');
const changePassword = require('../router/userRoute');

const createProduct = require('../router/adminRoute');//create controllers
//const createCancha = require('../router/adminRoute');
//const creatBookin = require('')

//const getAllUsers = require('../router/userRoute');//get controllers
const getAllProducts = require('../router/adminRoute');
//const getAllCanchas = require('../router/adminRoute');
//const getAllBookins = require('')

//const DeleteProduct = require('../router/adminRoute');//delete controllers
//const DeleteCancha = require('../router/adminRoute');
//const DeleteBookin = require()

//const changeRole = require('../router/adminRoute');//path controllers

//Middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(credentials);
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

//Routes
app.use('/', addUser);
app.use('/', loginUser);

app.use('/', changePassword);
//app.use('/', changeRole)

app.use('/', createProduct);
//app.use('/', createCancha);

app.use('/', getAllProducts);
//app.use('/', getAllUsers);
//app.use('/', getAllCanchas);
//app.use('/', getAllBookins);

//app.use('/', DeleteCancha);
//app.use('/', DeleteProduct);
//app.use('/', DeleteBookin);


app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})