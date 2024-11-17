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

    <!-- Contenedor de plots -->
    <div v-else class="plots">
      <div class="plot" v-for="plot in plots" :key="plot.id">
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
      </div>
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
      isLoading: false, // Estado para mostrar el spinner de carga
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
/* Estilos generales del componente */
.plots-status {
  margin: 20px;
}

/* Encabezado y botón */
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

/* Estilos para el texto de estado */
.not-supplied {
  color: red;
}

/* Diseño responsivo de los plots */
.plots {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  justify-content: center;
  max-width: 100%;
  padding: 0 20px;
}

/* Estilo de cada plot */
.plot {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  height: 350px;
}

/* Imagen del plot */
.plot-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
}

/* Detalles del plot */
.plot-details {
  text-align: left;
  width: 100%;
}

/* Spinner de carga */
.spinner-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
}

.spinner {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3D703B;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
