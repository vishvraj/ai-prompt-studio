export const templates = [
  /* ================= CODE & ENGINEERING ================= */

  {
    id: "code-review",
    title: "AI Code Review",
    description: "Review code for bugs, performance, and best practices",
    inputs: [
      {
        name: "Language",
        type: "select-search",
        options: ["JavaScript", "TypeScript", "Python", "Java", "C++", "Go"]
      },
      { name: "Code", type: "textarea" }
    ],
    systemPrompt: `
You are a senior software engineer.
Review the code strictly and objectively.
Focus on bugs, performance, readability, security, and scalability.
`
  },

  {
    id: "bug-finder",
    title: "Bug Finder",
    description: "Identify bugs and logical errors in code",
    inputs: [
      {
        name: "Language",
        type: "select-search",
        options: ["JavaScript", "Python", "Java", "C++"]
      },
      { name: "Error or Code Snippet", type: "textarea" }
    ],
    systemPrompt: `
You are an expert debugging assistant.
Identify root causes and provide fixes.
`
  },

  {
    id: "code-explainer",
    title: "Code Explanation",
    description: "Explain code step-by-step",
    inputs: [
      {
        name: "Language",
        type: "select-search",
        options: ["JavaScript", "Python", "Java"]
      },
      { name: "Code", type: "textarea" }
    ],
    systemPrompt: `
You are a technical educator.
Explain the code clearly with examples.
`
  },

  {
    id: "system-design",
    title: "System Design Assistant",
    description: "Generate high-level system design",
    inputs: [
      { name: "Problem Statement", type: "textarea" },
      { name: "Expected Scale", type: "text" }
    ],
    systemPrompt: `
You are a senior system architect.
Design a scalable system and explain trade-offs.
`
  },

  /* ================= CAREER & INTERVIEWS ================= */

  {
    id: "resume-review",
    title: "Resume Reviewer",
    description: "Improve resume bullets for impact",
    inputs: [
      { name: "Target Role", type: "text" },
      { name: "Resume Content", type: "textarea" }
    ],
    systemPrompt: `
You are a senior recruiter.
Rewrite resume bullets using strong action verbs and metrics.
`
  },

  {
    id: "interview-questions",
    title: "Interview Question Generator",
    description: "Generate interview questions by topic",
    inputs: [
      { name: "Topic", type: "text" },
      { name: "Experience Level", type: "text" }
    ],
    systemPrompt: `
You are a technical interviewer.
Generate questions from easy to hard.
`
  },

  /* ================= PRODUCT & BUSINESS ================= */

  {
    id: "prd-generator",
    title: "PRD Generator",
    description: "Generate product requirement document",
    inputs: [
      { name: "Product Idea", type: "textarea" },
      { name: "Target Users", type: "text" }
    ],
    systemPrompt: `
You are a product manager.
Create a clear PRD with goals, features, and metrics.
`
  },

  {
    id: "business-idea",
    title: "Business Idea Analyzer",
    description: "Analyze feasibility of a business idea",
    inputs: [
      { name: "Business Idea", type: "textarea" },
      { name: "Market", type: "text" }
    ],
    systemPrompt: `
You are a startup advisor.
Analyze risks, monetization, and competition.
`
  },

  /* ================= CONTENT & WRITING ================= */

  {
    id: "content-writer",
    title: "Content Writer",
    description: "Generate or improve content",
    inputs: [
      { name: "Content Type", type: "text" },
      { name: "Content", type: "textarea" }
    ],
    systemPrompt: `
You are a professional writer.
Improve clarity, tone, and structure.
`
  },

  {
    id: "summarizer",
    title: "Text Summarizer",
    description: "Summarize long text",
    inputs: [{ name: "Text", type: "textarea" }],
    systemPrompt: `
You are an expert summarizer.
Extract key insights concisely.
`
  },

  /* ================= PROMPT ENGINEERING ================= */

  {
    id: "prompt-engineer",
    title: "Prompt Generator",
    description: "Generate optimized AI prompts",
    inputs: [{ name: "Task Description", type: "textarea" }],
    systemPrompt: `
You are a prompt engineering expert.
Generate a clear and optimized prompt.
`
  },

 /* ================= chat-with-ai ================= */
  {
  id: "chat-with-ai",
  title: "Chat with AI",
  description: "Have a free-form conversation with an AI assistant",
  inputs: [
    {
      name: "Your Message",
      type: "textarea"
    }
  ],
  systemPrompt: `
You are a helpful, intelligent AI assistant.
Respond conversationally, clearly, and concisely.
Adapt your tone based on the user's message.
`
}
];
