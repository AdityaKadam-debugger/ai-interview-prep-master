const express = require('express')
const cookieParser = require("cookie-parser")
const cors = require("cors")
const app = express()

// This Middleware Helps us to read data from our Request.body means from the browser
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

// Required all The Routes Here
const authRouter = require("../routes/auth.routes")
const interviewRouter = require("../routes/interview.routes")

// Using All The Routes Here
app.use("/api/auth",authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app