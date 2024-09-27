<template>
  <div class="container">
    <div class="plot-registration">
      <h1>Plot Registration</h1>

      <!-- Imagen del campo -->
      <div class="image-upload-container">
        <!-- Líneas decorativas a la izquierda -->
        <div class="decorative-lines left">
          <span class="line large"></span>
          <span class="line medium"></span>
          <span class="line small"></span>
        </div>

        <div class="image-box">
          <div class="image-content" v-if="plot.imageUrl">
            <img :src="plot.imageUrl" alt="Plot Image" />
          </div>
          <div class="placeholder" v-else>
            <span>Insert Image</span>
          </div>
          <input id="imageUpload" type="file" @change="onImageUpload" />
        </div>

        <!-- Líneas decorativas a la derecha -->
        <div class="decorative-lines right">
          <span class="line large"></span>
          <span class="line medium"></span>
          <span class="line small"></span>
        </div>
      </div>

      <!-- Formulario -->
      <form @submit.prevent="registerPlot">
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
          <label for="size">Extension of Land (size)</label>
          <input
            type="number"
            v-model="plot.size"
            id="size"
            placeholder="Extension of Land"
            required
          />
        </div>

        <div class="form-actions">
          <!-- Botón de registro de nodos comentado ya que no es necesario -->
          <!-- <router-link :to="{ name: 'register-nodes' }" class="register-link">
            Register Nodes
          </router-link> -->
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {plotService} from '@/services/plot.service.js'

export default {
  data() {
    return {
      plot: {
        name: '',
        location: '',
        size: '',
        lastIrrigationDate: new Date().toISOString(), // Fecha de último riego
        imageUrl: '' // URL de la imagen
      }
    };
  },
  methods: {
    onImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.plot.imageUrl = URL.createObjectURL(file);
      }
    },
    async registerPlot() {
      if (!this.plot.name || !this.plot.location || !this.plot.size) {
        alert("Please fill out all fields.");
        return;
      }
      try {
        // Llamar al servicio para crear el plot
        await plotService.createPlot(this.plot);
        console.log("Plot Registered", this.plot);
        alert("Plot registered successfully!");
        // Reiniciar el formulario
        this.plot = {
          name: '',
          location: '',
          size: '',
          lastIrrigationDate: new Date().toISOString(),
          imageUrl: ''
        };
      } catch (error) {
        console.error("Error registering plot:", error);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos mantenidos sin cambios */
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

.image-upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.image-box {
  position: relative;
  width: 200px;
  height: 200px;
  border: 2px solid #28a745;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(255, 255, 255, 0.8);
}

.image-content img {
  width: 100%;
  height: auto;
}

.placeholder {
  font-size: 16px;
  color: #28a745;
  text-align: center;
  font-weight: bold;
}

input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.decorative-lines {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
}

.decorative-lines.left {
  margin-right: 20px;
}

.decorative-lines.right {
  margin-left: 20px;
}

.decorative-lines .line {
  display: block;
  height: 2px;
  background-color: #28a745;
}

.line.large {
  width: 60px;
}

.line.medium {
  width: 40px;
}

.line.small {
  width: 20px;
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

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
}

.submit-button {
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

.register-link {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #28a745;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #218838;
}
</style>
