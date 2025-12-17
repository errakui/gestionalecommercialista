// ============================================
// API SERVICE - Chiamate al backend
// ============================================

import { apiCallWithAuth } from './auth';

// Usa proxy se disponibile, altrimenti URL completo
// NOTA: Koyeb rimuove /api, quindi le route sono senza prefisso
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://obliged-mag-errakui-b6f59c0f.koyeb.app';

const apiCall = async (endpoint, options = {}) => {
  return apiCallWithAuth(endpoint, options);
};

// Clienti
export const clientiAPI = {
  getAll: () => apiCall('/clienti'),
  getById: (id) => apiCall(`/clienti/${id}`),
  create: (data) => apiCall('/clienti', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/clienti/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/clienti/${id}`, { method: 'DELETE' })
};

// Contratti
export const contrattiAPI = {
  getAll: () => apiCall('/contratti'),
  getById: (id) => apiCall(`/contratti/${id}`),
  create: (data) => apiCall('/contratti', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/contratti/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/contratti/${id}`, { method: 'DELETE' })
};

// Incassi
export const incassiAPI = {
  getAll: () => apiCall('/incassi'),
  getById: (id) => apiCall(`/incassi/${id}`),
  create: (data) => apiCall('/incassi', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/incassi/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  updateBatchStato: (ids, stato) => apiCall('/incassi/batch/update-stato', { 
    method: 'PUT', 
    body: JSON.stringify({ ids, stato }) 
  }),
  delete: (id) => apiCall(`/incassi/${id}`, { method: 'DELETE' })
};

// Costi
export const costiAPI = {
  getStudio: () => apiCall('/costi/studio'),
  createStudio: (data) => apiCall('/costi/studio', { method: 'POST', body: JSON.stringify(data) }),
  updateStudio: (id, data) => apiCall(`/costi/studio/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteStudio: (id) => apiCall(`/costi/studio/${id}`, { method: 'DELETE' }),
  getAltri: () => apiCall('/costi/altri'),
  createAltro: (data) => apiCall('/costi/altri', { method: 'POST', body: JSON.stringify(data) }),
  deleteAltro: (id) => apiCall(`/costi/altri/${id}`, { method: 'DELETE' })
};

// Impostazioni
export const impostazioniAPI = {
  get: () => apiCall('/impostazioni'),
  update: (data) => apiCall('/impostazioni', { method: 'PUT', body: JSON.stringify(data) }),
  getCentriCosto: () => apiCall('/impostazioni/centri-costo'),
  getServizi: () => apiCall('/impostazioni/servizi')
};

// Dashboard
export const dashboardAPI = {
  getStats: () => apiCall('/dashboard/stats'),
  getIncassiMese: () => apiCall('/dashboard/incassi-mese'),
  getCostiCategoria: () => apiCall('/dashboard/costi-categoria'),
  getUltimiIncassi: () => apiCall('/dashboard/ultimi-incassi')
};

