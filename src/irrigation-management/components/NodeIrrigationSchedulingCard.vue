<template>
  <div class="irrigation-card">
    <div class="irrigation-card-header">
      <img src="https://cdn-icons-png.flaticon.com/256/3527/3527044.png" alt="Irrigation" class="icon"/>
    </div>
    <div class="irrigation-card-body">
      <p><strong>Plot:</strong> {{ plotName }}</p>
      <p><strong>Expected Moisture:</strong> {{ schedule.expectedMoisture }}</p>
      <p><strong>Water Amount:</strong> {{ schedule.requiredWaterAmount }}</p>
      <p><strong>Sprinkler Radius:</strong> {{ schedule.sprinklerRadius }}</p>
      <p><strong>Set Time:</strong> {{ schedule.setTime }}</p>
      <p><strong>Pressure:</strong> {{ schedule.pressure }}</p>
      <p><strong>Irrigation Mode:</strong> {{ schedule.isAutomatic ? 'Automatic' : 'Manual' }}</p>
<<<<<<< Updated upstream
      
=======

>>>>>>> Stashed changes
      <button v-if="schedule.isAutomatic" class="cancel-btn" @click="cancelIrrigation">
        Cancel
      </button>
      <button v-else class="activate-btn" @click="activateSprinklers(schedule.id)">
        Activate sprinklers
      </button>
    </div>
  </div>
</template>

<script>
import IrrigationSettingsService from '../services/irrigation-setting-service';

export default {
  props: {
    node: {
      type: Object,
      required: true,
    },
    schedule: {
      type: Object,
      required: true,
    },
    plotName: {
      type: String,
      default: '',
    },
  },
  methods: {
<<<<<<< Updated upstream
    cancelIrrigation() {
      IrrigationSettingsService.delete(this.schedule.id)
=======
    cancelIrrigation(scheduleId) {
      IrrigationSettingsService.delete(scheduleId)
>>>>>>> Stashed changes
        .then(() => {
          alert('Irrigation canceled.');
        })
        .catch(error => {
          console.error('Error canceling irrigation:', error);
        });
    },
<<<<<<< Updated upstream
    activateSprinklers() {
      IrrigationSettingsService.update(this.schedule.id, { ...this.schedule, isActive: true })
        .then(() => {
          alert('Sprinklers activated.');
=======
    activateSprinklers(scheduleId) {
      IrrigationSettingsService.update(scheduleId, { ...this.schedule, isActive: true })
        .then(() => {
          alert('Sprinklers activated.');
          this.$router.push({ name: 'activateirrigationnodes' }); // Redirigir a la vista por nombre
>>>>>>> Stashed changes
        })
        .catch(error => {
          console.error('Error activating sprinklers:', error);
        });
    }
  }
};
</script>

<style scoped>
.irrigation-card {
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px;
  width: 250px;
}
.irrigation-card-header img {
  width: 120px ;
  margin-bottom: 5px;
}
.irrigation-card-body {
  margin-top: 16px;
}
.cancel-btn {
  background-color: #bbb;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
.activate-btn {
  background-color: #f66;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
}
</style>
