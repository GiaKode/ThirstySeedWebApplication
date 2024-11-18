<template>
  <div class="plots-status">
    <div class="header-container">


      <h1 class="plots-header">Registered Plots</h1>
      <button class="register-plot-btn" @click="goToRegisterPlot">Register Plot</button>


    </div>

    <!-- Spinner de carga -->
    <div v-if="isLoading" class="spinner-container">
      <div class="spinner"></div>
    </div>


    <div v-else class="plots">
      <router-link

       class="plot" v-for="plot in plots" :key="plot.id":to="`/plot-status/${plot.id}`">
        <img
            :src="plot.imageUrl || 'https://via.placeholder.com/150'"
            :alt="`Imagen del plot ${plot.name || 'No disponible'}`"
            class="plot-image"
        />
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
        </router-link>

    </div>
  </div>
</template>

<script>
import { plotService } from "@/plot/services/plot.service.js";

export default {
  name: 'ViewPlotStatus',
  data() {
    return {
      plots: [],
      isLoading: false,
    };
  },
  created() {
    this.fetchPlots();
  },
  methods: {
    async fetchPlots() {
      this.isLoading = true;
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          alert('No estás autenticado. Por favor, inicia sesión.');
          this.$router.push('/login');
          return;
        }

        const response = await plotService.getPlotsByUserId(userId);
        this.plots = response.data;
      } catch (error) {
        console.error('Error al obtener los datos de los plots:', error.response?.data || error);
        alert('No se pudieron obtener los datos de los plots. Asegúrate de estar autenticado.');
      } finally {
        this.isLoading = false;
      }
    },
    goToRegisterPlot() {
      this.$router.push('/register-plot');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.install-nodes-btn {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
}

.install-nodes-btn:hover {
  background-color: #138496;
}

.install-code input {
  padding: 8px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 100%;
  font-size: 14px;
}

.install-code button {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
}

.confirmation-message {
  color: green;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
  margin-top: 20px;
}

.edit-plot-btn {
  background-color: #ffc107;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
}

.edit-plot-btn:hover {
  background-color: #e0a800;
}

.save-plot-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
}

.save-plot-btn:hover {
  background-color: #218838;
}

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
}

.no-plots-message {
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-top: 50px;
}

.register-plot-btn {
  background-color: #3D703B;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.register-plot-btn:hover {
  background-color: #2c522a;
}

.not-supplied {
  color: red;
}

.plots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  padding: 20px;
}

.plot {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F7FFF0;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  padding: 15px;
  text-align: center;
  overflow: hidden;
  transition: transform 0.3s;
}

.plot:hover {
  transform: translateY(-5px);
}

.plot-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
}

.plot-details p {
  margin: 5px 0;
  font-size: 14px;
  color: #333;
}

.delete-plot-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 15px;
}

.delete-plot-btn:hover {
  background-color: #c0392b;
}
</style>
