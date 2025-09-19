// Dynamic API URL detection
const getApiBaseUrl = () => {
  // Check if we're in browser environment
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:9000';
    } else if (hostname.includes('vercel.app')) {
      return 'https://feedback-backend-vkzb.onrender.com';
    } else if (hostname.includes('render.com')) {
      return `https://${hostname.replace('feedback-frontend', 'feedback-backend')}`;
    } else {
      return 'https://feedback-backend-vkzb.onrender.com';
    }
  }
  
  // Fallback for server-side rendering
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:9000' 
    : 'https://feedback-backend-vkzb.onrender.com';
};

// Export the API configuration
export const apiConfig = {
  apiUrl: getApiBaseUrl()
};

// Helper function to get the full API URL
export const getApiUrl = (endpoint) => {
  return `${apiConfig.apiUrl}${endpoint}`;
}; 
