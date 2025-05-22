import axios from 'axios';

// Using direct URL since CORS is now properly handled on the backend
const API_BASE_URL = 'http://localhost:8080';

// Base64 encoded credentials
const encodedCredentials = btoa('user:ecfe4671-b9a9-4759-abaa-1e37b1cf8983');

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Basic ${encodedCredentials}`
  }
  // Removed withCredentials since CORS is now handled properly
});

// Add response interceptor for handling auth errors
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      if (error.response.status === 401) {
        console.error("Authentication failed! Please check your credentials.");
      } else if (error.response.status === 403) {
        console.error("Access forbidden! You don't have permission to perform this action.");
      }
    } else if (error.request) {
      console.error("No response received from server. Check your network connection.");
    } else {
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error);
  }
);

// Cliente endpoints
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getClienteById = async (id) => {
  try {
    const response = await api.get(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCliente = async (clienteData) => {
  try {
    const response = await api.post('/clientes', clienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateCliente = async (id, clienteData) => {
  try {
    const response = await api.put(`/clientes/${id}`, clienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCliente = async (id) => {
  try {
    await api.delete(`/clientes/${id}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Vehículo endpoints
export const getVehiculos = async () => {
  try {
    const response = await api.get('/vehiculos');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVehiculoByPlaca = async (placa) => {
  try {
    const response = await api.get(`/vehiculos/${placa}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVehiculo = async (vehiculoData) => {
  try {
    const response = await api.post('/vehiculos', vehiculoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVehiculo = async (placa, vehiculoData) => {
  try {
    const response = await api.put(`/vehiculos/${placa}`, vehiculoData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVehiculo = async (placa) => {
  try {
    await api.delete(`/vehiculos/${placa}`);
    return true;
  } catch (error) {
    throw error;
  }
};

// Venta endpoints
export const getVentas = async () => {
  try {
    const response = await api.get('/ventas');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getVentaByCodigo = async (codigo) => {
  try {
    const response = await api.get(`/ventas/${codigo}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createVenta = async (ventaData) => {
  try {
    const response = await api.post('/ventas', ventaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateVenta = async (codigo, ventaData) => {
  try {
    const response = await api.put(`/ventas/${codigo}`, ventaData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteVenta = async (codigo) => {
  try {
    await api.delete(`/ventas/${codigo}`);
    return true;
  } catch (error) {
    throw error;
  }
};
