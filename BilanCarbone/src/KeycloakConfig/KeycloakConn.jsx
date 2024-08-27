import axios from 'axios';


export const apiClientWithoutToken = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
  withCredentials: false 
});
// Create Axios instances
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_AXIOS_URL,
  withCredentials: true 
});

export const apikeycloak = axios.create({
  baseURL: import.meta.env.VITE_KEYCLOAK_URL,
  withCredentials: true 
});

// Add a request interceptor to inject the token
const injectToken = (config) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
};

// Use the interceptor in both Axios instances
apiClient.interceptors.request.use(injectToken, (error) => Promise.reject(error));
apikeycloak.interceptors.request.use(injectToken, (error) => Promise.reject(error));

const handleTokenRefresh = async (error) => {
  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;  // To avoid infinite loops

    const refreshToken = sessionStorage.getItem('refresh_token');
    if (refreshToken) {
      try {
        // Request a new access token using the refresh token
        const response = await apikeycloak.post('/protocol/openid-connect/token', {
          grant_type: 'refresh_token',
          client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
          refresh_token: refreshToken,
        });

        // Update the tokens in session storage
        sessionStorage.setItem('token', response.data.access_token);
        sessionStorage.setItem('refresh_token', response.data.refresh_token);

        // Update the original request's Authorization header with the new token
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;

        // Retry the original request with the new token
        return axios(originalRequest);

      } catch (refreshError) {
        // Handle refresh token errors, possibly redirect to login
        console.error('Refresh token failed', refreshError);
        // Optionally: Clear session storage and redirect to login
        sessionStorage.clear();
        window.location.href = '/welcome';
        return Promise.reject(refreshError);
      }
    }
  }

  return Promise.reject(error);
};

// Apply the response interceptor to both Axios instances
apiClient.interceptors.response.use(response => response, handleTokenRefresh);
apikeycloak.interceptors.response.use(response => response, handleTokenRefresh);