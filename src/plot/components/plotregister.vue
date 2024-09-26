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
          <div class="image-content" v-if="image">
            <img :src="image" alt="Plot Image" />
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
            v-model="plot.landName"
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
          <label for="extension">Extension of Land</label>
          <input
            type="text"
            v-model="plot.extension"
            id="extension"
            placeholder="Extension Of Land"
            required
          />
        </div>

        <div class="form-actions">
          <router-link :to="{ name: 'register-nodes' }" class="register-link">Register Nodes</router-link>
          <button type="submit" class="submit-button">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plot: {
        landName: '',
        location: '',
        extension: ''
      },
      image: null
    };
  },
  methods: {
    onImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file);
      }
    },
    registerPlot() {
      if (!this.plot.landName || !this.plot.location || !this.plot.extension) {
        alert("Please fill out all fields.");
        return;
      }
      console.log("Plot Registered", this.plot);
      // Aquí puedes agregar lógica para enviar el formulario a un backend
    }
  }
};
</script>

<style scoped>
/* General Styles */
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

/* Estilos del contenedor de imagen */
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

/* Líneas decorativas */
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

/* Form Styles */
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

/* Botones */
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
