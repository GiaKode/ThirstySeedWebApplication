import axios from 'axios';

const API_URL = 'https://thirstyseedapi-production.up.railway.app/api/v1/plot';

export const plotService = {

    async getCurrentUser () {
        const userId = localStorage.getItem('userId');

        if (!userId) return null;
        return { id: userId };
    },


    async createPlot(plotData) {
        try {
            const response = await axios.post(API_URL, plotData);
            return response.data;
        } catch (error) {
            console.error('Error creating plot:', error);
            throw error;
        }
    },


    async getPlotsByUserId(userId) {
        if (!userId) {
            throw new Error('User  ID is required');
        }
        return axios.get(`${API_URL}/user/${userId}`);
    },


    async getPlotById(id) {
        return axios.get(`${API_URL}/${id}`);
    },



    async updatePlot(id, plotData) {
        return axios.put(`${API_URL}/${id}`, plotData);
    },


    async deletePlot(id) {
        return axios.delete(`${API_URL}/${id}`);
    },


    async getAllPlots() {
        const token = localStorage.getItem('authToken');
        return axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`, // Incluye el token en los encabezados
            },
        });
    }
};
