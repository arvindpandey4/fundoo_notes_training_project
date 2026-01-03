import api from './api';

export const labelService = {
    createLabel: async (labelData) => {
        const response = await api.post('/labels', labelData);
        return response.data;
    },

    getLabels: async () => {
        const response = await api.get('/labels');
        return response.data;
    },

    getLabel: async (id) => {
        const response = await api.get(`/labels/${id}`);
        return response.data;
    },

    updateLabel: async (id, labelData) => {
        const response = await api.put(`/labels/${id}`, labelData);
        return response.data;
    },

    deleteLabel: async (id) => {
        const response = await api.delete(`/labels/${id}`);
        return response.data;
    },
};
