<template>
  <div class="plots-status">
    <div class="header-container">
      <h1 class="plots-header">Registered Plots</h1>
      <button class="register-plot-btn" @click="goToRegisterPlot">Register Plot</button>
    </div>

    <div class="plots" v-if="plots.length">
      <div class="plot" v-for="plot in plots" :key="plot.id">
        <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" />
        <div class="plot-details">
          <p><strong>Land Name:</strong> {{ plot.name || 'No disponible' }}</p>
          <p><strong>Location:</strong> {{ plot.location || 'No disponible' }}</p>
          <p><strong>Extension of Land:</strong> {{ plot.extension ? plot.extension + ' m2' : 'No disponible' }}</p>
          <p>
            <strong>Plot Status: </strong>
            <span :class="{ 'not-supplied': plot.status === 'Not Supplied' }">
              {{ plot.status || 'No disponible' }}
            </span>
          </p>
        </div>
      </div>
    </div>
    <p v-else>No plots available. Please register a new plot.</p>

    <div v-if="confirmationMessage" class="confirmation-message">
      {{ confirmationMessage }}
    </div>
    <div v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script>
import { plotService } from '@/plot/services/plot.service.js';
import { userService as UserService } from '@/plot/services/user-service.js';

export default {
  data() {
    return {
      plots: [],
      confirmationMessage: '',
      errorMessage: '',
    };
  },
  async created() {
    try {
      await this.fetchPlots();
    } catch (error) {
      console.error("Error loading plots:", error);
    }
  },
  methods: {
    async fetchPlots() {
      try {
        const currentUser = await UserService.getCurrentUser();
        if (!currentUser) {
          this.errorMessage = "User not logged in.";
          return;
        }

        const response = await plotService.getAllPlots();
        // Check if `currentUser.plots` exists; if not, set it as an empty array.
        const userPlots = currentUser.plots || [];
        this.plots = response.data.filter(plot => userPlots.includes(plot.id.toString()));
      } catch (error) {
        console.error('Error fetching plot data:', error);
        this.plots = []; // Ensures `plots` is empty in case of an error
      }
    },
    goToRegisterPlot() {
      // Redirige al formulario de registro de parcelas
      this.$router.push({ name: 'registerplot' }); // Usa el nombre de la ruta
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
  grid-template-columns: repeat(2, 1fr);
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
  background-color: #FFFFF9;
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

.confirmation-message {
  color: green;
  font-weight: bold;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 20px;
}
</style>
