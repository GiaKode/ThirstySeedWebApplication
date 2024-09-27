<template>
  <div class="plots-status">
    <div class="header-container">
      <h1 class="plots-header">Registered Plots</h1>
      <!-- Botón de Registrar Plot -->
      <button class="register-plot-btn" @click="goToRegisterPlot">Register Plot</button>
    </div>
    
    <div class="plots">
      <div class="plot" v-for="plot in plots" :key="plot.id">
        <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" /> <!-- Cambiado a plot.imageUrl -->
        <div class="plot-details">
          <p><strong>Land Name:</strong> {{ plot.name }}</p>
          <p><strong>Location:</strong> {{ plot.location }}</p>
          <p><strong>Extension of Land:</strong> {{ plot.extension }} m2</p>
          <p>
            <strong>Plot Status: </strong>
            <span :class="{ 'not-supplied': plot.status === 'Not Supplied' }">
              {{ plot.status }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ViewPlotStatus',
  data() {
    return {
      plots: []
    };
  },
  created() {
    this.fetchPlots();
  },
  methods: {
    async fetchPlots() {
      try {
        const response = await axios.get('http://localhost:3000/plots');
        this.plots = response.data;
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    },
    // Método para redirigir a /register-plot
    goToRegisterPlot() {
      this.$router.push('/register-plot'); // Redirige a la ruta /register-plot
    }
  }
};
</script>

<style scoped>
.plots-status {
  margin: 20px;
}

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.plots-header {
  font-size: 24px;
  margin-left: 130px;
}

.register-plot-btn {
  background-color: #3D703B;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  margin-right: 20px;
}

.register-plot-btn:hover {
  background-color: #2c522a;
}

.not-supplied {
  color: red;
}

.plots {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Dos columnas */
  gap: 20px;
  justify-content: center;
  margin-left: 150px;
  width: 1000px;
}

.plot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  margin: 10px;
  margin-bottom: 60px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 350px;
}

.plot-image {
  width: 60%;
  height: 260px;
  object-fit: cover;
  border-radius: 10px;
  margin-right: 20px;
}

.plot-details {
  margin-top: 15px;
  flex-direction: column;
  justify-content: flex-start;
}

.plot-details p {
  margin: 5px 0;
  font-size: 16px;
  color: #333;
}
</style>
