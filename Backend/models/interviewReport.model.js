const mongoose = require('mongoose');

const technicalQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false });

const behavioralQuestionSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    intention: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    }
}, { _id: false });

const skillGapSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: [true, "Skill is required"]
    },
    severity: {
        type: String,
        // Lowercase allow karne ke saath common AI outputs ko include kar diya
        enum: ["low", "medium", "high", "minor", "moderate", "major"],
        lowercase: true,
        default: "medium"
    },
    recommendation: {
        type: String
    }
}, { _id: false });

const preparationPlanScehma = new mongoose.Schema({
    day: {
        type: Number,
        default: 1
    },
    focus: {
        type: String
    },
    tasks: {
        type: String
    },
    // Flex-support: Agar AI focusArea ya timeline bhej de to bhi record save ho jaye
    focusArea: String,
    skill: String,
    timeline: String,
    resources: [String]
}, { _id: false });

const interviewReportSchema = new mongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job Description is Required"],
    },
    resume: {
        type: String,
    },
    selfDescription: {
        type: String
    },
    matchScore: {
        type: Number,
        min: 0,
        max: 100
    },
    title: {
    type: String,
    required: [true, 'Job Title is required'],
    default: 'Interview Preparation Report' // <--- Ye default validation error rokk dega
  },
    technicalQuestion: [technicalQuestionSchema],
    behavioralQuestion: [behavioralQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanScehma],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true },
);

const interviewReportModel = mongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;