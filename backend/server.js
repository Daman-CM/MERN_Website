//In this file we create the Express App , use a bit of Middleware
//We register the Routes and connect to MongoDB(the Uri is stored in a hidden folder for safety)
//This app has depencies so remember to install dotenv, nodemon, express and mongoose 
require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
//NEED TO CHANGE THIS!!!!!
const workoutRoutes = require('./routes/workouts')

// express app
const app = express()


//middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts',workoutRoutes)


//connect to db
mongoose.connect(process.env.MONGO_URI)
.then(() => {
//listen for requests
app.listen(process.env.PORT,  () => {
    console.log('connected to db and listening on port', process.env.PORT)
})
})
.catch((error) => {
 console.log(error)
})




process.env