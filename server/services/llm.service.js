import Groq from "groq-sdk";
import { aiModels } from "../config/models.js";
import { GROQ_API_KEY } from "../config/env.js";

const groq = new Groq({
  apiKey: GROQ_API_KEY,
});

export async function callLLM({ prompt, modelId }) {
  // Input validation
  if (!prompt || typeof prompt !== 'string' || prompt.trim().length === 0) {
    throw new Error('Invalid prompt: prompt must be a non-empty string');
  }

  if (!modelId || typeof modelId !== 'string') {
    throw new Error('Invalid modelId: modelId is required');
  }

  console.log("LLM Service called with modelId:", modelId);

  const modelConfig = aiModels.find(m => m.id === modelId);
  if (!modelConfig) {
    throw new Error("Invalid AI model selected");
  }

  // Prompt length validation
  if (prompt.length > 100000) {
    throw new Error('Prompt too long: maximum 100,000 characters allowed');
  }

  switch (modelConfig.provider) {
    case "groq":
      return await callGroq(prompt, modelConfig.model);

    // Future-ready
    case "openai":
    case "ollama":
      throw new Error("Model provider not implemented yet");

    default:
      throw new Error("Unsupported provider");
  }
}

async function callGroq(prompt, modelName) {
  try {
    const completion = await groq.chat.completions.create({
      model: modelName,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4096, // Limit response length
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response generated from AI model');
    }

    return content;
  } catch (err) {
    console.error("Groq API error:", err.message);

    // Handle specific Groq errors
    if (err.status === 401) {
      throw new Error('API authentication failed');
    } else if (err.status === 429) {
      throw new Error('API rate limit reached. Please try again later.');
    } else if (err.status === 400) {
      throw new Error('Invalid request to AI service');
    } else if (err.status === 500) {
      throw new Error('AI service temporarily unavailable');
    } else if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND') {
      throw new Error('Unable to connect to AI service');
    }

    // Generic error with original message in development
    const isDevelopment = process.env.NODE_ENV === 'development';
    throw new Error(isDevelopment ? `AI service error: ${err.message}` : 'AI service error occurred');
  }
}
