import React, { useState, useRef } from 'react';
import { useInterview } from "../hooks/useInterview.js";
import { useNavigate } from "react-router";
import { Sparkles, Briefcase, User, FileText, UploadCloud, ArrowRight, Loader2 } from 'lucide-react';

const Home = () => {
  const { loading, generateReport } = useInterview();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  
  const resumeInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resumeFile = file || resumeInputRef.current?.files[0];

    if (!jobDescription || !resumeFile) {
      alert("Please provide both a job description and a resume file.");
      return;
    }

    try {
      const data = await generateReport({ jobDescription, selfDescription, resumeFile });
      if (data && data._id) {
        navigate(`/interview/${data._id}`);
      }
    } catch (error) {
      console.error('Error generating report:', error);
    }
  };

  return (
    <>
      {/* Integrated Embedded Styles */}
      <style>{`
        .home-container {
          min-height: 100vh;
          width: 100%;
          background-color: #0b0f19;
          color: #f8fafc;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
          position: relative;
          overflow: hidden;
          box-sizing: border-box;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .glow-orb-1 {
          position: absolute;
          top: -10%;
          left: -10%;
          width: 500px;
          height: 500px;
          background: rgba(79, 70, 229, 0.22);
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }

        .glow-orb-2 {
          position: absolute;
          bottom: -10%;
          right: -10%;
          width: 500px;
          height: 500px;
          background: rgba(6, 182, 212, 0.18);
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
        }

        .home-content {
          width: 100%;
          max-width: 650px;
          position: relative;
          z-index: 10;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.375rem 0.85rem;
          border-radius: 9999px;
          background: rgba(99, 102, 241, 0.12);
          border: 1px solid rgba(99, 102, 241, 0.25);
          color: #818cf8;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
        }

        .main-title {
          font-size: 2.25rem;
          font-weight: 700;
          color: #ffffff;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .sub-title {
          color: #94a3b8;
          font-size: 0.95rem;
          margin: 0 auto;
          line-height: 1.5;
        }

        .glass-card {
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(51, 65, 85, 0.7);
          border-radius: 1.25rem;
          padding: 2.25rem;
          box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.6);
        }

        .form-group {
          margin-bottom: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-label {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e2e8f0;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .asterisk {
          color: #818cf8;
        }

        .custom-textarea {
          width: 100%;
          background: rgba(2, 6, 23, 0.6);
          border: 1px solid #334155;
          border-radius: 0.75rem;
          padding: 0.875rem;
          font-size: 0.875rem;
          color: #f8fafc;
          outline: none;
          resize: none;
          box-sizing: border-box;
          font-family: inherit;
          transition: border-color 0.2s ease;
        }

        .custom-textarea:focus {
          border-color: #6366f1;
        }

        .file-dropzone {
          position: relative;
          border: 2px dashed #334155;
          background: rgba(2, 6, 23, 0.4);
          border-radius: 0.75rem;
          padding: 1.5rem;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }

        .file-dropzone:hover {
          border-color: rgba(99, 102, 241, 0.6);
          background: rgba(99, 102, 241, 0.05);
        }

        .file-input-hidden {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 20;
        }

        .icon-wrapper {
          padding: 0.75rem;
          background: #0f172a;
          border-radius: 9999px;
          border: 1px solid #334155;
          color: #94a3b8;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .file-text {
          font-size: 0.875rem;
          color: #cbd5e1;
          margin: 0;
        }

        .link-text {
          color: #818cf8;
          text-decoration: underline;
          text-underline-offset: 4px;
        }

        .selected-text {
          color: #34d399;
          font-weight: 600;
        }

        .file-subtext {
          font-size: 0.75rem;
          color: #64748b;
          margin: 0;
        }

        .submit-btn {
          width: 100%;
          padding: 0.875rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          background: linear-gradient(135deg, #6366f1 0%, #4f46e5 50%, #06b6d4 100%);
          color: #ffffff;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          box-shadow: 0 10px 20px -5px rgba(99, 102, 241, 0.35);
          transition: transform 0.2s ease, opacity 0.2s ease;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spin-loader {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .footer-note {
          text-align: center;
          font-size: 0.75rem;
          color: #475569;
          margin-top: 1.5rem;
        }
      `}</style>

      <main className="home-container">
        {/* Soft Ambient Background Glow Orbs */}
        <div className="glow-orb-1"></div>
        <div className="glow-orb-2"></div>

        {/* Content Container */}
        <div className="home-content">
          
          {/* Header Section */}
          <div className="header-section">
            <div className="badge">
              <Sparkles size={14} /> Powered by GenAI
            </div>
            <h1 className="main-title">Craft Your Career Advantage</h1>
            <p className="sub-title">
              Upload your resume and details to generate a personalized interview report, technical questions, and gap analysis.
            </p>
          </div>

          {/* Glassmorphic Form Card */}
          <div className="glass-card">
            <form onSubmit={handleSubmit}>
              
              {/* Job Description Input */}
              <div className="form-group">
                <label htmlFor="jobDescription" className="form-label">
                  <Briefcase size={16} color="#818cf8" /> Job Description <span className="asterisk">*</span>
                </label>
                <textarea
                  id="jobDescription"
                  name="jobDescription"
                  rows="4"
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the Job Description (requirements, tech stack, key responsibilities)..."
                  className="custom-textarea"
                />
              </div>

              {/* Self Description Input */}
              <div className="form-group">
                <label htmlFor="selfDescription" className="form-label">
                  <User size={16} color="#22d3ee" /> Self Description / Notes
                </label>
                <textarea
                  id="selfDescription"
                  name="selfDescription"
                  rows="3"
                  value={selfDescription}
                  onChange={(e) => setSelfDescription(e.target.value)}
                  placeholder="Briefly describe your current role, goals, or key strengths you want to emphasize..."
                  className="custom-textarea"
                />
              </div>

              {/* Resume PDF Upload */}
              <div className="form-group">
                <label className="form-label">
                  <FileText size={16} color="#34d399" /> Upload Resume (PDF) <span className="asterisk">*</span>
                </label>

                <div className="file-dropzone">
                  <input
                    ref={resumeInputRef}
                    type="file"
                    id="resume"
                    name="resume"
                    accept=".pdf"
                    required
                    onChange={handleFileChange}
                    className="file-input-hidden"
                  />
                  <div className="icon-wrapper">
                    <UploadCloud size={22} />
                  </div>
                  <p className="file-text">
                    {file ? (
                      <span className="selected-text">Selected: {file.name}</span>
                    ) : (
                      <>
                        <span className="link-text">Click to upload</span> or drag and drop
                      </>
                    )}
                  </p>
                  <p className="file-subtext">PDF file format only (Max 5MB)</p>
                </div>
              </div>

              {/* Submit Action Button */}
              <button type="submit" disabled={loading} className="submit-btn">
                {loading ? (
                  <>
                    <Loader2 size={16} className="spin-loader" />
                    <span>Analyzing Profile & Generating Report...</span>
                  </>
                ) : (
                  <>
                    <span>Generate Interview Report</span>
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </div>

          <p className="footer-note">
            🔒 Your data and uploaded documents are processed securely and privately.
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;