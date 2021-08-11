const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const app = express();
const connectDB = require('./server/database/connection');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({path:'config.env'})
const PORT = process.env.PORT

//connecting to connectDB
connectDB();

//middleware bodypaerser to accept urlencoded
app.use(bodyparser.urlencoded({extended: true}))

//Bodyparser to accept Json Payload
app.use(bodyparser.json());

//load routers
app.use('/student',require('./routes/router'));

app.listen(PORT, () => {console.log(`web server is running on port http://localhost:${PORT}`)});




