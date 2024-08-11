require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const mongoose = require('mongoose')

const app = express();
app.use(cors()); 
app.use(express.json());
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGO_URI;

const dbconnect = async()=>{
  await mongoose.connect(URL).then(
    console.log('Connected to the DB')
  ).catch((err)=>{
    console.log('Error at connecting to the DB',err.message)
  })
}
dbconnect()

app.use(require('./routes/product.routes'))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
