import axios from 'axios';

// URL base dell'API Laravel - usa la variabile d'ambiente
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9000/api';

// Configurazione base di axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Interceptor per aggiungere il token JWT a tutte le richieste
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor per gestire gli errori globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token scaduto o non valido - logout automatico
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Funzioni API specifiche per MyUniPi
export const apiService = {
  // Autenticazione
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),

  logout: () => 
    api.post('/auth/logout'),

  getUser: () => 
    api.get('/auth/user'),

  // Utenti
  getProfile: () => 
    api.get('/user/profile'),

  updateProfile: (data: any) =>
    api.put('/user/profile', data),

  // Esami
  getExams: () => 
    api.get('/exams'),

  getExam: (examId: number) =>
    api.get(`/exams/${examId}`),

  enrollExam: (examId: number) => 
    api.post(`/exams/${examId}/enroll`),

  unenrollExam: (examId: number) =>
    api.delete(`/exams/${examId}/enroll`),

  // Orari lezioni
  getTimetable: () => 
    api.get('/timetable'),

  // Corsi e recensioni
  getCourses: () =>
    api.get('/courses'),

  getCourse: (courseId: number) =>
    api.get(`/courses/${courseId}`),

  getCourseReviews: (courseId: number) => 
    api.get(`/courses/${courseId}/reviews`),

  submitReview: (courseId: number, data: any) => 
    api.post(`/courses/${courseId}/reviews`, data),

  // Badge digitale
  getDigitalBadge: () =>
    api.get('/badge'),

  // Calcolo media
  calculateAverage: () =>
    api.get('/calculate/average'),

  calculateThesisScore: () =>
    api.get('/calculate/thesis-score')
};

// Funzioni di utilità per l'autenticazione
export const authHelper = {
  setToken: (token: string) => {
    localStorage.setItem('auth_token', token);
    api.defaults.headers.Authorization = `Bearer ${token}`;
  },

  removeToken: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    delete api.defaults.headers.Authorization;
  },

  getToken: () => {
    return localStorage.getItem('auth_token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  }
};

export default apiService;