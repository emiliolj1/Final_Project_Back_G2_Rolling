require('dotenv').config();
const mongoose = require('mongoose');

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION)
    console.log('Succesfull connection to the DB')
  } catch (error) {
    console.log('oh, sorry we cant connect to the DB');
    console.log(error);
  }
}

connectionDB();

module.exports = { connectionDB }