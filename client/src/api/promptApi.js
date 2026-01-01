import axios from "axios";

const API_BASE = import.meta.env.VITE_SERVER_API_BASE;
const API = `${API_BASE}/api/prompt`;

export const executePrompt = async (data, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.post(`${API}/execute`, data, {
        timeout: 30000, // 30 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      // Don't retry on client errors (4xx)
      if (error.response && error.response.status >= 400 && error.response.status < 500) {
        throw error;
      }

      // Retry on network errors or server errors (5xx)
      if (i === retries - 1) {
        // Last attempt failed
        if (error.code === 'NETWORK_ERROR') {
          throw new Error('Network connection failed. Please check your internet connection.');
        } else if (error.code === 'ECONNABORTED') {
          throw new Error('Request timed out. Please try again.');
        } else if (error.response) {
          throw new Error(`Server error: ${error.response.status} ${error.response.statusText}`);
        } else {
          throw new Error('An unexpected error occurred. Please try again.');
        }
      }

      // Wait before retrying (exponential backoff)
      const delay = Math.min(1000 * Math.pow(2, i), 5000);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};
