# AI Prompt Studio

AI Prompt Studio is a modern, secure, and performant prompt engineering playground that lets you interact with Large Language Models through predefined templates and a conversational chat interface. Built with React and Express.js, it provides a seamless experience for AI-powered task completion.

![AI Prompt Studio](https://img.shields.io/badge/React-19.2.0-blue) ![Express](https://img.shields.io/badge/Express-5.2.1-green) ![Node.js](https://img.shields.io/badge/Node.js-18+-yellow)

## ✨ Features

- **🎯 Pre-built Templates**: 10+ specialized templates for code review, content writing, system design, interviews, and more
- **💬 AI Chat Interface**: Full conversational experience with persistent chat history
- **🔒 Security First**: Input validation, XSS protection, and rate limiting
- **⚡ Performance Optimized**: Memoized components, debounced saves, and conversation limits
- **🎨 Modern UI**: Responsive design with smooth animations and intuitive interactions
- **🔧 Dynamic Forms**: Auto-generated forms based on template requirements
- **🤖 Multi-Model Support**: Groq models with extensible architecture for OpenAI/Ollama
- **💾 Local Persistence**: Chat history saved in browser storage
- **🚀 Fast Development**: Vite-powered frontend with hot reload

## 🏗️ Architecture

```
┌─────────────────┐    HTTP/HTTPS    ┌─────────────────┐
│                 │                  │                 │
│   React Client  │◄────────────────►│  Express Server │
│   (Vite + SWC)  │                  │   (Node.js)     │
│                 │                  │                 │
└─────────────────┘                  └─────────────────┘
         │                                   │
         │                                   │
         ▼                                   ▼
┌─────────────────┐                  ┌─────────────────┐
│   Browser       │                  │   LLM APIs      │
│   localStorage  │                  │   (Groq/OpenAI) │
└─────────────────┘                  └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm/yarn
- **Groq API Key** (get one at [groq.com](https://groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-prompt-studio
   ```

2. **Set up the server**
   ```bash
   cd server
   npm install
   cp .env.example .env  # Create environment file
   # Edit .env and add your GROQ_API_KEY
   npm run dev
   ```

3. **Set up the client** (in a new terminal)
   ```bash
   cd client
   npm install
   npm run dev
   ```

4. **Open your browser**
   - Client: http://localhost:5173
   - Server: http://localhost:5000

## 🔧 Environment Configuration

Create `.env` file in the `server/` directory:

```env
GROQ_API_KEY=your_groq_api_key_here
NODE_ENV=development
PORT=5000
```

## 📖 Usage

### Standard Templates

1. **Select a Template**: Choose from code review, content writing, system design, etc.
2. **Fill the Form**: Dynamic forms adapt to each template's requirements
3. **Choose Model**: Select your preferred AI model
4. **Execute**: Get instant results with proper formatting

### Chat with AI

1. **Select "Chat with AI"**: Switch to conversational mode
2. **Start Chatting**: Send messages and maintain context
3. **Persistent History**: Conversations are automatically saved
4. **Clear History**: Reset chat when needed

## 🎯 Available Templates

| Template | Description | Use Case |
|----------|-------------|----------|
| **Chat with AI** | Conversational AI assistant | General questions, brainstorming |
| **Code Review** | AI-powered code analysis | Bug detection, improvements |
| **Bug Finder** | Identify logical errors | Debugging assistance |
| **Code Explainer** | Step-by-step code explanation | Learning, documentation |
| **System Design** | High-level architecture design | Technical planning |
| **Resume Review** | Improve resume content | Career development |
| **Interview Questions** | Generate practice questions | Interview preparation |
| **PRD Generator** | Create product requirements | Product management |
| **Business Analyzer** | Evaluate business ideas | Entrepreneurship |
| **Content Writer** | Improve writing quality | Content creation |
| **Text Summarizer** | Extract key insights | Information processing |
| **Prompt Engineer** | Optimize AI prompts | Prompt crafting |

## 🔌 API Reference

### Prompt Management

#### Get Templates
```http
GET /api/prompt/templates
```

**Response:**
```json
[
  {
    "id": "chat-with-ai",
    "title": "Chat with AI",
    "description": "Have a free-form conversation",
    "inputs": [
      {
        "name": "Your Message",
        "type": "textarea"
      }
    ]
  }
]
```

#### Execute Prompt
```http
POST /api/prompt/execute
```

**Request:**
```json
{
  "templateId": "chat-with-ai",
  "inputs": {
    "modelId": "groq-llama-3.1-8b",
    "Your Message": "Hello!",
    "conversationHistory": [
      {
        "role": "user",
        "content": "Previous message",
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

**Response:**
```json
{
  "result": "Hello! How can I help you today?"
}
```

### Model Management

#### Get Available Models
```http
GET /api/models
```

## 🛡️ Security Features

- **Input Validation**: Server-side validation for all inputs
- **XSS Protection**: HTML sanitization and script tag removal
- **Rate Limiting**: API rate limiting to prevent abuse
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Data Sanitization**: Automatic cleaning of user inputs

## ⚡ Performance Optimizations

- **React Memoization**: Prevents unnecessary re-renders
- **Debounced Saves**: Efficient localStorage operations
- **Conversation Limits**: Maximum 50 messages per chat
- **Context Windowing**: Only recent messages sent to API
- **Lazy Loading**: Optimized bundle loading

## 🏗️ Project Structure

```
ai-prompt-studio/
├── client/                    # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   │   ├── ChatOutputRenderer.jsx
│   │   │   ├── DynamicForm.jsx
│   │   │   ├── ModelSelector.jsx
│   │   │   └── OutputRenderer.jsx
│   │   ├── pages/            # Page components
│   │   │   └── TemplateList.jsx
│   │   ├── api/              # API integration
│   │   └── assets/           # Static assets
│   ├── package.json
│   └── vite.config.js
├── server/                    # Express backend
│   ├── config/               # Configuration files
│   ├── routes/               # API routes
│   ├── services/             # Business logic
│   ├── templates/            # Template definitions
│   ├── package.json
│   └── index.js
├── docs/                     # Documentation
│   └── architecture.md
└── README.md
```

## 🔄 Data Flow

### Standard Template Flow
1. User selects template → Client fetches template config
2. User fills form → Client validates inputs
3. User submits → Client sends to server
4. Server validates → Builds prompt → Calls LLM
5. Server responds → Client displays result

### Chat Flow
1. User selects chat → Client loads conversation history
2. User sends message → Added to local conversation
3. Message sent to server → Includes recent context
4. Server builds contextual prompt → Calls LLM
5. Response added to conversation → Auto-saved to localStorage

## 🧪 Development

### Available Scripts

```bash
# Client
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Server
npm run dev          # Start with nodemon
npm start            # Start production server
```

### Code Quality

- **ESLint**: Configured for React and modern JavaScript
- **Prettier**: Code formatting (planned)
- **TypeScript**: Migration planned for better type safety

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure security best practices
- Test across different browsers

## 📋 Future Roadmap

### Short Term
- [ ] Dark mode support
- [ ] Keyboard shortcuts
- [ ] Export/import conversations
- [ ] Template marketplace

### Long Term
- [ ] Real-time collaboration
- [ ] Plugin system
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Multi-language support

## 🐛 Troubleshooting

### Common Issues

**Server won't start**
- Check if port 5000 is available
- Verify GROQ_API_KEY is set correctly
- Ensure Node.js version is 18+

**Client build fails**
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for syntax errors in components

**API calls failing**
- Verify server is running on port 5000
- Check browser network tab for errors
- Ensure CORS is properly configured

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Groq](https://groq.com) for fast LLM inference
- [React](https://reactjs.org) for the amazing frontend framework
- [Vite](https://vitejs.dev) for lightning-fast development

## 📞 Support

- Create an [issue](https://github.com/vishvraj/ai-prompt-studio/issues) for bugs
- Start a [discussion](https://github.com/vishvraj/ai-prompt-studio/discussions) for questions
- Check the [architecture docs](./docs/architecture.md) for technical details

---

**Made with ❤️ for the AI community**


