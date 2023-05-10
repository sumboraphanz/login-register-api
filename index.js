const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const conn = require("./conn.js")

require("dotenv").config()

const userRoute = require("./routes/user.js")
const movieRoute = require('./routes/movie.js')


const app = express()
app.use(cors())

app.use(express.json())

conn()

app.use(userRoute)
app.use(movieRoute)
    
app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`)
})