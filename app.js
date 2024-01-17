require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()
//Import db connection function
const connectDB = require('./db/connect')

const authenticateAdmin = require('./middlewares/authenticateAdmin')

//Import Routes
const adminRouter = require('./routes/adminRouter')
const drugsRouter = require('./routes/drugsRouter')

//Import Error Handlers
const notFound = require('./middlewares/notFound')
const errorHandlerMiddleware = require('./middlewares/errorMiddleware')

//Middlewares
app.use(express.json())

//Routes
app.use('/api/v1/auth', adminRouter)
app.use('/api/v1/drugs', authenticateAdmin, drugsRouter)

//Error Handler || 404
app.use(notFound)
app.use(errorHandlerMiddleware)

//DB CONNECTIONN
const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()


