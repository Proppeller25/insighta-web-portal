// src/utils/api.js
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';

const getCsrfToken = () => {
  const match = document.cookie.match(/csrf_token=([^;]+)/);
  return match ? match[1] : null;
};

async function request(endpoint, options = {}) {
  const url = `${BACKEND_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-API-Version': '1',
    ...options.headers,
  };

  if (options.method && options.method !== 'GET') {
    const token = getCsrfToken();
    if (token) headers['X-CSRF-Token'] = token;
  }

  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  });

  // Handle 401 redirect - use full URL in production
  if (response.status === 401 && endpoint !== '/api/auth/me') {
    const baseUrl = import.meta.env.PROD 
      ? window.location.origin 
      : 'http://localhost:3001';
    window.location.href = `${baseUrl}/login`;
    throw new Error('Session expired');
  }
  return response;
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, body) => request(endpoint, { method: 'POST', body: JSON.stringify(body) }),
  put: (endpoint, body) => request(endpoint, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
};

export const exportCsv = async (queryParams = {}) => {
  const params = new URLSearchParams(queryParams).toString();
  const url = `${BACKEND_URL}/api/profiles/export?${params}&format=csv`;
  const response = await fetch(url, {
    credentials: 'include',
    headers: { 'X-API-Version': '1' },
  });
  if (!response.ok) throw new Error('Export failed');
  return response.text();
};