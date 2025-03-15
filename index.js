const express = require("express")
const cors = require("cors")
const path = require('path')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 5000
connectDB()

app.use(cors())
app.use(express.json({extended: true}))

app.use('/api/file', require('./routes/file'))
app.use('/api/user', require('./routes/user'))

app.listen(PORT, ()=> console.log("Start server : ", PORT))
