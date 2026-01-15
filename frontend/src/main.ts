import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// --- KONFIGURACJA AXIOS ---
axios.defaults.baseURL = '/api'; // (opcjonalne, jeśli tak masz ustawione)

// Interceptor: Przed każdym zapytaniem dodaj token
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor: Jeśli token wygasł (błąd 401), wyloguj
axios.interceptors.response.use(response => response, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

const app = createApp(App)
app.use(router)
app.mount('#app')
