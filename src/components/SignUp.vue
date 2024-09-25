<template>
  <div class="signup-container">
    <div class="signup-card">
      <img src="../assets/register-logo.png" alt="Profile Icon" class="profile-icon"/>
      <h2>-- Create New Account --</h2>
      <form>
        <div class="input-group">
          <input type="text" placeholder="Name" required />
          <input type="text" placeholder="Last Name" required />
        </div>
        <div class="input-group">
          <input type="text" placeholder="City" required />
          <input type="tel" placeholder="Telephone" required />
        </div>
        <div class="input-field">
          <input type="email" placeholder="Email" required />
        </div>
        <div class="input-field">
          <input type="password" placeholder="Password" required />
        </div>
        <button type="button" class="btn">Sign up</button>
      </form>
      <!-- Enlace de retorno a la página de inicio de sesión -->
      <a href="#" class="return-link">Return to login</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignUp'
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

* {
  font-family: 'Poppins', sans-serif;
  box-sizing: border-box;
}

.signup-container {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-color: #f5f5f5;
}

.signup-card {
  background-color: #fff;
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
