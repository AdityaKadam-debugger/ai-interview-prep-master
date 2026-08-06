require("dotenv").config()
const app = require("./app")
const cookieParser = require("cookie-parser")
const ConnectToDB = require("../config/database")
const { connect } = require("mongoose")
const { generateInterviewReport } = require("../services/ai.service");



ConnectToDB()
generateInterviewReport({
    resume: "Resume",
    selfDescription: "Self description",
    jobDescription: "Backend Developer"
});

app.use(cookieParser())

app.listen(3000,()=>{
    console.log("Server is Running on port 3000..........")
})