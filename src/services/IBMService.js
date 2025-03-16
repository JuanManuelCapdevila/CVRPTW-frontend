// services/COSaService.js

const apiUrl = 'http://localhost:5000/api/v1/resolve/';
const headers = {
  'Content-Type': 'application/json',
};

// Función que maneja las solicitudes genéricas
const genericRequest = (method, endpoint, data = {}) => {
  return fetch(apiUrl + endpoint, {
    method: method,
    headers: headers,
  })
    .then(response => response.json()) // Parseamos la respuesta a JSON
    .catch(error => {
      console.error('Error making request:', error);
      throw error; // Re-lanzamos el error para manejarlo en el componente
    });
};
const mapResults = (dataResults, dataNodes) => {
  const response = dataResults.map((x) => {
    return { nodeId: parseInt(x.nodeId), vehicleId: parseInt(x.vehicleId) };
  });
  const nodes = dataNodes.map((y) => ({ id: parseInt(y.id), x: parseInt(y.x), y: parseInt(y.y), demand: parseInt(y.demand), begin: parseInt(y.begin), end: parseInt(y.end), service: parseInt(y.service) }));
  console.log("Nodos recibidos:");
  console.log(nodes);
  console.log("Datos recibidos:");
  console.log(response);

  // Mapa para agrupar nodos por vehículo
  const vehiculosMap = {};

  response.forEach(({ nodeId, vehicleId }) => {
      if (!vehiculosMap[vehicleId]) {
          vehiculosMap[vehicleId] = {
              vehiculoID: vehicleId,  // Identificador del vehículo
              capacidad: 0,  // No tenemos info de capacidad, se puede setear después
              nodos: []
          };
      }

      // Buscar el nodo correspondiente en nodes
      const nodoInfo = nodes.find(n => n.id === nodeId);
      if (nodoInfo) {
          vehiculosMap[vehicleId].nodos.push(nodoInfo);
      }
  });

  // Convertir el objeto en array
  console.log(Object.values(vehiculosMap));
  
  return Object.values(vehiculosMap);
};


export const IBMService = {
  resolve: () => genericRequest('POST', 'execute'),
  getResults: async (nodes) => {
    const response = await genericRequest('GET', 'results')
    console.log(response);
    
    return mapResults(response.data, nodes)
  },
};
