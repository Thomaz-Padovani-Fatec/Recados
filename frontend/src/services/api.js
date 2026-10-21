// Arquivo: src/services/api.js
//
// Instale o Axios antes de usar:
// npm install axios
//
// Este arquivo cria uma instância do Axios já configurada
// para apontar para o Laravel e incluir o token em toda requisição.

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor de requisição:
// Antes de TODA requisição, verifica se há token salvo
// e o adiciona automaticamente no header Authorization.
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// ─────────────────────────────────────────────────────────────────────────────
// Como usar nos componentes:
//
// import api from '../services/api';
//
// // GET — buscar dados
// const { data } = await api.get('/recados');
//
// // POST — enviar dados
// const { data } = await api.post('/login', { email, password });
//
// // DELETE
// await api.delete(`/recados/${id}`);
// ─────────────────────────────────────────────────────────────────────────────
