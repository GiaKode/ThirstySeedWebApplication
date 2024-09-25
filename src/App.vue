<!-- src/App.vue -->
<template>
  <div id="app">
    <Login /> <!-- Aquí importamos y mostramos el componente de login -->
  </div>
</template>

<script>
import Login from './components/Login.vue'; // Importa tu componente

export default {
  name: 'App',
  components: {
    Login, // Registra el componente
  },
};
</script>

<style>
/* Si tienes algún estilo global, agrégalo aquí */
</style>