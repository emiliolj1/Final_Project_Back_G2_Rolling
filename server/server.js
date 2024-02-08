require('dotenv').config();
require('../database/dataBase');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const credentials = require('../middleWare/credentials');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { corsOptions } = require('../config/corsOptions');

//Controllers
const createProduct = require('../router/adminRoute');//create controllers
const createCancha = require('../router/adminRoute');
const creatBookin = require('../router/bookinRoutes');
const addUser = require('../router/userRoute');
const loginUser = require('../router/authRoutes');

const getAllUsers = require('../router/userRoute');//get controllers
const getAllProducts = require('../router/adminRoute');
const getAllCanchas = require('../router/adminRoute');
const getAllBookins = require('../router/bookinRoutes');

const DeleteProduct = require('../router/adminRoute');//delete controllers
const DeleteCancha = require('../router/adminRoute');
const DeleteUser = require('../router/adminRoute');
//const deleteBookin = require('../router/bookinRoutes');

const changePassword = require('../router/userRoute');
const changeRole = require('../router/adminRoute');//path controllers
const sendEmail = require('../router/userRoute');

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
app.use('/', sendEmail);

app.use('/', changePassword); //paths
app.use('/', changeRole)

app.use('/', createProduct); // post
app.use('/', createCancha);
app.use('/', creatBookin);

app.use('/', getAllProducts); // get
app.use('/', getAllUsers);
app.use('/', getAllCanchas);
app.use('/', getAllBookins);

app.use('/', DeleteCancha); // delete's
app.use('/', DeleteProduct);
app.use('/', DeleteUser);
//app.use('/', deleteBookin);


app.listen(process.env.PORT, () => {
    console.log(`Escuchando por el puerto ${process.env.PORT}`);
})