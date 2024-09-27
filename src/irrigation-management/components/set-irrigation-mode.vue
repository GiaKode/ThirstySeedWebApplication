<template>
    <div class="irrigation-container">
      <h2>Schedule Irrigation</h2>
      <div>
        <label>{{ isAutomatic ? "Automatic water" : "Manual water" }}</label>
        <input type="checkbox" v-model="isAutomatic" />
      </div>
  
      <div class="irrigation-settings">
        <div>
          <label>Expected moisture</label>
          <input v-model="settings.expectedMoisture" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Plot size</label>
          <input v-model="settings.plotSize" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Estimated time</label>
          <input v-model="settings.estimatedTime" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Set time</label>
          <input v-model="settings.setTime" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Required water amount</label>
          <input v-model="settings.requiredWaterAmount" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Sprinkler radius</label>
          <input v-model="settings.sprinklerRadius" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Angle</label>
          <input v-model="settings.angle" :disabled="isAutomatic" />
        </div>
  
        <div>
          <label>Pressure</label>
          <input v-model="settings.pressure" :disabled="isAutomatic" />
        </div>
      </div>
  
      <button @click="save">Save</button>
      <button @click="cancel">Cancel</button>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SetIrrigationMode',
    data() {
      return {
        isAutomatic: true,
        settings: {
          expectedMoisture: "40%",
          plotSize: "100 m2",
          estimatedTime: "3 horas",
          setTime: "08:15 pm",
          requiredWaterAmount: "500 cm3 (500 l)",
          sprinklerRadius: "7 m",
          angle: "30 grados",
          pressure: "50 psi"
        }
      };
    },
    methods: {
      save() {
        console.log("Save irrigation settings", this.settings);
      },
      cancel() {
        console.log("Cancel");
      }
    }
  };
  </script>
  
  <style scoped>
  .irrigation-container {
    display: flex;
    flex-direction: column;
  }
  
  .irrigation-settings {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
  
  input[disabled] {
    background-color: #e0e0e0; /* Estilo para inputs deshabilitados */
  }
  </style>
  