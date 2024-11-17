<template>
  <div class="signup-container">
    <div class="signup-card">
      <!-- Botón para insertar enlace de imagen -->
      <button @click="toggleImageUrlInput" class="profile-button">
        Presione aquí para foto de perfil
      </button>
      <input
        v-if="showImageUrlInput"
        v-model="imageUrl"
        type="text"
        placeholder="Paste image URL here"
        class="image-url-input"
      />
      <img
        :src="imageUrl || '../../assets/images/register-logo.png'"
        alt="Profile Icon"
        class="profile-icon"
      />
      <h2>-- Create New Account --</h2>
      <form @submit.prevent="onSubmit">
        <div class="input-group">
          <input
            v-model="name"
            type="text"
            placeholder="Name"
            required
            @input="validateText($event, 'name')"
          />
          <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            required
            @input="validateText($event, 'lastName')"
          />
        </div>
        <div class="input-group">
          <input
            v-model="city"
            type="text"
            placeholder="City"
            required
            @input="validateText($event, 'city')"
          />
          <input
            v-model="telephone"
            type="tel"
            placeholder="+51 XXX-XXX-XXX"
            required
            @input="validateTelephone"
          />
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
      v-if="showPlanModal && userId"
      :show="showPlanModal"
      :userId="userId"
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
      telephone: '+51 ', // Prefijo inicial para Perú
      email: '',
      password: '',
      imageUrl: '',
      showImageUrlInput: false,
      showPlanModal: false,
      userId: null // Inicializa con null
    };
  },
  components: {
    PlanSelectionModal
  },
  methods: {
    toggleImageUrlInput() {
      this.showImageUrlInput = !this.showImageUrlInput;
    },
    validateText(event, field) {
      const regex = /^[A-Za-z\s]*$/;
      if (!regex.test(event.target.value)) {
        this[field] = this[field].replace(/[^A-Za-z\s]/g, '');
      }
    },
    validateTelephone(event) {

      if (!this.telephone.startsWith("+51 ")) {
        this.telephone = "+51 ";
      }

      // Mantiene solo los números después del prefijo
      const cleanedNumber = this.telephone.replace(/\D/g, "").substring(2); // Quita el "+51"

      // Limita el número a 9 dígitos y lo formatea en el formato XXX-XXX-XXX
      this.telephone = "+51 " + cleanedNumber.slice(0, 9).replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3');
    },
    async onSubmit() {
      try {
        const response = await fetch('http://localhost:3000/users');
        const users = await response.json();

        this.email = this.email.toLowerCase();

        const emailExists = users.some(user => user.email === this.email);
        const phoneExists = users.some(user => user.telephone === this.telephone);

        if (emailExists) {
          alert("Email already exists. Please use a different one.");
          return;
        }

        if (phoneExists) {
          alert("Telephone number already exists. Please use a different one.");
          return;
        }

        const newUser = {
          name: this.name,
          lastName: this.lastName,
          city: this.city,
          telephone: this.telephone,
          email: this.email,
          password: this.password,
          imageUrl: this.imageUrl,
          plan: null
        };

        const userResponse = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        });

        const createdUser = await userResponse.json();
        this.userId = createdUser.id; // Guarda el ID del usuario

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

.profile-button {
  margin-bottom: 1rem;
  background-color: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.profile-icon {
  width: 120px;
  margin-bottom: 1rem; /* Añadido un margen inferior para separar la imagen del título */
}

.image-url-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
}

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.signup-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
}

.signup-card {
  background-color: rgba(255, 255, 249, 1);
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 400px;
  text-align: center;
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
  margin-right: 1%;
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