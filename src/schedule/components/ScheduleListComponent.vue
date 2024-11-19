<template>
  <div class="schedule-grid">
    <ScheduleCardComponent
      v-for="schedule in schedules"
      :key="schedule.id"
      :schedule="schedule"
      @edit="editSchedule"
      @delete="deleteSchedule"
    />
  </div>
</template>

<script>
import ScheduleService from '../services/schedule-service.ts';
import ScheduleCardComponent from './ScheduleCardComponent.vue';

export default {
  name: 'ScheduleListComponent',
  components: {
    ScheduleCardComponent
  },
  data() {
    return {
      schedules: []
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
    editSchedule(schedule) {
      this.$router.push({ name: 'scheduleform', params: { id: schedule.id } });
    },
    deleteSchedule(scheduleId) {
      ScheduleService.deleteSchedule(scheduleId)
        .then(() => {
          this.loadSchedules();
        })
        .catch(error => {
          console.error('Error al eliminar el schedule:', error);
        });
    }
  },
  mounted() {
    this.loadSchedules();
  }
};
</script>

<style scoped>
/* Estilo del contenedor del grid */
.schedule-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); /* Múltiples columnas dinámicas */
  gap: 20px; /* Espaciado entre las tarjetas */
  margin-top: 20px;
}

@media (max-width: 600px) {
  .schedule-grid {
    grid-template-columns: 1fr; /* Una columna en pantallas pequeñas */
  }
}
</style>
