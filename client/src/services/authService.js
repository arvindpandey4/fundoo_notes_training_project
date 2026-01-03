import api from './api';

export const authService = {
    register: async (userData) => {
        const response = await api.post('/users/register', userData);
        return response.data;
    },

    login: async (credentials) => {
        const response = await api.post('/users/login', credentials);
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    forgotPassword: async (email) => {
        const response = await api.post('/users/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (token, password) => {
        const response = await api.post('/users/reset-password', { token, password });
        return response.data;
    },

    getCurrentUser: () => {
        try {
            const user = localStorage.getItem('user');
            if (!user || user === 'undefined' || user === 'null') {
                return null;
            }
            return JSON.parse(user);
        } catch (error) {
            console.error('Error parsing user from localStorage:', error);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            return null;
        }
    },

    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },
};
