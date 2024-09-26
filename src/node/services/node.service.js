import axios from 'axios';

const API_URL = 'http://localhost:3000/nodes';

export const nodeService = {
    getAllNodes() {
        return axios.get(API_URL);
    },

    getNodeById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    // Nueva función para obtener nodos por plotId
    getNodesByPlotId(plotId) {
        return axios.get(`${API_URL}?plotId=${plotId}`);
    },

    createNode(nodeData) {
        return axios.post(API_URL, nodeData);
    },

    updateNode(id, nodeData) {
        return axios.put(`${API_URL}/${id}`, nodeData);
    },

    deleteNode(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};
