<template>
  <div class="login-container">
    <div class="login-image"></div>
    <div class="login-form">
      <img src="../assets/NewLogo.jpg" alt="Thirsty Seed Logo" class="logo" />
      <h2>Welcome to Thirsty Seed</h2>
      <form>
        <div class="input-field">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" />
        </div>
        <div class="input-field">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" />
        </div>

        <!-- Centramos el texto de "Forgot password?" -->
        <a href="#" class="forgot-password">Forgot password?</a>

        <!-- Contenedor de los botones para alinearlos horizontalmente -->
        <div class="button-group">
          <button type="button" class="btn">Log In</button>
          <button type="button" class="btn secondary">Sign In</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login'
};
</script>

<style scoped>
/* Importamos la fuente Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif; /* Aseguramos que la fuente se aplique globalmente */
}

html, body {
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden; /* Aseguramos que no haya desplazamiento */
}

.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.login-image {
  flex: 1;
  height: 100%;
  background-image: url('../assets/sprinkler-image.jpg');
  background-size: cover;
  background-position: center;
}

.login-form {
  flex: 1;
  background-color: #fff;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.logo {
  width: 120px;
  margin-bottom: 1.5rem;
}

h2 {
  font-size: 1.8rem;
  color: #4caf50;
  margin-bottom: 1rem;
}

.input-field {
  width: 100%;
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.forgot-password {
  font-size: 0.9rem;
  color: #4caf50;
  margin-bottom: 1.5rem; /* Añadimos espacio extra entre "Forgot password?" y los botones */
  text-align: center; /* Centramos el texto de "Forgot password?" */
}

/* Estilo del grupo de botones */
.button-group {
  display: flex;
  justify-content: space-between; /* Distribuye los botones horizontalmente */
  width: 100%;
}

.btn {
  width: 48%;
  padding: 0.75rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.secondary {
  background-color: transparent;
  border: 1px solid #4caf50;
  color: #4caf50;
}

.btn:hover {
  opacity: 0.9;
}
</style>
