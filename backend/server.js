const express = require("express")
const dotenv = require("dotenv").config()
const {errorHandler} = require("./middleware/errMiddleware")
const colors = require("colors")
const connectDB = require("./config/db")
const port = process.env.PORT || 5000

connectDB()
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use("/api/goals", require("./routes/goalRoutes"))
app.use(errorHandler)

app.listen(port, ()=> console.log(`server started on port no ${port}`) )