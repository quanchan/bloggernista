// Import Dependencies
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/auth')
// Environment variables set up
const dotenv = require('dotenv')
dotenv.config()
// Global variable
const PORT = 8082;
//Connect to DB
mongoose.connect(process.env.DB_CONNECTION_STRING, 
    {useNewUrlParser: true, useUnifiedTopology: true},
    () => console.log("Connected to db!")

)

//Middlewware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.use(cors())

//Routes Middleware
app.use('/api/user', authRoute)

app.get('/', (req, res) => {
    res.send("Hello from server")
})



 


// Setup server
app.listen(PORT, () => {
    console.log("Server opened at port", PORT)
})