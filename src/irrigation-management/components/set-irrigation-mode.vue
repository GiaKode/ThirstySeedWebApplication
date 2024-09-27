<template>
  <div class="set-irrigation-mode">
    <div class="header">
      <h2>Schedule Irrigation</h2>
      <div v-if="message" :class="messageClass" class="message">
        {{ message }}
      </div>

      <div class="toggle-group">
        <label>{{ isAutomatic ? 'Automatic water' : 'Manual water' }}</label>
        <label class="switch">
          <input type="checkbox" v-model="isAutomatic" />
          <span class="slider"></span>
        </label>

        <div class="button-group">
          <button @click="save">Save</button>
          <button @click="cancel">Cancel</button>
        </div>
      </div>
    </div>

    <div class="irrigation-settings-card">
      <div class="irrigation-settings" :class="{ automatic: isAutomatic, manual: !isAutomatic }">
        <div>
          <label>Expected moisture</label>
          <input type="text" v-model="settings.expectedMoisture" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Plot size (m2)</label>
          <input type="text" v-model="settings.plotSize" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Estimated time (hours)</label>
          <input type="text" v-model="settings.estimatedTime" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Set time</label>
          <input type="text" v-model="settings.setTime" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Required water amount</label>
          <input type="text" v-model="settings.requiredWaterAmount" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Sprinkler radius</label>
          <input type="text" v-model="settings.sprinklerRadius" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Angle</label>
          <input type="text" v-model="settings.angle" :disabled="isAutomatic" />
        </div>

        <div>
          <label>Pressure</label>
          <input type="text" v-model="settings.pressure" :disabled="isAutomatic" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IrrigationSettingsService from '../services/irrigation-setting-service';

export default {
  name: 'SetIrrigationMode',
  data() {
    return {
      isAutomatic: true,
      settings: {
        expectedMoisture: '40%',
        plotSize: '100 m2',
        estimatedTime: '3 horas',
        setTime: '08:15 pm',
        requiredWaterAmount: '500 cm3 (500 l)',
        sprinklerRadius: '7 m',
        angle: '30 grados',
        pressure: '50 psi'
      },
      message: '',
      messageClass: ''
    };
  },
  methods: {
    save() {
      const irrigationData = {
        ...this.settings,
        isAutomatic: this.isAutomatic,
        plotId: 1
      };

      IrrigationSettingsService.create(irrigationData)
        .then(() => {
          this.message = 'Irrigation settings saved successfully!';
          this.messageClass = 'success-message';
          this.settings = {
            expectedMoisture: '',
            plotSize: '',
            estimatedTime: '',
            setTime: '',
            requiredWaterAmount: '',
            sprinklerRadius: '',
            angle: '',
            pressure: ''
          };
          setTimeout(() => {
            this.message = '';
          }, 2000);
        })
        .catch(error => {
          this.message = 'Failed to save irrigation settings!';
          this.messageClass = 'error-message';
          setTimeout(() => {
            this.message = '';
          }, 2000);

          console.error('Error al guardar los datos:', error);
        });
    },
    cancel() {
      console.log('Cancel');
    }
  }
};
</script>

<style scoped>
* {
  font-family: 'Poppins', sans-serif;
}

body, h2, label, input {
  color: #12723D;
}

.set-irrigation-mode {
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.toggle-group {
  display: flex;
  align-items: center;
  gap: 15px;
}

.toggle-group label {
  font-weight: 600;
  font-size: 16px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #2B9846;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.button-group {
  margin-left: auto;
  display: flex;
  gap: 10px;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:first-of-type {
  background-color: #4caf50;
  color: white;
}

button:last-of-type {
  background-color: #ccc;
  color: black;
}

.irrigation-settings-card {
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.irrigation-settings {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.irrigation-settings.automatic input {
  background-color: #DEF6D9;
  border: none;
}

.irrigation-settings.manual input {
  background-color: white;
  border: 1px solid #2B9846;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
}

input[disabled] {
  background-color: #f0f0f0;
}

.message {
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
  text-align: center;
}

.success-message {
  background-color: #dff0d8;
  color: #3c763d;
}

.error-message {
  background-color: #f2dede;
  color: #a94442;
}
</style>
