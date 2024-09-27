<template>
  <div class="irrigation-card">
    <div class="irrigation-card-header">
      <img src="https://cdn-icons-png.flaticon.com/256/3527/3527044.png" alt="Irrigation" class="icon"/>
    </div>
    <div class="irrigation-card-body">
      <p><strong>Plot:</strong> {{ plotName }}</p>
      <p><strong>Moisture:</strong> {{ node.moisture }}%</p>
      <p><strong>Irrigation time:</strong> {{ schedule ? schedule.irrigationTime : 'Not scheduled' }}</p>
      <p><strong>Irrigation mode:</strong> {{ schedule ? schedule.irrigationMode : 'N/A' }}</p>
      <button v-if="schedule && schedule.irrigationMode === 'Automático'" class="cancel-btn" @click="cancelIrrigation">
        Cancel
      </button>
      <button v-else class="activate-btn" @click="activateSprinklers">
        Activate sprinklers
      </button>
    </div>
  </div>
</template>

<script>
import scheduleirrigationService from "@/plot/services/scheduleirrigation.service.js";

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
    cancelIrrigation() {
      scheduleirrigationService.cancelIrrigation(this.schedule.id)
          .then(() => {
            alert('Irrigation canceled.');
          })
          .catch(error => {
            console.error('Error canceling irrigation:', error);
          });
    },
    activateSprinklers() {
      scheduleirrigationService.activateIrrigation(this.schedule.id)
          .then(() => {
            alert('Sprinklers activated.');
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
  width: 100%;
  height: auto;
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
