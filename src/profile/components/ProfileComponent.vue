<template>
  <div class="profile-container">
    <h2>Complete Your Profile</h2>
    <form @submit.prevent="handleCompleteProfile">
      <div class="input-group">
        <input
            v-model="firstName"
            type="text"
            placeholder="First Name"
            required
        />
        <input
            v-model="lastName"
            type="text"
            placeholder="Last Name"
            required
        />
      </div>
      <div class="input-field">
        <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
        />
      </div>
      <div class="input-field">
        <input
            v-model="phoneNumber"
            type="tel"
            placeholder="Phone Number (e.g., +51 XXX-XXX-XXXX)"
            required
        />
      </div>
      <div class="input-field">
        <input
            v-model="location"
            type="text"
            placeholder="Location"
            required
        />
      </div>
      <div class="input-field">
        <input
            v-model="profileImage"
            type="text"
            placeholder="Profile Image URL"
        />
      </div>
      <button type="submit" class="btn">Complete Profile</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ProfileService from '@/profile/services/profile-service';

export default defineComponent({
  name: 'ProfileComponent',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      location: '',
      profileImage: '',
    };
  },
  methods: {
    async handleCompleteProfile() {
      try {
        // Obtener el ID del usuario desde localStorage
        const userId = localStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Preparar los datos del perfil
        const profileData = {
          userId: parseInt(userId),
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email.toLowerCase(),
          phoneNumber: this.phoneNumber,
          profileImage: this.profileImage || 'https://randomuser.me/api/portraits/men/60.jpg',
          location: this.location,
        };

        // Llamar al servicio para crear el perfil del usuario
        const response = await ProfileService.createProfile(profileData);
        console.log('Profile completed successfully:', response.data);

        // Redirigir al usuario a su cuenta o dashboard
        this.$router.push('/account');
      } catch (error) {
        console.error('Error completing profile:', error);
      }
    },
  },
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.profile-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

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