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

    deletePlot(id) {
        return axios.delete(`${API_URL}/${id}`);
    }
};