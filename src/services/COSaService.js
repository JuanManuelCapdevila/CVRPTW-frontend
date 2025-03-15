// services/COSaService.js

const apiUrl = 'http://localhost:5000/api/v1/';
const headers = {
  'Content-Type': 'application/json',
};

// Función que maneja las solicitudes genéricas
const genericRequest = (method, endpoint, data = {}) => {
  return fetch(apiUrl + endpoint, {
    method: method,
    headers: headers,
    body: method === 'GET' ? null : JSON.stringify(data),  // En los GET no se envía cuerpo
  })
    .then(response => response.json()) // Parseamos la respuesta a JSON
    .catch(error => {
      console.error('Error making request:', error);
      throw error; // Re-lanzamos el error para manejarlo en el componente
    });
};

export const COSaService = {
  saveConfig: () => genericRequest('PUT', 'saveConfig'),
  getConfig: () => genericRequest('GET', 'getConfig'),
  saveCustNodes: () => genericRequest('PUT', 'saveCustNode'),
  getCustNodes: () => genericRequest('GET', 'getcustNodes'),
};
