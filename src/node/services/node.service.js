import axios from 'axios';

const API_URL = 'http://localhost:3000/nodes';

export const nodeService = {
    getAllNodes() {
        return axios.get(API_URL);
    },

    getNodeById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    // Obtener nodos por plotId
    getNodesByPlotId(plotId) {
        return axios.get(`${API_URL}?plotId=${plotId}`);
    },

    // Crear un nuevo nodo
    createNode(nodeData) {
        return axios.post(API_URL, nodeData);
    },

    // Actualizar nodo existente
    updateNode(id, nodeData) {
        return axios.put(`${API_URL}/${id}`, nodeData);
    },

    // Eliminar nodo
    deleteNode(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};
