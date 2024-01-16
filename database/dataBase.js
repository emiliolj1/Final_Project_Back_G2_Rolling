const mongoose = require('mongoose');
require('dotenv').config();

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('Succesfull connection to the DB')
  } catch (error) {
    console.log('oh, sorry we cant connect to the DB');
    console.log(error);
  }
}

connectionDB()
module.exports = { connectionDB }