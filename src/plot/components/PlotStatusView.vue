<template>
  <div class="plot-status">
    <!-- Información del plot -->
    <div class="plot-card">
      <div class="plot-image-container">
        <img :src="plot.imageUrl" alt="Plot Image" class="plot-image" />
      </div>
      <div class="plot-details">
        <p><strong>Nombre de la parcela:</strong> {{ plot.name }}</p>
        <p><strong>Tamaño de la parcela:</strong> {{ plot.size }} m²</p>
        <p><strong>Instalación de nodos:</strong> {{ plot.nodeQuantity }}</p>
      </div>
    </div>

    <!-- Opciones de riego -->
    <div class="irrigation-mode">
      <p><strong>¿Cómo te gustaría programar el riego?</strong></p>
      <div class="irrigation-buttons">
        <label>Automático</label>
        <input type="radio" v-model="irrigationMode" value="automatic" />
        <label>Manual</label>
        <input type="radio" v-model="irrigationMode" value="manual" />
      </div>
      <p v-if="irrigationMode === 'manual'" class="info-text">Modo manual activado. Complete los campos para cada nodo.</p>
      <p v-if="irrigationMode === 'automatic'" class="info-text">Modo automático activado. Configuración predeterminada aplicada a los nodos seleccionados.</p>
    </div>

    <!-- Selección de nodos y valores generales en modo automático -->
    <div v-if="irrigationMode === 'automatic'" class="auto-node-selection">
      <label for="nodeCount">Número de nodos a instalar: </label>
      <select v-model="autoNodeCount" :max="plot.nodeQuantity">
        <option v-for="i in plot.nodeQuantity" :key="i" :value="i">{{ i }}</option>
      </select>

      <div class="general-settings">
        <label>Humedad esperada (%): </label>
        <input v-model="generalSettings.moisture" type="number" min="0" max="100" placeholder="Completar..." />
        <label> Tiempo estimado (horas): </label>
        <input v-model="generalSettings.estimatedTime" type="number" min="0" max="24" placeholder="Completar..." />
        <label> Presión (psi): </label>
        <input v-model="generalSettings.pressure" type="number" min="0" placeholder="Completar..." />
      </div>
    </div>

    <!-- Configuración de nodos en modo manual -->
    <div v-if="irrigationMode === 'manual'" class="node-cards">
      <div v-for="(node, index) in plot.nodes" :key="index" class="node-card">
        <h4>Nodo {{ index + 1 }}</h4>

        <div class="node-input">
          <label>Humedad esperada (%)</label>
          <input v-model="node.moisture" type="number" min="0" max="100" placeholder="Completar..." />
        </div>

        <div class="node-input">
          <label>Tiempo estimado (horas)</label>
          <input v-model="node.estimatedTime" type="number" min="0" max="24" placeholder="Completar..." />
        </div>

        <div class="node-input">
          <label>Presión (psi)</label>
          <input v-model="node.pressure" type="number" min="0" placeholder="Completar..." />
        </div>

        <button @click="removeNode(index)" class="remove-node-btn">Eliminar nodo</button>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="action-buttons">
      <button v-if="irrigationMode === 'manual'" @click="addNode" class="add-node-btn">Agregar nodo</button>
      <button @click="saveSettings" class="save-settings-btn">Guardar configuración</button>
    </div>

    <!-- Navegación entre plots -->
    <div class="navigation-buttons">
      <button @click="previousPlot" :disabled="currentPlotIndex === 0">Anterior</button>
      <button @click="nextPlot" :disabled="currentPlotIndex === plots.length - 1">Siguiente</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      plots: [],
      currentPlotIndex: 0,
      plot: {
        nodes: []
      },
      irrigationMode: 'manual',
      autoNodeCount: 1,
      generalSettings: {
        moisture: 40,
        estimatedTime: 3,
        pressure: 50
      }
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:3000/plots');
      this.plots = response.data.filter(plot => plot.nodesInstalled);
      if (this.plots.length > 0) {
        this.loadPlot();
      } else {
        console.warn("No hay parcelas con nodos instalados.");
      }
    } catch (error) {
      console.error("Error al cargar los datos de parcelas:", error);
    }
  },
  methods: {
    loadPlot() {
      this.plot = this.plots[this.currentPlotIndex] || { nodes: [] };
      this.irrigationMode = this.plot.irrigationMode || 'manual';
      if (this.irrigationMode === 'automatic' && this.plot.nodes.length === 0) {
        this.setAutomaticNodes();
      }
    },
    setAutomaticNodes() {
      this.plot.nodes = Array.from({ length: this.autoNodeCount }, () => ({
        moisture: this.generalSettings.moisture,
        estimatedTime: this.generalSettings.estimatedTime,
        pressure: this.generalSettings.pressure
      }));
    },
    addNode() {
      if (this.plot.nodes.length < this.plot.nodeQuantity) {
        this.plot.nodes.push({
          moisture: 40,
          estimatedTime: 3,
          pressure: 50
        });
      }
    },
    removeNode(index) {
      if (this.plot.nodes.length > 1) {
        this.plot.nodes.splice(index, 1);
      }
    },
    async saveSettings() {
      try {
        if (this.irrigationMode === 'automatic') {
          this.setAutomaticNodes();
        }
        await axios.put(`http://localhost:3000/plots/${this.plot.id}`, {
          ...this.plot,
          irrigationMode: this.irrigationMode,
          nodes: this.plot.nodes
        });
        alert('Configuración guardada exitosamente');
      } catch (error) {
        console.error('Error al guardar configuración:', error);
        alert('Error al guardar configuración');
      }
    },
    previousPlot() {
      if (this.currentPlotIndex > 0) {
        this.currentPlotIndex--;
        this.loadPlot();
      }
    },
    nextPlot() {
      if (this.currentPlotIndex < this.plots.length - 1) {
        this.currentPlotIndex++;
        this.loadPlot();
      }
    }
  },
  watch: {
    'generalSettings.moisture': function (newMoisture) {
      if (newMoisture <= 100) {
        this.plot.nodes.forEach((node) => {
          node.moisture = newMoisture;
        });
      }
    },
    autoNodeCount(newCount) {
      if (this.irrigationMode === 'automatic') {
        this.setAutomaticNodes();
      }
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

/* Contenedor de estado del plot */
.plot-status {
  padding: 20px;
  max-width: 900px;
  margin: auto;
  text-align: center;
}

/* Tarjeta de información del plot */
.plot-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #f9f9f9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.plot-image-container img {
  width: 300px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.irrigation-mode {
  margin-top: 20px;
}

.irrigation-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.info-text {
  color: #777;
  font-size: 0.9em;
  margin-top: 10px;
}

.auto-node-selection,
.general-settings {
  margin-top: 10px;
}
.general-settings {
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;
  margin-top: 15px;
  padding: 15px;
  background-color: #e9f7ef;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.general-settings label {
  font-weight: 500;
  font-size: 0.9em;
}

.general-settings input {
  padding: 8px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  width: 70px;
  transition: border-color 0.3s ease;
}

.general-settings input:focus {
  border-color: #66bb6a;
}
/* Estilos para las tarjetas de nodo */
.node-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  margin-top: 20px;
}

.node-card {
  background: #F7FFF0;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
}

.node-card h4 {
  font-size: 1.1em;
  color: #333;
  margin-bottom: 10px;
}

.node-input {
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.node-input label {
  font-size: 0.85em;
  color: #555;
  text-align: center;
}

.node-input input {
  padding: 6px;
  width: 60%;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-top: 5px;
}

/* Botón para eliminar nodo */
.remove-node-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 10px;
  width: 80%;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.remove-node-btn:hover {
  background-color: #c82333;
  box-shadow: 0 4px 8px rgba(220, 53, 69, 0.4);
}

/* Botón para agregar nodo */
.add-node-btn {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.add-node-btn:hover {
  background-color: #0069d9;
  box-shadow: 0 4px 8px rgba(0, 123, 255, 0.4);
}

/* Botón para guardar configuración */
.save-settings-btn {
  background-color: #28a745;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 1em;
  cursor: pointer;
  margin-top: 15px;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.save-settings-btn:hover {
  background-color: #218838;
  box-shadow: 0 4px 8px rgba(40, 167, 69, 0.4);
}

/* Botones de navegación entre parcelas */
.navigation-buttons button {
  background-color: #17a2b8;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 0.9em;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.navigation-buttons button:hover {
  background-color: #138496;
  box-shadow: 0 4px 8px rgba(23, 162, 184, 0.4);
}

/* Botón de navegación deshabilitado */
.navigation-buttons button:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
  box-shadow: none;
}

/* Contenedor de los botones de acción y navegación para centrar */
.action-buttons, .navigation-buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}


</style>
