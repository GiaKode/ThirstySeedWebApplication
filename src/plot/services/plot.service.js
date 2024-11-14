import axios from 'axios';

const API_URL = 'http://localhost:3000/plots';

export const plotService = {
    getAllPlots() {
        return axios.get(API_URL);
    },

    getPlotById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    createPlot(plotData) {
        return axios.post(API_URL, plotData);
    },

    updatePlot(id, plotData) {
        return axios.put(`${API_URL}/${id}`, plotData);
    },

    updatePlotNodeQuantity(id, nodeQuantity) {
        // Actualizar solo la cantidad de nodos instalados en la parcela
        return axios.patch(`${API_URL}/${id}`, { nodeQuantity });
    },

    updatePlotNodeStatus(id, nodesInstalled) {
        // Actualizar el estado de nodesInstalled para la parcela
        return axios.patch(`${API_URL}/${id}`, { nodesInstalled });
    },

    async deletePlot(id) {
        await removePlotFromUsers(id);
        return axios.delete(`${API_URL}/${id}`);
    },

    async getPlotsWithInstalledNodes() {
        // Método para obtener solo los plots con nodos instalados
        try {
            const response = await axios.get(API_URL);
            // Filtrar plots que tienen nodesInstalled en true
            return response.data.filter(plot => plot.nodesInstalled === true);
        } catch (error) {
            console.error('Error fetching plots with installed nodes:', error);
            throw error;
        }
    }
};

// Función auxiliar para eliminar la referencia de la parcela de los usuarios
async function removePlotFromUsers(plotId) {
    const API_USERS_URL = 'http://localhost:3000/users';

    const response = await axios.get(API_USERS_URL);
    const users = response.data;

    for (const user of users) {
        if (user.plots && user.plots.includes(plotId)) {
            user.plots = user.plots.filter(id => id !== plotId);
            await axios.put(`${API_USERS_URL}/${user.id}`, user);
        }
    }
}
