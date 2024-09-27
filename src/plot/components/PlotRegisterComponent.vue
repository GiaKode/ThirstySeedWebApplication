<template>
  <div class="container">
    <div class="plot-registration">
      <h1>Plot Registration</h1>

      <form @submit.prevent="registerPlot">
        <!-- Formulario del plot -->
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            type="url"
            v-model="plot.imageUrl"
            id="imageUrl"
            placeholder="Insert Image URL"
            @input="updateImagePreview"
            required
          />
          <div class="image-preview" v-if="imagePreview">
            <img :src="imagePreview" alt="Image Preview" />
          </div>
        </div>

        <div class="form-group">
          <label for="landName">Land Name</label>
          <input
            type="text"
            v-model="plot.name"
            id="landName"
            placeholder="Land Name"
            required
          />
        </div>

        <div class="form-group">
          <label for="location">Location</label>
          <input
            type="text"
            v-model="plot.location"
            id="location"
            placeholder="Location"
            required
          />
        </div>

        <div class="form-group">
          <label for="size">Size (in hectares)</label>
          <input
            type="number"
            v-model="plot.size"
            id="size"
            placeholder="Size in hectares"
            required
          />
        </div>

        <button type="submit" class="submit-button">Register Plot</button>
        <router-link to="/register-node">
          <button class="node-register-button">Register Node</button>
        </router-link>

      </form>

      <!-- Mensaje de confirmación o error -->
      <div v-if="confirmationMessage" class="confirmation-message">
        {{ confirmationMessage }}
      </div>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import { plotService } from '@/plot/services/plot.service.js';

export default {
  data() {
    return {
      plot: {
        id: null,
        name: '',
        location: '',
        size: '',
        imageUrl: ''
      },
      confirmationMessage: '',
      errorMessage: '',
      imagePreview: ''
    };
  },
  methods: {
    async registerPlot() {
      if (!this.plot.name || !this.plot.location || !this.plot.size || !this.plot.imageUrl) {
        alert("Please fill out all fields.");
        return;
      }

      try {
        // Obtener todas las parcelas existentes para determinar el próximo ID
        const response = await plotService.getAllPlots();
        const existingPlots = response.data;

        // Generar automáticamente un ID secuencial
        const newId = existingPlots.length > 0
          ? Math.max(...existingPlots.map(plot => plot.id)) + 1
          : 1;

        // Asignar el nuevo ID
        this.plot.id = newId;

        // Intentar registrar la parcela
        await plotService.createPlot(this.plot);

        // Mensaje de éxito
        this.confirmationMessage = "Plot registered successfully!";
        this.errorMessage = '';

        // Limpiar formulario
        this.plot = {
          id: null,
          name: '',
          location: '',
          size: '',
          imageUrl: ''
        };
        this.imagePreview = '';

        // Ocultar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.confirmationMessage = '';
        }, 3000);
      } catch (error) {
        // Capturar y mostrar el error
        console.error("Error registering plot:", error);
        this.errorMessage = `Error registering plot: ${error.message}`;
        this.confirmationMessage = '';
      }
    },
    updateImagePreview() {
      this.imagePreview = this.plot.imageUrl;
    },
    goToRegisterNode() {
      // Redirigir a la vista de registro de nodos
      this.$router.push('/register-node');
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
}

.plot-registration {
  background-color: white;
  padding: 60px;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 500px;
  position: relative;
  transition: all 0.3s ease-in-out;
}

.plot-registration:hover {
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.2);
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 30px;
}

.image-preview img {
  width: 100%;
  max-width: 200px;
  border: 2px solid #28a745;
  border-radius: 10px;
  margin-top: 10px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #28a745;
  outline: none;
}

.submit-button,
.node-register-button {
  width: 100%;
  margin-top: 20px;
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #218838;
}

.node-register-button {
  background-color: #007bff;
}

.node-register-button:hover {
  background-color: #0056b3;
}

.confirmation-message {
  margin-top: 20px;
  color: green;
  font-weight: bold;
}
</style>