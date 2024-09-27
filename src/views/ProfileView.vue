<template>
  <div class="profile">
    <div class="profile-container">
      <!-- Imagen de perfil -->
      <div class="profile-picture-container">
        <img :src="user.profileImage" alt="User profile picture" class="profile-picture" />
      </div>

      <!-- Información básica de la cuenta -->
      <div class="details">
        <h2>{{ user.name }}</h2>
        <p><strong>Phone:</strong> {{ user.phone }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Location:</strong> {{ user.location }}</p>
      </div>

      <!-- Proveedor de Agua -->
      <div class="water-supplier">
        <h3>Water Supplier</h3>
        <img :src="user.waterSupplier.logo" alt="Water Supplier" class="supplier-logo" />
      </div>
    </div>

    <!-- Sección de parcelas registradas -->
    <div class="plots-section">
      <h3>Registered Plots</h3>
      <div class="plots">
        <div class="plot" v-for="plot in user.plots" :key="plot.id">
          <img :src="plot.image" alt="Plot Image" />
          <p>{{ plot.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ProfileView',
  data() {
    return {
      user: null
    };
  },
  created() {
    this.fetchUserData();
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://localhost:3000/user');
        this.user = response.data;
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  }
};
</script>

<style scoped>
/* Contenedor general */
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
}

/* Contenedor de la información de perfil, foto y proveedor de agua */
.profile-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 30px;
  text-align: center;
}

/* Imagen de perfil rectangular */
.profile-picture-container {
  flex: 1;
  display: flex;
  justify-content: flex-start;
}

.profile-picture {
  width: 400px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

/* Información de la cuenta, centrada */
.details {
  flex: 2;
  text-align: left;
  margin-left: 20px;
  margin-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
}

.details p {
  margin-bottom: 25px; /* Agrega espacio entre los elementos */
}

.details p:last-child {
  margin-bottom: 0; /* Asegura que no haya espacio extra después del último párrafo */
}

/* Proveedor de agua */
.water-supplier {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.supplier-logo {
  width: 120px;
  height: auto;
}

/* Sección de las parcelas */
.plots-section {
  width: 100%;
  max-width: 1000px;
}

.plots {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.plot {
  text-align: center;
}

.plot img {
  width: 200px;
  height: 150px;
  object-fit: cover;
}

.plot p {
  text-align: center;
  margin-top: 5px;
}
</style>
