<template>
  <div id="app">
    <ForgotPassword /> <!-- Aquí importamos y mostramos el componente de login -->
  </div>
</template>

<script>
import ForgotPassword from './components/ForgotPassword.vue'; // Importación del componente

export default {
  name: 'App',
  components: {
    ForgotPassword // Registro del componente
  }
};
</script>

<style>
/* Si tienes algún estilo global, agrégalo aquí */
</style>
