<template>
  <div class="signup-container">
    <div class="signup-card">
      <input type="file" ref="fileInput" @change="handleFileUpload" style="display: none" />
      <img src="../../assets/images/register-logo.png" alt="Profile Icon" class="profile-icon" @click="triggerFileUpload" />
      <h2>-- Create New Account --</h2>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <input v-model="name" type="text" placeholder="Name" required />
          <input v-model="lastName" type="text" placeholder="Last Name" required />
        </div>
        <div class="input-group">
          <input v-model="city" type="text" placeholder="City" required />
          <input v-model="telephone" type="tel" placeholder="Telephone" required />
        </div>
        <div class="input-field">
          <input v-model="email" type="email" placeholder="Email" required />
        </div>
        <div class="input-field">
          <input v-model="password" type="password" placeholder="Password" required />
        </div>
        <button type="submit" class="btn">Sign up</button>
      </form>
      <router-link to="/login" class="return-link">Return to login</router-link>
    </div>

    <!-- Modal para la selección de planes -->
    <PlanSelectionModal
      :show="showPlanModal"
      @close="showPlanModal = false"
      @planSelected="handlePlanSelection"
    />
  </div>
</template>

<script>
import PlanSelectionModal from '@/payment/components/PlanSelectionModal.vue';

export default {
  data() {
    return {
      name: '',
      lastName: '',
      city: '',
      telephone: '',
      email: '',
      password: '',
      imageUrl: '', // Para almacenar la URL de la imagen seleccionada
      showPlanModal: false
    };
  },
  components: {
    PlanSelectionModal
  },
  methods: {
    triggerFileUpload() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.imageUrl = URL.createObjectURL(file); // Genera una URL temporal para previsualizar la imagen
      }
    },
    async onSubmit() {
      // Validación de campos
      // ...

      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();
        const emailExists = users.some(user => user.email === this.email);

        if (emailExists) {
          alert("Email already exists. Please use a different one.");
          return;
        }

        const newUser = {
          name: this.name,
          lastName: this.lastName,
          city: this.city,
          telephone: this.telephone,
          email: this.email,
          password: this.password,
          imageUrl: this.imageUrl // Guarda la URL de la imagen junto con los datos del usuario
        };

        await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        this.showPlanModal = true;
      } catch (error) {
        console.error('Error:', error);
      }
    },
    handlePlanSelection(plan) {
      console.log("Plan seleccionado:", plan);
      this.showPlanModal = false;
    }
  }
};
</script>




<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.profile-icon {
  width: 120px;
  margin-bottom: -1rem;
  cursor: pointer; /* Hace que el icono sea clickeable */
}

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.signup-card {
  transition: transform 0.5s ease-in-out;
}

.signup-card.move-left {
  transform: translateX(-50%);
}


.signup-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #ffffff; /* Cambié el color de fondo a un gris claro para que coincida con la tarjeta */
}

.signup-card {
  background-color: rgba(255, 255, 249, 1);
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.profile-icon {
  width: 120px;
  margin-bottom: -1rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
}

.input-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.input-group input {
  width: 48%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 1%; /* Espaciado pequeño entre los inputs */
}

.input-field {
  width: 100%;
  margin-bottom: 1.5rem;
}

.input-field input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  width: 100%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.return-link {
  display: block;
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #4caf50;
  text-decoration: none;
}

.return-link:hover {
  text-decoration: underline;
}
</style>
