# 🚀 AI-Powered Interview Preparation Platform

An end-to-end, full-stack Web Application designed to help job seekers crack technical and behavioral interviews. Powered by **Groq Llama 3.3 70B**, the platform analyzes a candidate's resume, job description, and self-assessment notes to generate custom technical questions, STAR-formatted behavioral scenarios, a skill gap analysis, and a structured 30-day preparation roadmap.

---

### ✨ Key Features
* 📄 **Resume & Job Description Analysis:** Parses candidate resumes (PDF) alongside targeted Job Descriptions to evaluate alignment and role suitability.
* 📊 **Match Score & Skill Gap Identification:** Computes a overall compatibility score and highlights critical skill gaps categorized by severity (`High`, `Medium`, `Low`) with actionable recommendations.
* 💻 **Targeted Technical Questions:** Generates 10+ role-specific, high-yield technical questions complete with interviewer intent and ideal answers.
* 🗣️ **Behavioral Strategy:** Provides 10+ situational behavioral questions formatted with interviewer intent and suggested STAR response strategies.
* 📅 **30-Day Structured Roadmap:** Outlines a day-by-day learning plan complete with daily focus topics, tasks, and study resources.
* 🔒 **Secure Authentication:** Complete JWT-based authentication flow with token blacklisting, secure HTTP-only cookies, and protected user routes.

---

### 🛠️ Tech Stack
* **Frontend:** React, React Router, Axios, Lucide React, Custom CSS (Glassmorphism UI)
* **Backend:** Node.js, Express.js, Multer (File Handling)
* **AI Engine:** Groq SDK (`llama-3.3-70b-versatile` model)
* **Database:** MongoDB, Mongoose
* **Authentication:** JSON Web Tokens (JWT), Cookie Parser
