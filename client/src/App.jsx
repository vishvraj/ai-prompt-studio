import { useState, useEffect, useCallback, memo } from "react";
import TemplateList from "./pages/TemplateList";
import DynamicForm from "./components/DynamicForm";
import OutputRenderer from "./components/OutputRenderer";
import ChatOutputRenderer from "./components/ChatOutputRenderer";
import { executePrompt } from "./api/promptApi";
import "./App.css";

const MAX_MESSAGES = 50;
const RECENT_CONTEXT_LIMIT = 10;

// Sanitize data for localStorage to prevent XSS
const sanitizeForStorage = (data) => {
  return JSON.stringify(data).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
};



function App() {
  const [template, setTemplate] = useState(null);
  const [result, setResult] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load conversation from localStorage when template changes (async to prevent blocking)
  useEffect(() => {
    const loadConversation = async () => {
      if (template?.id === 'chat-with-ai') {
        try {
          const savedConversation = localStorage.getItem(`chat-${template.id}`);
          if (savedConversation) {
            const parsed = JSON.parse(savedConversation);
            setConversation(Array.isArray(parsed) ? parsed : []);
          } else {
            setConversation([]);
          }
        } catch (error) {
          console.warn('Failed to load conversation from localStorage:', error);
          setConversation([]);
        }
      }
    };

    loadConversation();
  }, [template]);

  // Save conversation to localStorage whenever it changes (debounced)
  useEffect(() => {
    if (template?.id === 'chat-with-ai' && conversation.length > 0) {
      const saveConversation = async () => {
        try {
          localStorage.setItem(`chat-${template.id}`, sanitizeForStorage(conversation));
        } catch (error) {
          console.warn('Failed to save conversation to localStorage:', error);
          // Could implement fallback storage here
        }
      };

      // Debounce saves to prevent excessive writes
      const timeoutId = setTimeout(saveConversation, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [conversation, template]);

  const clearChat = useCallback(() => {
    setConversation([]);
    try {
      localStorage.removeItem(`chat-${template?.id}`);
    } catch (error) {
      console.warn('Failed to clear chat from localStorage:', error);
    }
  }, [template]);

  const addMessage = useCallback((message) => {
    setConversation(prev => {
      const newConv = [...prev, message];
      return newConv.length > MAX_MESSAGES ? newConv.slice(-MAX_MESSAGES) : newConv;
    });
  }, []);

  const runPrompt = async (inputs) => {
    if (template?.id === 'chat-with-ai') {
      // Handle chat conversation
      const userMessage = inputs['Your Message'];

      // Validate input
      if (!userMessage || userMessage.trim().length === 0) {
        setError("Please enter a message");
        return;
      }

      if (userMessage.length > 10000) {
        setError("Message too long (max 10,000 characters)");
        return;
      }

      const newConversation = [
        ...conversation,
        { role: 'user', content: userMessage.trim(), timestamp: new Date() }
      ];
      setConversation(newConversation);

      try {
        setLoading(true);
        setError("");

        // Include recent conversation history in the prompt (performance optimization)
        const conversationInputs = {
          ...inputs,
          conversationHistory: newConversation.slice(-RECENT_CONTEXT_LIMIT)
        };

        const res = await executePrompt({ templateId: template.id, inputs: conversationInputs });
        const assistantMessage = res.data.result;

        // Add assistant response to conversation
        addMessage({ role: 'assistant', content: assistantMessage, timestamp: new Date() });
      } catch (err) {
        setError(err.message || "Something went wrong");
        // Properly remove the failed message from conversation
        setConversation(prev => prev.slice(0, -1));
      } finally {
        setLoading(false);
      }
    } else {
      // Handle regular templates
      try {
        setLoading(true);
        setError("");
        const res = await executePrompt({ templateId: template.id, inputs });
        setResult(res.data.result);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleTemplateSelect = useCallback((t) => {
    setTemplate(t);
    setResult("");
    setError("");
    if (t.id !== 'chat-with-ai') {
      setConversation([]);
    }
  }, []);

  return (
    <div className="app-container">
      <div className="logo-container">
        <img
          src="/logo.png"
          alt="AI Prompt Studio Logo"
          className="logo"
        />
      </div>
      <div className="main-content">
        {/* Left side - Input and Templates */}
        <div className="left-panel">
          <div className="scrollable-area">
            <TemplateList onSelect={handleTemplateSelect} />
            {template && <DynamicForm template={template} onSubmit={runPrompt} loading={loading} />}
            {loading && template?.id !== 'chat-with-ai' && <p className="loading-text">Loading...</p>}
            {error && <p className="error-text">{error}</p>}
          </div>
        </div>

        {/* Right side - Output */}
        <div className="right-panel">
          {template?.id === 'chat-with-ai' ? (
            <ChatOutputRenderer
              conversation={conversation}
              loading={loading}
              onClearChat={clearChat}
            />
          ) : (
            <OutputRenderer result={result} />
          )}
        </div>
      </div>
    </div>
  );
}

export default memo(App);
