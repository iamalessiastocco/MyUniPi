import { apiService } from './api';

export const authService = {
  login: async (email: string, password: string) => {
    const response = await apiService.login(email, password);
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response;
  },

  logout: () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    return apiService.logout();
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('auth_token');
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};