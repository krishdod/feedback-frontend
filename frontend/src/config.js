// Configuration for API endpoints
const config = {
  // Development environment (local)
  development: {
    apiUrl: 'http://127.0.0.1:9000'
  },
  // Production environment (deployed)
  production: {
    apiUrl: 'https://feedback-backend-vkzb.onrender.com'
  }
};

// Get current environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate configuration
export const apiConfig = config[environment];

// Helper function to get the full API URL
export const getApiUrl = (endpoint) => {
  return `${apiConfig.apiUrl}${endpoint}`;
}; 
