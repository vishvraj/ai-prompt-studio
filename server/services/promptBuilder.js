export function buildPrompt(template, userInputs) {
  // Input validation
  if (!template || !userInputs) {
    throw new Error('Invalid parameters: template and userInputs are required');
  }

  // Handle chat template with conversation history
  if (template.id === 'chat-with-ai') {
    const currentMessage = userInputs['Your Message'];
    const conversationHistory = userInputs.conversationHistory;

    // Validate current message
    if (!currentMessage || typeof currentMessage !== 'string' || currentMessage.trim().length === 0) {
      throw new Error('Invalid message: message cannot be empty');
    }

    if (currentMessage.length > 10000) {
      throw new Error('Message too long: maximum 10,000 characters allowed');
    }

    let prompt = `${template.systemPrompt}\n\n`;

    // Add conversation history if available
    if (conversationHistory && Array.isArray(conversationHistory)) {
      // Limit history to prevent extremely long prompts
      const recentHistory = conversationHistory.slice(-10); // Last 10 messages max

      if (recentHistory.length > 0) {
        prompt += "CONVERSATION HISTORY:\n";
        recentHistory.forEach(msg => {
          if (msg.role && msg.content) {
            const role = msg.role === 'user' ? 'User' : 'Assistant';
            // Sanitize content for prompt
            const sanitizedContent = msg.content.replace(/[\r\n]+/g, ' ').trim();
            prompt += `${role}: ${sanitizedContent}\n`;
          }
        });
        prompt += "\n";
      }
    }

    // Add current message
    const sanitizedCurrentMessage = currentMessage.replace(/[\r\n]+/g, ' ').trim();
    prompt += `User: ${sanitizedCurrentMessage}\n\nAssistant:`;

    return prompt;
  }

  // Default prompt building for other templates
  let prompt = `${template.systemPrompt}\n\nUSER INPUT:\n`;

  // Sanitize and format user inputs
  const sanitizedInputs = {};
  for (const [key, value] of Object.entries(userInputs)) {
    if (typeof value === 'string') {
      // Basic sanitization - remove excessive whitespace and control characters
      sanitizedInputs[key] = value.replace(/[\r\n]+/g, ' ').trim();
    } else {
      sanitizedInputs[key] = value;
    }
  }

  prompt += JSON.stringify(sanitizedInputs, null, 2);

  if (template.outputSchema) {
    prompt += `\n\nRESPONSE RULES:\n- Return ONLY valid JSON\n- Follow this schema strictly:\n${JSON.stringify(template.outputSchema, null, 2)}`;
  }

  return prompt;
}


