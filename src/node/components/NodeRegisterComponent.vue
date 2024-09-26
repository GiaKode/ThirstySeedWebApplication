<template>
  <div class="node-registration">
    <h2>Node Registration</h2>

    <div class="card">
      <div class="image-container">
        <img src="@/assets/images.png" alt="Sprinkler icon" />
      </div>

      <div class="form-container">
        <h3>First Node</h3>

        <div class="input-group">
          <label for="location">Location</label>
          <input type="text" v-model="location" id="location" placeholder="Location" />
        </div>

        <div class="input-group">
          <label for="moisture">Moisture</label>
          <input type="number" v-model="moisture" id="moisture" placeholder="Moisture" />
        </div>

        <div class="input-group">
          <label for="indicator">Indicator</label>
          <input type="text" v-model="indicator" id="indicator" placeholder="Indicator" />
        </div>

        <div v-if="successMessage" class="success-message">
          {{ successMessage }}
        </div>

        <div v-if="errorMessage" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="buttons">
          <button class="primary-button" @click="registerNode">Confirm Node Registration</button>
          <button class="secondary-button" @click="registerAnotherNode">Register Another Node</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nodeService } from "@/node/services/node.service";

export default {
  data() {
    return {
      location: '',
      moisture: 0,
      indicator: 'Water',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async registerNode() {
      try {
        // Obtener todos los nodos existentes
        const nodes = await nodeService.getAllNodes();

        // Generar plotId automáticamente (incrementando en 1 al máximo plotId actual)
        const plotId = nodes.length ? Math.max(...nodes.data.map(node => node.plotId)) + 1 : 1;

        // Determinar status y statusClass automáticamente basado en moisture
        const status = this.moisture > 20 ? 'Correct' : 'Error';
        const statusClass = status === 'Correct' ? 'status-correct' : 'status-error';

        // Datos del nuevo nodo
        const newNode = {
          id: nodes.length ? nodes.length + 1 : 1, // Generar un id automáticamente
          plotId,
          location: this.location,
          moisture: this.moisture,
          indicator: this.indicator,
          status,
          statusClass,
          iconClass: status === 'Correct' ? 'pi pi-check' : 'pi pi-exclamation-triangle',
        };

        // Registrar el nodo usando el servicio
        await nodeService.createNode(newNode);

        // Mostrar mensaje de éxito
        this.successMessage = 'Node registered successfully!';
        this.errorMessage = '';
        console.log('Node registered:', newNode);

        // Limpiar los campos después de registrar
        this.registerAnotherNode();
      } catch (error) {
        this.errorMessage = 'Error registering node. Please try again.';
        this.successMessage = '';
        console.error('Error registering node:', error);
      }
    },
    registerAnotherNode() {
      // Limpiar campos después de registrar un nodo
      this.location = '';
      this.moisture = 0;
      this.indicator = 'Water';
    },
  },
};
</script>

<style scoped>
.node-registration {
  font-family: 'Arial', sans-serif;
  padding: 40px; /* Aumentado el padding para más espacio */
  background-color: #eafaf1; /* Fondo claro en verde */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 600px; /* Ancho máximo para el contenedor */
  margin: 40px auto; /* Centrando el contenedor */
}

h2 {
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

.card:hover {
  transform: translateY(-5px);
}

.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px; /* Aumentado el padding */
  background-color: #d1f2eb; /* Fondo verde claro */
}

.image-container img {
  max-width: 100px; /* Aumentar el tamaño de la imagen */
}

.form-container {
  padding: 30px; /* Aumentado el padding */
}

h3 {
  color: #27ae60; /* Color verde para los encabezados */
  margin-bottom: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px; /* Aumentado el margen entre los grupos de entrada */
}

.input-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #34495e;
}

.input-group input {
  width: 100%;
  padding: 12px; /* Aumentado el padding */
  border: 1px solid #ced4da;
  border-radius: 6px; /* Bordes más redondeados */
  font-size: 18px; /* Aumentado el tamaño de la fuente */
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: #27ae60; /* Color verde al enfocar */
  outline: none;
}

.success-message {
  color: #27ae60; /* Color verde claro para mensajes de éxito */
  margin-top: 10px;
  text-align: center;
}

.error-message {
  color: #c0392b; /* Color rojo para mensajes de error */
  margin-top: 10px;
  text-align: center;
}

.buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 30px; /* Aumentado el margen superior */
}

.primary-button, .secondary-button {
  padding: 12px 20px; /* Aumentado el padding */
  border: none;
  border-radius: 6px;
  font-size: 18px; /* Aumentado el tamaño de la fuente */
  cursor: pointer;
  transition: background-color 0.2s;
}

.primary-button {
  background-color: #27ae60; /* Botón verde */
  color: white;
}

.primary-button:hover {
  background-color: #219150; /* Color verde más oscuro al pasar el ratón */
}

.secondary-button {
  background-color: #7ed957; /* Color verde claro */
  color: white;
}

.secondary-button:hover {
  background-color: #5dbb3a; /* Color verde más oscuro al pasar el ratón */
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column;
  }

  .buttons button {
    margin-bottom: 15px; /* Aumentado el margen inferior entre botones */
  }
}
</style>


