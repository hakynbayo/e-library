const express = require('express');
const dbConnect = require('./config/dbConnect');
const usersRoute = require('./routes/usersRoute')
const error = require('./middlewares/errorhandlers')
const dotenv = require('dotenv');
const app = express();


// config   
dotenv.config();

// Body parser middleware
app.use(express.json());

// Connect to DB
dbConnect();


//Routes 
app.use('/api/users', usersRoute);


//error midware
app.use(error.errorHandler);


// Server

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`)
})