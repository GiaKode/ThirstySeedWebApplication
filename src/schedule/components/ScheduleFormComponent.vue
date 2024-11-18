<template>
  <div class="schedule-form">
    <h2>{{ isEditMode ? 'Edit Schedule' : 'Create Schedule' }}</h2>
    <div v-if="message" :class="messageClass" class="message">
      {{ message }}
    </div>
    <div class="plot-select">
      <label for="plot">Select plot:</label>
      <select id="plot" v-model="scheduleData.plotId">
        <option value="" disabled>Select a plot</option>
        <option v-for="plot in plots" :key="plot.id" :value="plot.id">
          {{ plot.name }} ({{ plot.size }} m2)
        </option>
      </select>
    </div>

    <!-- Form Fields -->
    <div class="form-group">
      <label>Expected Moisture (%)</label>
      <input type="number" v-model.number="scheduleData.expectedMoisture" placeholder="Enter expected moisture" />
    </div>

    <div class="form-group">
      <label>Required Water Amount (l)</label>
      <input type="number" v-model.number="scheduleData.requiredWaterAmount" placeholder="Enter water amount in liters" />
    </div>

    <div class="form-group">
      <label>Estimated Time (h)</label>
      <input type="number" v-model.number="scheduleData.estimatedTime" placeholder="Enter estimated time in minutes" />
    </div>

    <div class="form-group">
      <label>Sprinkler Radius (m)</label>
      <input type="number" v-model.number="scheduleData.sprinklerRadius" placeholder="Enter sprinkler radius in meters" />
    </div>

    <div class="form-group">
      <label>Set Time (hh:mm AM/PM)</label>
      <input type="text" v-model="scheduleData.setTime" placeholder="Enter time (e.g., 08:00 AM)" />
    </div>

    <div class="form-group">
      <label>Angle (degrees)</label>
      <input type="number" v-model.number="scheduleData.angle" placeholder="Enter angle in degrees" />
    </div>

    <div class="form-group">
      <label>Pressure (bar)</label>
      <input type="number" v-model.number="scheduleData.pressure" placeholder="Enter pressure in bar" />
    </div>

    <div class="form-group">
      <label>Automatic</label>
      <input type="checkbox" v-model="scheduleData.isAutomatic" />
    </div>

    <!-- Buttons -->
    <div class="button-group">
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PlotService from '../services/plot-service.ts';
import ScheduleService from '../services/schedule-service.ts';
import type { Schedule } from '../models/Schedule';

export default defineComponent({
  name: 'ScheduleFormComponent',
  props: {
    schedule: {
      type: Object,
      required: true,
      default: (): Schedule => ({
        plotId: null,
        expectedMoisture: 0,
        estimatedTimeHours: 0,
        waterAmount: 0,
        sprinklerRadius: 0,
        setTime: '',
        angle: 0,
        pressure: 0,
        isAutomatic: false
      })
    }
  },
  data() {
    return {
      plots: [] as Array<{ id: number; name: string; size: number }>,
      message: '',
      messageClass: '',
      isEditMode: Boolean((this.schedule as Schedule).id),
      scheduleData: { ...this.schedule } as Schedule
    };
  },
  methods: {
    async getAllPlots() {
      try {
        this.plots = await PlotService.getPlotsByCurrentUser();
      } catch (error) {
        console.error('Error al obtener las parcelas:', error);
      }
    },
    validateTimeFormat(time: string): boolean {
      const timeFormat = /^(0[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;
      return timeFormat.test(time);
    },
    validateForm() {
      const { plotId, expectedMoisture, requiredWaterAmount, setTime } = this.scheduleData;
      if (!plotId || !expectedMoisture || !requiredWaterAmount || !setTime) {
        this.message = 'Please fill in all required fields.';
        this.messageClass = 'error-message';
        return false;
      }

      if (!this.validateTimeFormat(setTime)) {
        this.message = 'Invalid time format. Use hh:mm AM/PM.';
        this.messageClass = 'error-message';
        return false;
      }

      return true;
    },
    async save() {
      if (!this.validateForm()) return;

      try {
        const scheduleToSend = {
          ...this.scheduleData,
          estimatedTimeHours: Number(this.scheduleData.estimatedTime), // Ajustar nombre y convertir a número
          waterAmount: Number(this.scheduleData.requiredWaterAmount), // Ajustar nombre y convertir a número
          sprinklerRadius: Number(this.scheduleData.sprinklerRadius),
          expectedMoisture: Number(this.scheduleData.expectedMoisture),
          pressure: Number(this.scheduleData.pressure),
          angle: Number(this.scheduleData.angle),
          isAutomatic: this.scheduleData.isAutomatic,
          setTime: this.scheduleData.setTime // Validar formato hh:mm AM/PM
        };

        if (this.isEditMode) {
          await ScheduleService.updateSchedule(this.scheduleData.id, scheduleToSend);
          this.message = 'Schedule updated successfully!';
        } else {
          await ScheduleService.createSchedule(scheduleToSend);
          this.message = 'Schedule created successfully!';
        }

        this.messageClass = 'success-message';
        setTimeout(() => {
          this.message = '';
          this.$emit('saved');
        }, 2000);
      } catch (error) {
        this.message = 'Failed to save schedule.';
        this.messageClass = 'error-message';
        console.error('Error:', error);
      }
    },
    cancel() {
      this.$emit('cancelled');
    }
  },
  mounted() {
    this.getAllPlots();
  }
});
</script>

<style scoped>
.schedule-form {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="number"],
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  box-sizing: border-box;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
}

.success-message {
  background-color: #d4edda;
  color: #155724;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
}

.button-group button {
  margin-right: 10px;
  padding: 10px 15px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.button-group button:first-of-type {
  background-color: #28a745;
  color: white;
}

.button-group button:last-of-type {
  background-color: #dc3545;
  color: white;
}
</style>
