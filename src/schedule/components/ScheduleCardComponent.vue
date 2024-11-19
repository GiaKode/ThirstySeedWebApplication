<template>
  <div class="schedule-card">
    <div class="card-header">
      <h3>{{ getPlotNameById(schedule.plotId) }}</h3>
      <span :class="['status', schedule.isAutomatic ? 'automatic' : 'manual']">
        {{ schedule.isAutomatic ? 'Automatic' : 'Manual' }}
      </span>
    </div>
    <div class="card-body">
      <div class="detail">
        <label>Moisture:</label>
        <span>{{ schedule.expectedMoisture }}</span>
      </div>
      <div class="detail">
        <label>Irrigation Time:</label>
        <span>{{ schedule.setTime }}</span>
      </div>
      <div class="detail">
        <label>Water Amount:</label>
        <span>{{ schedule.requiredWaterAmount }}</span>
      </div>
      <div class="detail">
        <label>Pressure:</label>
        <span>{{ schedule.pressure }}</span>
      </div>
    </div>
    <div class="card-actions">
      <button @click="$emit('edit', schedule)">Edit</button>
      <button @click="deleteSchedule" class="delete-button">Delete</button>
      <button v-if="!schedule.isAutomatic" @click="activateSprinklers">Activate Sprinklers</button>
    </div>
  </div>
</template>

<script>
import PlotService from '../services/plot-service.ts';

export default {
  name: 'ScheduleCardComponent',
  props: {
    schedule: {
      type: Object,
      required: true
    }
  },
  methods: {
    deleteSchedule() {
      this.$emit('delete', this.schedule.id);
    },
    activateSprinklers() {
      console.log('Activating sprinklers for schedule:', this.schedule.id);
    },
    getPlotNameById(plotId) {
      return PlotService.getPlotById(plotId).name;
    }
  }
};
</script>

<style scoped>
.schedule-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
}

.status {
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 0.8em;
  color: white;
}

.status.automatic {
  background-color: #4caf50;
}

.status.manual {
  background-color: #f39c12;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.detail {
  display: flex;
  justify-content: space-between;
}

.detail label {
  font-weight: bold;
  color: #12723d;
}

.card-actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:first-of-type {
  background-color: #2b9846;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
}

button:last-of-type {
  background-color: #ff9800;
  color: white;
}
</style>
