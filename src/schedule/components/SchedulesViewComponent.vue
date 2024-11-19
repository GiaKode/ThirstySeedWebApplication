<template>
  <div class="schedules-view">
    <!-- Cabecera con Toolbar de PrimeVue -->
    <pv-toolbar class="toolbar">
      <template #start>
        <h2>Schedules</h2>
      </template>
      <template #end>
        <button @click="createNewSchedule" class="add-button">Add New Schedule</button>
      </template>
    </pv-toolbar>

    <!-- Divider -->
    <br/>
    <pv-divider class="divider" />
    
    <!-- Lista de Schedules -->
    <div class="content">
      <ScheduleListComponent />
    </div>
  </div>
</template>

<script>
import ScheduleListComponent from './ScheduleListComponent.vue';

export default {
  name: 'SchedulesViewComponent',
  components: {
    ScheduleListComponent
  },
  methods: {
    createNewSchedule() {
      this.$router.push({ name: 'scheduleform' });
    }
  }
};
</script>

<style scoped>
/* Contenedor principal */
.schedules-view {
  flex: auto;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  padding: 10px;
}

.toolbar h2 {
  margin: 0;
  font-size: 24px;
  color: #12723d;
}

.add-button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #45a049;
}


pv-divider {
  color:#12723d;
}

.content {
  flex: 1;  
  overflow-y: auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.content > * {
  width: 100%;
}
</style>
