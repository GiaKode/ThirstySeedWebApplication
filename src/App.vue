<!-- src/App.vue -->
<template>
  <div id="app">
    <SignUp /> <!-- Aquí mostramos el componente de Sign Up -->
  </div>
</template>

<script>
import SignUp from './components/SignUp.vue'; // Importamos el componente de registro

export default {
  name: 'App',
  components: {
    SignUp // Registramos el componente para usarlo en el template
  }
};
</script>

<style>
/* Puedes agregar estilos globales aquí si lo necesitas */
</style>