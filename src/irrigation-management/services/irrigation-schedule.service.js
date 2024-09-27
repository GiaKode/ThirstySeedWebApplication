import axios from 'axios';

const API_URL = 'http://localhost:3000';

class ScheduleIrrigationService {

    getIrrigationScheduleByPlotId(plotId) {
        return axios.all([
            axios.get(`${API_URL}/nodes?plotId=${plotId}`), // Obtener nodos por plotId
            axios.get(`${API_URL}/irrigationSchedules?plotId=${plotId}`) // Obtener schedules por plotId
        ]).then(axios.spread((nodes, schedules) => {
            return { nodes: nodes.data, schedules: schedules.data };
        }));
    }


    updateIrrigationSchedule(scheduleId, updatedSchedule) {
        return axios.put(`${API_URL}/irrigationSchedules/${scheduleId}`, updatedSchedule);
    }


    cancelIrrigation(scheduleId) {
        return this.updateIrrigationSchedule(scheduleId, { irrigationMode: 'Cancelado' });
    }


    activateIrrigation(scheduleId) {
        return this.updateIrrigationSchedule(scheduleId, { irrigationMode: 'Manual' });
    }
}

export default new ScheduleIrrigationService();
