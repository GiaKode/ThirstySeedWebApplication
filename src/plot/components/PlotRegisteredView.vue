<template>
  <div class="plots-status">
    <div class="header-container">
      <div class="title-and-message">
        <h1 class="plots-header">{{ $t('plotsStatus.registeredPlots') }}</h1>
      </div>
      <button class="register-plot-btn" @click="goToRegisterPlot">{{ $t('plotsStatus.registerPlot') }}</button>
    </div>

    <p v-if="plots && !plots.length" class="no-plots-message">
      {{ $t('plotsStatus.noPlotsRegistered') }}
    </p>

    <div class="plots" v-if="plots && plots.length">
      <div class="plot" v-for="plot in orderedPlots" :key="plot.id">
        <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" />
        <div class="plot-details">
          <p><strong>{{ $t('plotsStatus.landName') }}: </strong>{{ plot.name || $t('plotsStatus.notAvailable') }}</p>
          <p><strong>{{ $t('plotsStatus.location') }}: </strong>{{ plot.location || $t('plotsStatus.notAvailable') }}</p>
          <p><strong>{{ $t('plotsStatus.extensionOfLand') }}: </strong>{{ plot.size ? plot.size + ' m²' : $t('plotsStatus.notAvailable') }}</p>

          <!-- Mostrar "Nodos Instalados" solo si nodeQuantity es mayor a 0 -->
          <p v-if="plot.nodeQuantity > 0"><strong>{{ $t('plotsStatus.installedNodes') }}: </strong>{{ plot.nodeQuantity }}</p>

          <div v-if="plot.isEditing">
            <p><strong>{{ $t('plotsStatus.imageUrl') }}: </strong></p>
            <input v-model="plot.imageUrl" type="url" :placeholder="$t('plotsStatus.enterImageUrl')" />
          </div>

          <button v-if="!plot.isEditing" @click="enableEditMode(plot)" class="edit-plot-btn">{{ $t('plotsStatus.edit') }}</button>
          <button v-else @click="savePlot(plot)" class="save-plot-btn">{{ $t('plotsStatus.save') }}</button>
          <button class="delete-plot-btn" @click="deletePlot(plot.id)">{{ $t('plotsStatus.deletePlot') }}</button>

          <!-- Botón "Install Nodes" solo se muestra si los nodos no están instalados -->
          <button v-if="!plot.nodesInstalled && !plot.isInstallingNodes" @click="enableNodeInstallation(plot)" class="install-nodes-btn">{{ $t('plotsStatus.installNodes') }}</button>
          <div v-else-if="plot.isInstallingNodes" class="install-code">
            <input v-model="plot.nodeCode" type="text" :placeholder="$t('plotsStatus.enterCode')" />
            <button @click="validateNodeCode(plot)" class="save-plot-btn">{{ $t('plotsStatus.validate') }}</button>
          </div>
        </div>
      </div>
    </div>

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
  computed: {
    orderedPlots() {
      return this.plots.slice().sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    }
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
          this.showErrorMessage(this.$t('plotsStatus.userNotLoggedIn'));
          return;
        }

        const response = await plotService.getAllPlots();
        const userPlots = currentUser.plots || [];
        this.plots = response.data.filter(plot => userPlots.includes(plot.id.toString()));

        this.plots.forEach(plot => {
          plot.isEditing = false;
          plot.isInstallingNodes = false;
          plot.nodesInstalled = plot.nodesInstalled || false; // Aseguramos que se traiga correctamente del backend
          plot.nodeCode = '';
          plot.nodeQuantity = plot.nodeQuantity || 0; // Inicializa en 0 si no hay nodos instalados
        });
      } catch (error) {
        console.error('Error fetching plot data:', error);
        this.showErrorMessage(this.$t('plotsStatus.errorFetchingData'));
        this.plots = [];
      }
    },
    async validateNodeCode(plot) {
      try {
        const currentUser = await UserService.getCurrentUser();
        if (currentUser.plan.code === plot.nodeCode) {
          // Si el código es válido, asignamos el número de nodos según el tipo de plan
          plot.nodeQuantity = currentUser.plan.type === 'plus' ? 12 : (currentUser.plan.type === 'premium' ? 5 : 0);

          // Actualizamos nodeQuantity y nodesInstalled en el backend para que persista al recargar
          await plotService.updatePlotNodeQuantity(plot.id, plot.nodeQuantity);
          await plotService.updatePlotNodeStatus(plot.id, true); // Actualiza nodesInstalled a true

          // Actualizamos el estado local para reflejar los cambios
          plot.isInstallingNodes = false;
          plot.nodesInstalled = true;  // Cambiamos a `true` para evitar que vuelva a mostrar el botón
          plot.nodeCode = ''; // Limpiar el código ingresado

          this.showConfirmationMessage("Node installed successfully!");
        } else {
          this.showErrorMessage("Invalid code, please try again.");
        }
      } catch (error) {
        console.error('Error validating code:', error);
        this.showErrorMessage("Error validating code.");
      }
    },
    enableNodeInstallation(plot) {
      plot.isInstallingNodes = true;
    },
    enableEditMode(plot) {
      plot.isEditing = true;
    },
    async savePlot(plot) {
      try {
        if (plot.size < 0) {
          this.showErrorMessage("The extension of land cannot be negative.");
          return;
        }

        plot.isEditing = false;
        await plotService.updatePlot(plot.id, {
          name: plot.name,
          location: plot.location,
          size: plot.size,
          imageUrl: plot.imageUrl
        });
        this.showConfirmationMessage("Plot updated successfully!");
      } catch (error) {
        console.error('Error updating plot:', error);
        this.showErrorMessage("Error updating plot.");
      }
    },
    async deletePlot(plotId) {
      try {
        await plotService.deletePlot(plotId);
        this.plots = this.plots.filter(plot => plot.id !== plotId);
        this.showConfirmationMessage("Plot deleted successfully!");
      } catch (error) {
        console.error('Error deleting plot:', error);
        this.showErrorMessage("Error deleting plot.");
      }
    },
    goToRegisterPlot() {
      this.$router.push({ name: 'registerplot' });
    },
    showConfirmationMessage(message) {
      this.confirmationMessage = message;
      setTimeout(() => {
        this.confirmationMessage = '';
      }, 3000);
    },
    showErrorMessage(message) {
      this.errorMessage = message;
      setTimeout(() => {
        this.errorMessage = '';
      }, 3000);
    }
  }
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
