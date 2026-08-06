const express = require("express")
const authMiddleware = require("../middlewares/auth.middleware")
const interviewController = require("../controllers/interview.controller")
const upload = require("../middlewares/file.middleware")
const interviewRouter = express.Router()




// Post /api/interview/
// Desc:- Generate new interview report on the basis of user self desc , job desc , resume pdf  
// acess :- Private
interviewRouter.post("/",authMiddleware.authUser,upload.single("resume"),interviewController.MygenerateInterviewReport);

// Get /api/interview/report/:interviewId
// Desc:- get interview report by interviewId,
// access:- private 
interviewRouter.get("/report/:interviewId",authMiddleware.authUser,interviewController.generateInterviewReportByIdController,)


// This Api is to get all interview Reports of logged in user 
interviewRouter.get("report/getAllInterviewReports",authMiddleware.authUser,interviewController.getAllInterviewsReports)
module.exports = interviewRouter