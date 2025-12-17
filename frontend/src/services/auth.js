// ============================================
// AUTH SERVICE - Gestione autenticazione
// ============================================

// URL backend hardcodato (Koyeb rimuove /api, quindi le route sono senza prefisso)
const API_BASE_URL = 'https://obliged-mag-errakui-b6f59c0f.koyeb.app';

// Salva token in localStorage
export const setToken = (token) => {
  localStorage.setItem('auth_token', token);
};

// Recupera token da localStorage
export const getToken = () => {
  return localStorage.getItem('auth_token');
};

// Rimuove token
export const removeToken = () => {
  localStorage.removeItem('auth_token');
};

// Verifica se utente è autenticato
export const isAuthenticated = () => {
  return !!getToken();
};

// Login
export const login = async (username, password) => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Errore nel login');
    }

    const data = await response.json();
    setToken(data.token);
    return data;
  } catch (error) {
    throw error;
  }
};

// Logout
export const logout = () => {
  removeToken();
};

// Ottieni profilo utente corrente
export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) {
    throw new Error('Non autenticato');
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        removeToken();
        throw new Error('Sessione scaduta');
      }
      throw new Error('Errore nel recupero profilo');
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};

// Aggiunge token a tutte le richieste API
export const apiCallWithAuth = async (endpoint, options = {}) => {
  const token = getToken();
  const baseUrl = 'https://obliged-mag-errakui-b6f59c0f.koyeb.app';
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    // Assicurati che endpoint inizi con /
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
    const url = `${baseUrl}${cleanEndpoint}`;
    console.log('🔵 API Call:', url, options.method || 'GET');
    console.log('🔵 Headers:', headers);
    const response = await fetch(url, {
      ...options,
      headers
    });
    console.log('🔵 Response Status:', response.status, response.statusText);

    if (response.status === 401 || response.status === 403) {
      removeToken();
      window.location.href = '/login';
      throw new Error('Sessione scaduta');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

