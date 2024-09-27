<script setup lang="ts">
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import SideNavigationBar from './shared/components/side-navigation-bar.vue';
import './assets/main.css';

const isCollapsed = ref(false); // Controlamos si el sidenav está colapsado

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value; // Cambiamos el estado cuando se hace clic en el botón de colapsar
};
</script>

<template>
  <!-- El sidenav -->
  <SideNavigationBar @toggle-collapse="toggleSidebar" :is-collapsed="isCollapsed" />

  <!-- Contenido principal -->
  <div :class="['main-content', { collapsed: isCollapsed }]">
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  margin-left: 250px; /* Cuando el sidenav está expandido */
  transition: margin-left 0.3s ease;
  padding: 20px;
}

.main-content.collapsed {
  margin-left: 80px; /* Cuando el sidenav está colapsado */
}
</style>
