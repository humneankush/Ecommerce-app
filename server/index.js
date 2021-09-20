const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const app  = express()


const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')


mongoose
.connect(process.env.MONGO_URL)
.then(()=>console.log('connected to the database'))
.catch((err)=>{
    console.log(err)
})


app.use(express.json())

// routes
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)



app.listen(process.env.PORT || 5500,()=>{
    console.log("app is running")
})
