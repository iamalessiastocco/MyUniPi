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

// Interceptor per gestire gli errori globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Funzioni API specifiche per MyUniPi
export const apiService = {
  // Esempio: login utente
  login: (email: string, password: string) => 
    api.post('/auth/login', { email, password }),

  // Esempio: ottenere profilo utente
  getProfile: () => 
    api.get('/user/profile'),

  // Esempio: ottenere esami
  getExams: () => 
    api.get('/exams'),

  // Esempio: iscriversi a un appello
  enrollExam: (examId: number) => 
    api.post(`/exams/${examId}/enroll`),

  // Esempio: ottenere orari lezioni
  getTimetable: () => 
    api.get('/timetable'),

  // Esempio: ottenere recensioni corsi
  getCourseReviews: (courseId: number) => 
    api.get(`/courses/${courseId}/reviews`),

  // Esempio: inviare una recensione
  submitReview: (courseId: number, data: any) => 
    api.post(`/courses/${courseId}/reviews`, data),
};

export default apiService;