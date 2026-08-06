const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateInterviewReport({ resume, selfDescription, jobDescription, Title, userId }) {
  if (!jobDescription) {
    throw new Error("Job description is required to generate an interview report.");
  }

  const systemPrompt = `You are an expert technical recruiter and senior interviewer. You MUST generate a massive, comprehensive interview preparation report.

CRITICAL HARD REQUIREMENTS:
- "technicalQuestionSchema": You MUST output EXACTLY 10 distinct, highly technical interview questions. Do NOT output fewer than 10.
- "behavioralQuestionSchema": You MUST output EXACTLY 10 distinct behavioral questions using the STAR method. Do NOT output fewer than 10.
- "preparationPlanScehma": You MUST output EXACTLY 30 array items, one for each day from day 1 to day 30 continuously. Do NOT stop early.

Respond STRICTLY with a valid raw JSON object matching this schema:
{
  "title": "Job Title",
  "matchScore": 85,
  "technicalQuestionSchema": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "behavioralQuestionSchema": [
    { "question": "string", "intention": "string", "answer": "string" }
  ],
  "skillGapSchema": [
    { "skill": "string", "severity": "high", "recommendation": "string" }
  ],
  "preparationPlanScehma": [
    { "day": 1, "focus": "string", "tasks": "string", "resources": ["string"] }
  ]
}

Return ONLY raw JSON. No markdown ticks.`;

  const userPrompt = `Candidate Resume: ${resume || "N/A"}
Self Description: ${selfDescription || "N/A"}
Job Description: ${jobDescription}
Job Title: ${Title || "Software Engineer"}`;

  try {
    const response = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      model: 'llama-3.3-70b-versatile',
      temperature: 0.4, // Slight temperature boost for variety in large lists
      max_tokens: 8000,
      response_format: { type: 'json_object' }
    });

    const responseText = response.choices[0]?.message?.content;
    if (!responseText) throw new Error("Empty response from Groq AI.");

    let parsedData = JSON.parse(responseText);

    // --- SAFETY PADDING: Guarantee 10 Tech Questions ---
    if (!parsedData.technicalQuestionSchema) parsedData.technicalQuestionSchema = [];
    while (parsedData.technicalQuestionSchema.length < 10) {
      const index = parsedData.technicalQuestionSchema.length + 1;
      parsedData.technicalQuestionSchema.push({
        question: `Advanced Technical Question ${index}: How do you scale and optimize performance for high-throughput microservices?`,
        intention: "Evaluates architectural scalability, bottlenecks identification, and system design capability.",
        answer: "Focus on horizontal scaling, load balancing, database indexing, caching strategies (Redis), and asynchronous message queues."
      });
    }

    // --- SAFETY PADDING: Guarantee 10 Behavioral Questions ---
    if (!parsedData.behavioralQuestionSchema) parsedData.behavioralQuestionSchema = [];
    while (parsedData.behavioralQuestionSchema.length < 10) {
      const index = parsedData.behavioralQuestionSchema.length + 1;
      parsedData.behavioralQuestionSchema.push({
        question: `Behavioral Scenario ${index}: Describe a time when you faced a severe disagreement with a team member over technical choices. How did you resolve it?`,
        intention: "Assesses conflict resolution, teamwork, communication style, and professional maturity.",
        answer: "Use the STAR method: Situation (clashing tech stacks), Task (reaching consensus), Action (data-backed benchmarking and transparent discussion), Result (successful adoption of the optimal tool)."
      });
    }

    // --- SAFETY PADDING: Guarantee Full 30-Day Roadmap ---
    if (!parsedData.preparationPlanScehma) parsedData.preparationPlanScehma = [];
    const existingDays = new Set(parsedData.preparationPlanScehma.map(d => d.day));
    for (let dayNum = 1; dayNum <= 30; dayNum++) {
      if (!existingDays.has(dayNum)) {
        parsedData.preparationPlanScehma.push({
          day: dayNum,
          focus: `Core Mastery & Practical Implementation - Phase ${Math.ceil(dayNum / 10)}`,
          tasks: `Day ${dayNum} targeted study, practicing coding patterns, architectural design reviews, and mock problem solving.`,
          resources: ["Official Documentation", "System Design Primer", "Practice Labs"]
        });
      }
    }
    // Sort roadmap by day number ascending
    parsedData.preparationPlanScehma.sort((a, b) => a.day - b.day);

    return {
      ...parsedData,
      title: Title || parsedData.title || jobDescription.substring(0, 30) + "..."
    };

  } catch (error) {
    console.error("Error generating interview report with Groq:", error);
    throw error;
  }
}

module.exports = { generateInterviewReport };