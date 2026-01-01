import express from "express";
import { templates } from "../templates/templates.js";
import { buildPrompt } from "../services/promptBuilder.js";
import { callLLM } from "../services/llm.service.js";

const router = express.Router();

// Input validation middleware
const validatePromptExecution = (req, res, next) => {
  const { templateId, inputs } = req.body;

  // Check required fields
  if (!templateId || typeof templateId !== 'string') {
    return res.status(400).json({
      error: 'Invalid request: templateId is required and must be a string'
    });
  }

  if (!inputs || typeof inputs !== 'object') {
    return res.status(400).json({
      error: 'Invalid request: inputs must be an object'
    });
  }

  // Validate template exists
  const template = templates.find(t => t.id === templateId);
  if (!template) {
    return res.status(400).json({
      error: 'Invalid templateId: template not found'
    });
  }

  // Validate required inputs for the template
  for (const input of template.inputs) {
    const value = inputs[input.name];
    if (input.required !== false && (value === undefined || value === null || value === '')) {
      return res.status(400).json({
        error: `Missing required input: ${input.name}`
      });
    }

    // Type validation
    if (value !== undefined && value !== null) {
      if (input.type === 'textarea' && typeof value !== 'string') {
        return res.status(400).json({
          error: `Invalid type for ${input.name}: expected string`
        });
      }

      // Length limits
      if (typeof value === 'string' && value.length > 50000) {
        return res.status(400).json({
          error: `Input too long: ${input.name} exceeds 50,000 characters`
        });
      }
    }
  }

  // Sanitize inputs (basic XSS prevention)
  const sanitizedInputs = {};
  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value === 'string') {
      // Remove script tags and other potentially dangerous content
      sanitizedInputs[key] = value.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else {
      sanitizedInputs[key] = value;
    }
  }

  req.body.inputs = sanitizedInputs;
  req.template = template;
  next();
};

router.get("/templates", (req, res) => {
  try {
    res.json(templates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    res.status(500).json({ error: 'Failed to fetch templates' });
  }
});

router.post("/execute", validatePromptExecution, async (req, res) => {
  try {
    const { templateId, inputs } = req.body;
    const template = req.template;

    // Extract modelId from inputs (it's nested here, not at the top level of req.body)
    const { modelId, ...userInputs } = inputs;  // Destructure modelId out, keep the rest as userInputs

    // Build the prompt using only the user inputs (exclude modelId)
    const prompt = buildPrompt(template, userInputs);
    const result = await callLLM({ prompt, modelId });

    res.json({ result });
  } catch (error) {
    console.error('Error executing prompt:', error);

    // Handle specific error types
    if (error.message.includes('rate limit')) {
      return res.status(429).json({
        error: 'API rate limit exceeded. Please try again later.'
      });
    }

    if (error.message.includes('Invalid AI model')) {
      return res.status(400).json({
        error: 'Invalid AI model selected'
      });
    }

    // Generic error response
    res.status(500).json({
      error: 'Failed to execute prompt. Please try again.'
    });
  }
});

export default router;


