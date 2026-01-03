import api from './api';

export const noteService = {
    createNote: async (noteData) => {
        const response = await api.post('/notes', noteData);
        return response.data;
    },

    getNotes: async () => {
        const response = await api.get('/notes');
        return response.data;
    },

    getNote: async (id) => {
        const response = await api.get(`/notes/${id}`);
        return response.data;
    },

    updateNote: async (id, noteData) => {
        const response = await api.put(`/notes/${id}`, noteData);
        return response.data;
    },

    deleteNote: async (id) => {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    },

    getArchivedNotes: async () => {
        const response = await api.get('/notes/archived');
        return response.data;
    },

    getTrashedNotes: async () => {
        const response = await api.get('/notes/trashed');
        return response.data;
    },

    toggleArchive: async (id) => {
        const response = await api.patch(`/notes/${id}/archive`);
        return response.data;
    },

    toggleTrash: async (id) => {
        const response = await api.patch(`/notes/${id}/trash`);
        return response.data;
    },

    togglePin: async (id) => {
        const response = await api.patch(`/notes/${id}/pin`);
        return response.data;
    },

    searchNotes: async (query) => {
        const response = await api.get(`/notes/search?q=${query}`);
        return response.data;
    },

    searchByLabel: async (labelId) => {
        const response = await api.get(`/notes/label/${labelId}`);
        return response.data;
    },

    addCollaborator: async (id, email) => {
        const response = await api.post(`/notes/${id}/collaborator`, { email });
        return response.data;
    },
};
