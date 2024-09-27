<script setup lang="ts">
import './assets/main.css';
import { ref } from 'vue';
import { RouterView } from 'vue-router';
import SideNavigationBar from './shared/components/side-navigation-bar.vue';

const isCollapsed = ref(false);
const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <SideNavigationBar @toggle-collapse="toggleSidebar" :is-collapsed="isCollapsed" />
  <div :class="['main-content', { collapsed: isCollapsed }]">
    <RouterView />
  </div>
</template>

<style scoped>
.main-content {
  margin-left: 250px;
  transition: margin-left 0.3s ease;
  padding: 20px;
}
.main-content.collapsed {
  margin-left: 80px;
}
</style>
