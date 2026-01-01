export const aiModels = [
  /* ================= GROQ (FREE TIER / ULTRA-FAST) ================= */
  // All Groq models are accessible on the free tier with rate limits.
  // Sign up at console.groq.com for your API key.

  {
    id: "groq-llama-3.1-8b",
    provider: "groq",
    model: "llama-3.1-8b-instant",
    label: "Groq-Llama 3.1 8B – Ultra Fast",
    bestFor: "Real-time chat, coding, general tasks",
    description: "Blazing fast (highest speed on Groq). Ideal default for low-latency apps."
  },

  {
    id: "groq-llama-3.3-70b",
    provider: "groq",
    model: "llama-3.3-70b-versatile",
    label: "Groq-Llama 3.3 70B – High Quality",
    bestFor: "Advanced reasoning, analysis, complex tasks",
    description: "Latest high-capability model. Strongest reasoning on Groq free tier."
  },

  {
    id: "groq-gpt-oss-20b",
    provider: "groq",
    model: "openai/gpt-oss-20b",
    label: "Groq-GPT OSS 20B – Balanced Speed",
    bestFor: "General-purpose, creative tasks",
    description: "Fast mid-size open model with good performance."
  },

  {
    id: "groq-gpt-oss-120b",
    provider: "groq",
    model: "openai/gpt-oss-120b",
    label: "Groq-GPT OSS 120B – Flagship Scale",
    bestFor: "Heavy reasoning, large-scale tasks",
    description: "Largest available model on Groq. Powerful but slower/higher token use."
  },

  /* ================= OLLAMA (LOCAL / COMPLETELY FREE) ================= */
  // These remain unchanged—great for offline/privacy-focused use.

  {
    id: "ollama-llama3",
    provider: "ollama",
    model: "llama3",
    label: "Ollama-LLaMA 3 – Local (Upcoming)",
    bestFor: "Offline usage, privacy",
    description: "Runs locally using Ollama. Best for private and offline workflows."
  },

  {
    id: "ollama-mistral",
    provider: "ollama",
    model: "mistral",
    label: "Ollama-Mistral – Local (Upcoming)",
    bestFor: "Fast local inference",
    description: "Lightweight local model with good performance on limited hardware."
  }
];


