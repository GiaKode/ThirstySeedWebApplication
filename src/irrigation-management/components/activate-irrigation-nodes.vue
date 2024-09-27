<template>
    <div id="activate-nodes">
      <!-- Barra de búsqueda -->
      <div class="header">
        <div class="search-bar">
          <i class="search-icon"></i>
          <input type="text" placeholder="Search" />
        </div>
      </div>
  
      <!-- Sección de Riegos Programados -->
      <div class="scheduled-irrigation">
        <div class="header-row">
          <h3>Scheduled Irrigations</h3>
          <button class="schedule-irrigation">Schedule Irrigation</button>
        </div>
        <hr />
        <div class="program-container">
          <div class="program-details">
            <div class="irrigation-info">
              <p><strong>Plot:</strong> Pucará</p>
              <p><strong>Moisture:</strong> 40%</p>
            </div>
            <div class="irrigation-info">
              <p><strong>Irrigation Time:</strong> 8:15 pm</p>
              <p><strong>Mode:</strong> Manual</p>
            </div>
          </div>
          <div class="irrigation-buttons">
            <button class="activate-all">Activate All</button>
            <button class="cancel">Cancel</button>
          </div>
        </div>
      </div>
  
      <!-- Tarjetas de los nodos de riego -->
      <div class="irrigation-cards">
        <div v-for="(node, index) in irrigationNodes" :key="index" class="card">
          <img src="../../assets/images/Regado.png" alt="Sprinkler" class="card-image" />
          <div class="content">
            <div class="card-info">
              <p class="custom-text"><strong>Location:</strong> {{ node.location }}</p>
              <p class="custom-text"><strong>Moisture:</strong> <span>{{ node.moisture }}%</span></p>
              <p class="indicator-text"><strong>Indicator:</strong> <span style="color: red;">Water</span></p>
              <p class="custom-text"><strong>Node Status:</strong> Correct</p>
            </div>
            <button @click="activateNode(index)" class="activate">Activate</button>
          </div>
        </div>
      </div>
  
      <!-- Modal de confirmación con fondo oscuro -->
      <div v-if="showModal">
        <div class="modal-backdrop"></div>
        <div class="modal">
          <div class="modal-content">
            <div class="modal-image">
              <img src="../../assets/images/Regado.png" alt="Sprinkler Icon" />
            </div>
            <div class="modal-text">
              <h2>Irrigation Completed</h2>
              <p><strong>Location:</strong> {{ currentNode.location }}</p>
              <p><strong>Moisture:</strong> {{ currentNode.moisture }}%</p>
              <p><strong>Indicator:</strong> Successfully Completed</p>
              <p><strong>Node Status:</strong> Finished</p>
              <button @click="closeModal" class="accept-btn">Accept</button>
              <button class="report-btn">View Report</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        irrigationNodes: [
          { location: 'Northeast', moisture: 30 },
          { location: 'Southwest', moisture: 50 },
          { location: 'Northwest', moisture: 40 },
          { location: 'Southeast', moisture: 35 },
        ], // Nodos con diferentes porcentajes de humedad
        showModal: false, // Controla la visibilidad del modal
        currentNode: {}, // Nodo actual que se está activando
      };
    },
    methods: {
      activateNode(index) {
        const node = this.irrigationNodes[index];
        const interval = setInterval(() => {
          if (node.moisture < 100) {
            node.moisture += 5;
          } else {
            clearInterval(interval);
            this.currentNode = node;
            this.showModal = true;
          }
        }, 500);
      },
      closeModal() {
        this.showModal = false;
      }
    }
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
    outline: none;
  }
  
  .search-icon {
    margin-right: 10px;
    font-size: 18px;
    color: #888;
  }
  
  .search-icon::before {
    content: "\1F50D";
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
    margin-left: 20px;
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
    background-color: #12723D;
    width: 155px;               /* Mismo ancho */
    font-family: 'Poppins', sans-serif;
    padding: 10px ;          /* Ajustar el padding si es necesario */
    border: none;
    border-radius: 5px;
    cursor: pointer;
    color: white;
    font-size: 14px;
  }
  
  .activate-all {
    background-color: #FE8539;
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
  
  /* Modal */
  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #FFFFF9;
    padding: 20px;
    border-radius: 20px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1001; /* Superior al fondo oscuro */
    display: flex;
  }
  
  .modal-content {
    display: flex;
    align-items: center;
  }
  
  .modal-image {
    width: 150px;
    margin-right: 100px;
    margin-left: 40px;
  }
  
  .modal-image img {
    width: 120%;
  }
  
  .modal-text {
    text-align: left;
  }
  
  .modal-text h2 {
    color: #2B9846;
  }
  
  .modal-text p{
    color: #2B9846;
  }
  
  .accept-btn {
    background-color: #2B9846;
    color: white;
    padding: 10px 30px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    margin-right: 20px; /* Agregamos margen derecho para separarlo del otro botón */
    font-family: 'Poppins', sans-serif;
  }
  
  .report-btn {
    background-color: #ff0000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-family: 'Poppins', sans-serif;
  }
  
  /* Fondo oscuro detrás del modal */
  .modal-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }
  </style>
  