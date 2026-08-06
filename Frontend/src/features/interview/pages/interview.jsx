import React, { useState } from 'react';
import { useInterview } from '../hooks/useInterview.js';
import { Code2, MessageSquare, Compass, Lightbulb, BookOpen } from 'lucide-react';

const Interview = ({ data }) => {
  const [activeTab, setActiveTab] = useState('roadmap');

  // Fallback Data
  const reportData = data || {
    matchScore: 85,
    technicalQuestionSchema: [
      {
        question: "How do you handle race conditions in MongoDB when performing concurrent write operations in a microservices environment?",
        intention: "To evaluate candidate's knowledge of concurrency control, distributed locking, and database consistency in microservices.",
        answer: "Use MongoDB Transactions, Optimistic Concurrency Control using version keys (__v), or Redlock (Redis distributed locks)."
      }
    ],
    behavioralQuestionSchema: [
      {
        question: "Describe a situation where a critical production bug occurred under high load. How did you handle it?",
        intention: "Assesses pressure handling, root-cause analysis skills, and crisis communication with stakeholders.",
        answer: "Focus on rollback strategy, log analysis (APM tools), immediate hotfix deployment, and writing a post-mortem report."
      }
    ],
    skillGapSchema: [
      {
        skill: "Message Queues (Kafka/RabbitMQ)",
        severity: "high",
        recommendation: "Learn event-driven architecture and practice building a pub-sub worker queue."
      },
      {
        skill: "Advanced Docker & CI/CD Pipelines",
        severity: "medium",
        recommendation: "Practice multi-stage builds and setting up GitHub Actions workflows."
      },
      {
        skill: "Production-level Redis management",
        severity: "low",
        recommendation: "Review Redis cache invalidation strategies and cluster configuration."
      }
    ],
    preparationPlanScehma: [
      {
        day: 1,
        focus: "Node.js Internals & Event Loop",
        tasks: "Deep dive into Event Loop phases, process.nextTick vs setImmediate, and memory leak diagnosis.",
        resources: ["Node.js Docs", "Node.js Event Loop Deep Dive Guide"]
      },
      {
        day: 2,
        focus: "MongoDB Aggregations & Indexing",
        tasks: "Practice writing complex aggregation pipelines and optimizing queries using .explain('executionStats').",
        resources: ["MongoDB University", "Indexing Best Practices"]
      }
    ]
  };

  const getSeverityStyle = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'high':
        return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.25)' };
      case 'medium':
        return { color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.25)' };
      case 'low':
      default:
        return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.25)' };
    }
  };

  const matchScore = reportData?.matchScore ?? 0;
  const technicalQuestions = reportData?.technicalQuestionSchema || [];
  const behavioralQuestions = reportData?.behavioralQuestionSchema || [];
  const skillGaps = reportData?.skillGapSchema || [];
  const roadmapItems = reportData?.preparationPlanScehma || [];

  return (
    <>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .interview-root {
          min-height: 100vh;
          width: 100vw;
          background-color: #0d111a;
          color: #94a3b8;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
        }

        .dashboard-container {
          width: 100%;
          max-width: 1300px;
          background: #111622;
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          display: grid;
          grid-template-columns: 240px 1fr 300px;
          min-height: 750px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
        }

        @media (max-width: 1024px) {
          .dashboard-container { 
            grid-template-columns: 1fr; 
          }
        }

        /* LEFT SIDEBAR */
        .sidebar-left {
          background: #0e121d;
          padding: 2rem 1.25rem;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
        }

        .section-label {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #475569;
          margin-bottom: 1.25rem;
          text-transform: uppercase;
        }

        .nav-menu { display: flex; flex-direction: column; gap: 0.5rem; }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          color: #64748b;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          text-align: left;
        }

        .nav-item:hover { color: #e2e8f0; background: rgba(255, 255, 255, 0.03); }

        .nav-item.active {
          color: #ffffff;
          background: linear-gradient(90deg, rgba(225, 29, 72, 0.2) 0%, rgba(225, 29, 72, 0.05) 100%);
          border-left: 3px solid #e11d48;
        }

        .nav-item.active svg { color: #f43f5e; }

        /* CENTER CONTENT AREA */
        .main-content { padding: 2.5rem; background: #111622; overflow-y: auto; }

        .content-header { display: flex; align-items: baseline; gap: 0.75rem; margin-bottom: 2.5rem; }
        .content-title { font-size: 1.5rem; font-weight: 700; color: #ffffff; }
        .content-subtitle { font-size: 0.85rem; color: #475569; }

        /* ROADMAP TIMELINE */
        .timeline-container { display: flex; flex-direction: column; position: relative; }

        .timeline-item { display: flex; gap: 1.5rem; position: relative; padding-bottom: 2rem; }
        .timeline-item:last-child { padding-bottom: 0; }

        .timeline-item:not(:last-child)::after {
          content: '';
          position: absolute;
          left: 7px;
          top: 20px;
          bottom: 0;
          width: 2px;
          background: rgba(225, 29, 72, 0.25);
        }

        .timeline-dot {
          width: 16px; height: 16px; border-radius: 50%;
          border: 2px solid #f43f5e; background: #111622;
          margin-top: 4px; z-index: 2; flex-shrink: 0;
        }

        .timeline-body { flex: 1; }

        .day-tag { color: #f43f5e; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.25rem; display: block; }
        .day-title { color: #ffffff; font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; }
        .task-desc { font-size: 0.875rem; color: #94a3b8; line-height: 1.5; margin-bottom: 0.75rem; }

        .resource-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .resource-pill {
          font-size: 0.725rem; padding: 0.2rem 0.6rem; border-radius: 4px;
          background: #1e293b; color: #38bdf8; display: inline-flex; align-items: center; gap: 0.3rem;
        }

        /* QUESTION CARDS */
        .card-item {
          background: #0e121d; border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px; padding: 1.25rem; margin-bottom: 1.25rem;
        }

        .card-question { font-size: 0.95rem; font-weight: 600; color: #ffffff; margin-bottom: 0.85rem; line-height: 1.4; }

        .intention-box {
          font-size: 0.8rem; color: #fbbf24; background: rgba(251, 191, 36, 0.08);
          border: 1px solid rgba(251, 191, 36, 0.2); border-radius: 6px;
          padding: 0.6rem 0.85rem; margin-bottom: 0.75rem; display: flex; gap: 0.5rem; align-items: flex-start;
        }

        .answer-box {
          font-size: 0.825rem; color: #cbd5e1; background: rgba(255, 255, 255, 0.02);
          border-left: 3px solid #f43f5e; padding: 0.6rem 0.85rem; border-radius: 0 6px 6px 0;
        }

        .answer-label { color: #e2e8f0; font-weight: 700; }

        /* RIGHT SIDEBAR */
        .sidebar-right {
          background: #0e121d; padding: 2rem 1.25rem;
          border-left: 1px solid rgba(255, 255, 255, 0.05);
          display: flex; flex-direction: column; gap: 2rem;
        }

        .widget-title {
          font-size: 0.7rem; font-weight: 700; letter-spacing: 0.1em;
          color: #475569; margin-bottom: 1.25rem; text-transform: uppercase;
        }

        /* SCORE CIRCLE */
        .score-box { display: flex; flex-direction: column; align-items: center; gap: 1rem; }
        .circle-progress {
          position: relative; width: 90px; height: 90px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
        }
        .circle-inner {
          width: 74px; height: 74px; background: #0e121d; border-radius: 50%;
          display: flex; flex-direction: column; align-items: center; justify-content: center;
        }
        .score-value { font-size: 1.5rem; font-weight: 800; color: #ffffff; line-height: 1; }
        .score-text { font-size: 0.75rem; color: #22c55e; font-weight: 600; text-align: center; }

        /* SKILL GAPS LIST */
        .gaps-container { display: flex; flex-direction: column; gap: 0.85rem; }

        .gap-card {
          padding: 0.75rem 0.85rem; border-radius: 8px; border: 1px solid;
          display: flex; flex-direction: column; gap: 0.35rem;
        }

        .gap-title-row { display: flex; justify-content: space-between; align-items: center; }
        .gap-skill { font-size: 0.8rem; font-weight: 700; }
        .gap-severity { font-size: 0.65rem; text-transform: uppercase; font-weight: 800; padding: 0.1rem 0.4rem; border-radius: 4px; }
        .gap-rec { font-size: 0.725rem; color: #94a3b8; line-height: 1.3; }

        .empty-state {
          font-size: 0.875rem; color: #64748b; padding: 2rem 0; text-align: center;
        }
      `}</style>

      <main className="interview-root">
        <div className="dashboard-container">
          
          {/* LEFT SIDEBAR: Navigation */}
          <aside className="sidebar-left">
            <div className="section-label">SECTIONS</div>
            <nav className="nav-menu">
              <button
                className={`nav-item ${activeTab === 'technical' ? 'active' : ''}`}
                onClick={() => setActiveTab('technical')}
              >
                <Code2 size={16} />
                <span>Technical Questions</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'behavioral' ? 'active' : ''}`}
                onClick={() => setActiveTab('behavioral')}
              >
                <MessageSquare size={16} />
                <span>Behavioral Questions</span>
              </button>

              <button
                className={`nav-item ${activeTab === 'roadmap' ? 'active' : ''}`}
                onClick={() => setActiveTab('roadmap')}
              >
                <Compass size={16} />
                <span>Road Map</span>
              </button>
            </nav>
          </aside>

          {/* CENTER PANEL: Main Content Area */}
          <section className="main-content">
            
            {/* ROADMAP TAB */}
            {activeTab === 'roadmap' && (
              <div>
                <div className="content-header">
                  <h1 className="content-title">Preparation Road Map</h1>
                  <span className="content-subtitle">
                    {roadmapItems.length}-day plan
                  </span>
                </div>

                {roadmapItems.length === 0 ? (
                  <div className="empty-state">No roadmap plan available.</div>
                ) : (
                  <div className="timeline-container">
                    {roadmapItems.map((item, index) => (
                      <div key={index} className="timeline-item">
                        <div className="timeline-dot"></div>
                        <div className="timeline-body">
                          <span className="day-tag">Day {item.day}</span>
                          <h3 className="day-title">{item.focus}</h3>
                          <p className="task-desc">{item.tasks}</p>
                          
                          {item.resources && item.resources.length > 0 && (
                            <div className="resource-tags">
                              {item.resources.map((res, rIdx) => (
                                <span key={rIdx} className="resource-pill">
                                  <BookOpen size={11} /> {res}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TECHNICAL QUESTIONS TAB */}
            {activeTab === 'technical' && (
              <div>
                <div className="content-header">
                  <h1 className="content-title">Technical Questions</h1>
                </div>

                {technicalQuestions.length === 0 ? (
                  <div className="empty-state">No technical questions available.</div>
                ) : (
                  technicalQuestions.map((q, idx) => (
                    <div key={idx} className="card-item">
                      <div className="card-question">{idx + 1}. {q.question}</div>
                      
                      {q.intention && (
                        <div className="intention-box">
                          <Lightbulb size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span><strong>Interviewer Intention:</strong> {q.intention}</span>
                        </div>
                      )}

                      <div className="answer-box">
                        <span className="answer-label">Suggested Answer:</span> {q.answer}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* BEHAVIORAL QUESTIONS TAB */}
            {activeTab === 'behavioral' && (
              <div>
                <div className="content-header">
                  <h1 className="content-title">Behavioral Questions</h1>
                </div>

                {behavioralQuestions.length === 0 ? (
                  <div className="empty-state">No behavioral questions available.</div>
                ) : (
                  behavioralQuestions.map((q, idx) => (
                    <div key={idx} className="card-item">
                      <div className="card-question">{idx + 1}. {q.question}</div>

                      {q.intention && (
                        <div className="intention-box">
                          <Lightbulb size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                          <span><strong>Interviewer Intention:</strong> {q.intention}</span>
                        </div>
                      )}

                      <div className="answer-box">
                        <span className="answer-label">Suggested Strategy:</span> {q.answer}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </section>

          {/* RIGHT SIDEBAR: Match Score & Skill Gaps */}
          <aside className="sidebar-right">
            
            {/* Match Score Circle */}
            <div className="widget-card">
              <div className="widget-title">MATCH SCORE</div>
              <div className="score-box">
                <div 
                  className="circle-progress"
                  style={{
                    background: `conic-gradient(#22c55e 0% ${matchScore}%, #1e293b ${matchScore}% 100%)`
                  }}
                >
                  <div className="circle-inner">
                    <span className="score-value">{matchScore}%</span>
                  </div>
                </div>
                <div className="score-text">
                  {matchScore >= 80 ? 'Strong match for this role' : 'Moderate match for this role'}
                </div>
              </div>
            </div>

            {/* Skill Gaps with Recommendations */}
            <div className="widget-card">
              <div className="widget-title">SKILL GAPS</div>
              {skillGaps.length === 0 ? (
                <div className="empty-state">No skill gaps detected.</div>
              ) : (
                <div className="gaps-container">
                  {skillGaps.map((gap, index) => {
                    const style = getSeverityStyle(gap.severity);
                    return (
                      <div
                        key={index}
                        className="gap-card"
                        style={{ backgroundColor: style.bg, borderColor: style.border }}
                      >
                        <div className="gap-title-row">
                          <span className="gap-skill" style={{ color: style.color }}>
                            {gap.skill}
                          </span>
                          <span 
                            className="gap-severity" 
                            style={{ color: style.color, backgroundColor: 'rgba(0,0,0,0.3)' }}
                          >
                            {gap.severity}
                          </span>
                        </div>
                        {gap.recommendation && (
                          <p className="gap-rec">{gap.recommendation}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </aside>

        </div>
      </main>
    </>
  );
};

export default Interview;