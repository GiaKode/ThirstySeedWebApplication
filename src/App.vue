<script setup lang="ts">
import { RouterView } from 'vue-router'
import SideNavigationBar from './shared/components/side-navigation-bar.vue'
import './assets/main.css';

</script>

<template>
  <SideNavigationBar />
  <RouterView />
</template>

<style scoped></style>
