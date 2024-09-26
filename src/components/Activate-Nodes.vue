<template>
  <div id="activate-nodes">
    <!-- Barra de búsqueda -->
    <div class="header">
      <div class="search-bar">
        <i class="search-icon"></i>
        <input type="text" placeholder="Search" />
      </div>
    </div>

    <!-- Sección de Riegos Programados (debajo de la barra de búsqueda) -->
    <div class="scheduled-irrigation">
      <!-- Contenedor con flex para alinear título y botón -->
      <div class="header-row">
        <h3>Riegos programados</h3>
        <button class="schedule-irrigation">Programar riego</button> <!-- Mismo estilo que Activate all -->
      </div>
      <hr />
      <div class="program-container">
        <div class="program-details">
          <div class="irrigation-info">
            <p><strong>Plot:</strong> Pucará</p>
            <p><strong>Moisture:</strong> 40%</p>
          </div>
          <div class="irrigation-info">
            <p><strong>Time:</strong> 8:15 pm</p>
            <p><strong>Irrigation mode:</strong> Manual</p>
          </div>
        </div>
        <!-- Botones de activación/cancelación fuera de la card -->
        <div class="irrigation-buttons">
          <button class="activate-all">Activate all</button>
          <button class="cancel">Cancel</button>
        </div>
      </div>
    </div>

    <!-- Tarjetas de los nodos de riego (sin cambios) -->
    <div class="irrigation-cards">
      <div v-for="i in 4" :key="i" class="card">
        <img src="../assets/Regado.png" alt="Sprinkler" class="card-image" />
        <div class="content">
          <div class="card-info">
            <p class="custom-text"><strong>Location:</strong> Noreste</p>
            <p class="custom-text"><strong>Moisture:</strong> 30%</p>
            <p class="indicator-text"><strong>Indicator:</strong> <span style="color: red;">Water</span></p>
            <p class="custom-text"><strong>Node status:</strong> Correct</p>
          </div>
          <button class="activate">Activate</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActivateNodes',
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

#activate-nodes {
  font-family: 'Poppins', sans-serif;
  max-width: 1200px;
  margin: 0 auto;
}

/* Barra de búsqueda */
.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 1700px;
  background-color: #F3F5F7;
  margin: 0 auto;
  border-radius: 30px;
  padding: 10px 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-bar input {
  width: 100%;
  border: none;
  background-color: transparent;
  font-size: 16px;
  color: #ff0000;
  outline: none;
  font-family: 'Poppins', sans-serif;
}

.search-icon {
  margin-right: 10px;
  font-size: 18px;
  color: #888;

}

.search-icon::before {
  content: "\1F50D"; /* Unicode para el ícono de lupa */
}

/* Sección de Riegos programados */
.scheduled-irrigation {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  margin: 20px 0;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-row h3 {
  color: #2B9846;
  font-weight: 600;
}

.program-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.program-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFFFF9;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  flex: 1;
}

.irrigation-info {
  flex: 1;
  padding: 10px;
  color: #2B9846;
}

/* Ajustes para los botones de activación/cancelación fuera de la card */
.irrigation-buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 20px; /* Separación de la card */
}

.irrigation-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.schedule-irrigation {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  color: white;
}

.schedule-irrigation {
  background-color: #12723D;  /* Mismo color que Activate all */
  font-family: 'Poppins', sans-serif;
}

.activate-all {
  background-color: #FE8539;  /* Color para el botón Activate all */
  width: 155px;
  font-family: 'Poppins', sans-serif;
}

.cancel {
  background-color: #7A7676;
  width: 155px;
  font-family: 'Poppins', sans-serif;
}

/* Tarjetas de riego */
.irrigation-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 20px;
}

.card {
  background-color: #FFFFF9;
  padding: 20px;
  border-radius: 35px;
  display: flex;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  justify-content: center;
  width: 380px;
  min-height: 200px;
  margin: 0 auto;
}

.card-image {
  width: 150px;
  margin-right: 20px;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.card-info {
  text-align: left;
}

.card-info p {
  margin: 5px 0;
  font-size: 16px;
}

.activate {
  background-color: #FE8539;
  border: none;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  font-family: 'Poppins', sans-serif;
}

.custom-text {
  color: #2B9846;
}

.indicator-text {
  color: #2B9846;
}
</style>
