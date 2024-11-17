import axios from 'axios';

const API_URL = 'https://thirstyseedapi-production.up.railway.app/api/v1/plot';

export const plotService = {
    // Obtener el usuario actual desde localStorage
    async getCurrentUser () {
        const userId = localStorage.getItem('userId');

        if (!userId) return null;
        return { id: userId };  // Simplificado para este caso
    },

    // Crear un nuevo plot
    async createPlot(plotData) {
        try {
            const response = await axios.post(API_URL, plotData);
            return response.data;
        } catch (error) {
            console.error('Error creating plot:', error);
            throw error;
        }
    },

    // Obtener todos los plots de un usuario
    async getPlotsByUserId(userId) {
        if (!userId) {
            throw new Error('User  ID is required');
        }
        return axios.get(`${API_URL}/user/${userId}`);
    },

    // Obtener un plot por su ID
    async getPlotById(id) {
        const token = localStorage.getItem('authToken'); // Obtén el token de localStorage
        return axios.get(`${API_URL}/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
            },
        });
    },

    // Actualizar un plot existente
    async updatePlot(id, plotData) {
        return axios.put(`${API_URL}/${id}`, plotData);
    },

    // Eliminar un plot por su ID
    async deletePlot(id) {
        return axios.delete(`${API_URL}/${id}`);
    },

    // Obtener todos los plots
    async getAllPlots() {
        const token = localStorage.getItem('authToken'); // Obtén el token de localStorage
        return axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
            },
        });
    }
};
