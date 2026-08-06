const pdfParseModule = require("pdf-parse");
const InterviewReport = require("../models/interviewReport.model");
const { generateInterviewReport } = require("../services/ai.service");

const MygenerateInterviewReport = async (req, res) => {
  try {
    const { jobDescription, selfDescription, title } = req.body;
    const resumeFile = req.file;

    if (!jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Job description is required."
      });
    }

    const userId = req.user?._id || req.user?.id || null;

    // 1. Call AI Service
    let aiData = await generateInterviewReport({
      jobDescription,
      selfDescription: selfDescription || "",
      resume: resumeFile ? resumeFile.path : "",
      Title: title,
      userId
    });

    // 2. Convert to plain JavaScript object if it's a Mongoose document
    const cleanAiData = aiData.toObject ? aiData.toObject() : { ...aiData };

    // 3. CRITICAL FIX: Remove _id so MongoDB auto-generates a NEW unique ID
    delete cleanAiData._id;
    delete cleanAiData.__v;

    // 4. Resolve Title
    const resolvedTitle = 
      title || 
      aiData?.title || 
      (typeof aiData?.Title === 'string' ? aiData.Title : null) || 
      jobDescription.substring(0, 30) + "...";

    // 5. Create NEW Document in MongoDB
    const interviewReport = await InterviewReport.create({
      ...cleanAiData,
      title: resolvedTitle,
      user: userId,
      jobDescription,
      selfDescription: selfDescription || ""
    });

    return res.status(201).json({
      success: true,
      interviewReport
    });

  } catch (error) {
    console.error("🔥 Controller Internal Error:", error);
    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error"
    });
  }
};
async function generateInterviewReportByIdController(req,res){

  const { interviewId } = req.params

  const interviewReport = await interviewReportModel.findOne({
      _id: interviewId,
      user: req.user.id
  })

  if(!interviewReport){
    return res.status(404).json({
      message: "Interview Report Not found"
    })
  }
  res.status(200).json({
    message:  "Interview Report Fetched Succesfully",
    data:{
      interviewReport
    }
  })
}
async function getAllInterviewsReports(req,res) {
  const interviewReports = await interviewReportModel.find({
    user: req.user.id
  }).sort({
    createdAt: -1
  }).select("-resume -selfDescriptio -jobDescription -__v -techbicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

  res.status(200).json({
    message:"Interview Reports Fetched Successfully...",
    interviewReports
  })

}
module.exports = {
  MygenerateInterviewReport,
  generateInterviewReportByIdController,
  getAllInterviewsReports,
};