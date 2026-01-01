import { useEffect, useRef, memo } from "react";
import "./ChatOutputRenderer.css";

const ChatMessage = memo(({ message, index }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      key={index}
      className={`chat-message ${message.role === 'user' ? 'user-message' : 'assistant-message'}`}
    >
      <div className="message-content">
        {message.content}
      </div>
      <div className="message-timestamp">
        {formatTime(message.timestamp)}
      </div>
    </div>
  );
});

ChatMessage.displayName = 'ChatMessage';

const ChatOutputRenderer = memo(({ conversation, loading, onClearChat }) => {
  const messagesEndRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  useEffect(() => {
    scrollToBottom();

    // Cleanup timeout on unmount
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [conversation]);

  return (
    <div className="chat-output-container">
      {/* Header */}
      <div className="chat-output-header">
        <span className="chat-output-title">Chat History</span>
        <div className="chat-output-buttons">
          <button
            className="clear-chat-btn"
            onClick={() => {
              if (window.confirm('Clear chat history?')) {
                onClearChat();
              }
            }}
            disabled={conversation.length === 0}
          >
            Clear Chat
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="chat-messages">
        {conversation.length === 0 ? (
          <div className="chat-placeholder">
            Start a conversation by sending a message...
          </div>
        ) : (
          conversation.map((message, index) => (
            <ChatMessage key={`${message.timestamp}-${index}`} message={message} index={index} />
          ))
        )}

        {loading && (
          <div className="chat-message assistant-message loading-message">
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
});

ChatOutputRenderer.displayName = 'ChatOutputRenderer';

export default ChatOutputRenderer;