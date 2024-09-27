<template>
  <div class="profile">
    <div class="profile-container">
      <!-- Imagen de perfil -->
      <div class="profile-picture-container">
        <img :src="user.profileImage" alt="User profile picture" class="profile-picture" />
      </div>

      <!-- Información básica de la cuenta -->
      <div class="details">
        <p>
          <i class="fas fa-user"></i> 
          <span class="shaded-text">{{ user.name }}</span>
        </p>
        <p>
          <i class="fas fa-phone-alt"></i>
          <span class="shaded-text">{{ user.phone }}</span>
        </p>
        <p>
          <i class="fas fa-envelope"></i> 
          <span class="shaded-text">{{ user.email }}</span>
        </p>
        <p>
          <i class="fas fa-map-marker-alt"></i> 
          <span class="shaded-text">{{ user.location }}</span>
        </p>
      </div>

      <!-- Proveedor de Agua -->
      <div class="water-supplier">
        <h3><i class="fas fa-tint"></i> Water Supplier</h3>
        <img :src="user.waterSupplier.logo" alt="Water Supplier" class="supplier-logo" />
      </div>
    </div>

    <!-- Sección de parcelas registradas -->
    <div class="plots-section">
      <div class="header-container">
        <h3><i class="fas fa-seedling"></i> Registered Plots</h3>
        <button class="see-more-btn">See more</button>
      </div>
      <hr class="green-line" />
      <div class="plots">
        <div class="plot" v-for="plot in user.plots" :key="plot.id">
          <div class="plot-card">
            <img :src="plot.image" alt="Plot Image" />
            <p>{{ plot.name }}</p>
          </div>
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
      user: null, // Definimos la propiedad 'user' como null inicialmente
    };
  },
  created() {
    this.fetchUserData(); // Llamamos al método para obtener los datos del usuario
  },
  methods: {
    async fetchUserData() {
      try {
        const response = await axios.get('http://localhost:3000/user'); // Asegúrate de que la API esté configurada correctamente
        this.user = response.data; // Asignamos los datos recibidos a la propiedad 'user'
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    },
  },
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
  height: 300px;
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
  font-size: 18px; /* Ajusta el tamaño de fuente del nombre y detalles */
  margin-bottom: 25px; /* Agrega espacio entre los elementos */
}

.details p:last-child {
  margin-bottom: 0; /* Asegura que no haya espacio extra después del último párrafo */
}

/* Estilos para los íconos */
i {
  margin-right: 10px; /* Espacio entre el ícono y el texto */
  vertical-align: middle; /* Alinea el ícono con el texto */
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
  margin-top: 20px;
}

/* Encabezado de la sección de parcelas */
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.green-line {
  border: none;
  height: 1px;
  background-color: #2B9846; /* Color de la línea */
  margin-top: -5px;
  margin-bottom: 80px;
}

.see-more-btn {
  background-color: #3D703B; /* Color del botón */
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.see-more-btn:hover {
  background-color: #2B9846; /* Color al pasar el cursor */
}

/* Contenedor de los plots */
.plots {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.plot-card {
  background-color: #F6F6F6;
  border-radius: 8px;
  padding: 10px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Sombra ligera */
  width: 400px; /* Aumenta el ancho de la tarjeta aquí */

}

.plot img {
  width: 300px;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
}

.plot p {
  text-align: center;
  margin-top: 10px;
  font-size: 16px;
  color: #2B9846; /* Color del texto */
}

.details, .water-supplier h3 {
  color: #2B9846; /* Cambia el color del texto */
}

/* Icono de la gota de agua */
.fa-tint {
  margin-right: 10px; /* Espacio entre el icono y el texto */
  color: #000000; /* Color del icono */
}

i {
  margin-right: 10px; /* Espacio entre el ícono y el texto */
  vertical-align: middle; /* Alinea el ícono con el texto */
  color: #000000; /* Todos los íconos en negro */
}

.shaded-text {
  background-color: #DEF6D9; /* Color de fondo del texto */
  border-radius: 25px; /* Bordes redondeados */
  padding: 10px 20px; /* Relleno interno para mayor espacio alrededor del texto */
  display: inline-block; /* Mantener el texto en bloque para el fondo */
  width: 300px; /* Ajusta el ancho a un valor fijo para todos */
  margin-bottom: 15px; /* Espacio entre cada línea de detalles */
  text-align: left; /* Alinea el texto hacia la izquierda */
}
</style>
