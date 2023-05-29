const mongoose = require('mongoose');
const DB =  "Mern_DB"
mongoose
  .connect('mongodb://127.0.0.1:27017/authdb')
  .then(() =>
    console.log(`Database connection establish, ${DB}`)
  )
  .catch((err) => console.log('Something went wrong with DB ', err));
