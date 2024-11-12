import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/node';

export const nodeService = {
    getAllNodes() {
        return axios.get(API_URL);
    },

    getNodeById(id) {
        return axios.get(`${API_URL}/${id}`);
    },

    getNodesByPlotId(plotId) {
        return axios.get(`${API_URL}/plot/${plotId}`);
    },

    createNode(nodeData) {
        return axios.post(API_URL, nodeData);
    },

    updateNode(id, nodeData) {
        return axios.put(`${API_URL}/${id}`, nodeData);
    },

    deleteNode(id) {
        return axios.delete(`${API_URL}/${id}`);
    },


    getNodeByProductCode(productcode) {
        return axios.get(`${API_URL}?productcode=${productcode}`);
    }
};
