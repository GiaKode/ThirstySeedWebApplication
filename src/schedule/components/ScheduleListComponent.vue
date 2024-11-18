<template>
  <div class="schedule-list">
    <h2>Schedule List</h2>
    <div v-if="schedules.length === 0">
      No schedules available.
    </div>
    <div v-else>
      <ScheduleCardComponent
        v-for="schedule in schedules"
        :key="schedule.id"
        :schedule="schedule"
        @edit="editSchedule"
        @delete="deleteSchedule"
      />
    </div>
    <button @click="createNewSchedule">Add New Schedule</button>

    <!-- Add Schedule Form -->
    <ScheduleFormComponent
      v-if="isFormVisible"
      :schedule="selectedSchedule"
      @saved="loadSchedules"
      @cancelled="closeForm"
    />
  </div>
</template>

<script>
import ScheduleService from '../services/schedule-service.ts';
import ScheduleCardComponent from './ScheduleCardComponent.vue';
import ScheduleFormComponent from './ScheduleFormComponent.vue';

export default {
  name: 'ScheduleListComponent',
  components: {
    ScheduleCardComponent,
    ScheduleFormComponent
  },
  data() {
    return {
      schedules: [],
      isFormVisible: false,
      selectedSchedule: null,
    };
  },
  methods: {
    loadSchedules() {
      ScheduleService.getSchedulesByCurrentUser()
        .then(response => {
          this.schedules = response;
        })
        .catch(error => {
          console.error('Error al obtener los schedules:', error);
        });
    },
    createNewSchedule() {
      this.selectedSchedule = {
        plotId: null,
        expectedMoisture: 0,
        estimatedTimeHours: 0,
        waterAmount: 0,
        sprinklerRadius: 0,
        setTime: '',
        angle: 0,
        pressure: 0,
        isAutomatic: false
      };
      this.isFormVisible = true;
    },
    editSchedule(schedule) {
      this.selectedSchedule = schedule;
      this.isFormVisible = true;
    },
    deleteSchedule(scheduleId) {
      ScheduleService.deleteSchedule(scheduleId)
        .then(() => {
          this.loadSchedules();
        })
        .catch(error => {
          console.error('Error al eliminar el schedule:', error);
        });
    },
    closeForm() {
      this.isFormVisible = false;
      this.selectedSchedule = null;
    }
  },
  mounted() {
    this.loadSchedules();
  }
};
</script>

<style scoped>
.schedule-list {
  padding: 20px;
}

.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  background-color: #4caf50;
  color: white;
  margin-top: 20px;
}

/* Opcional: Ajuste visual de las tarjetas */
.schedule-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.schedule-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
}
</style>
