require('dotenv').config();
const mongoose = require('mongoose');

const connectionDB = () => {
  mongoose.connect(process.env.DB_CONNECTION)
  .then( success => console.log('DB CONNECTED'))
  .catch(error => console.log(error))
}

connectionDB();

module.exports = { connectionDB }