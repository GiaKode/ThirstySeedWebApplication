import { createRouter, createWebHistory } from 'vue-router'
import ProfileView from '../views/ProfileView.vue'

const routes = [
  
  {
    path: '/account',  // Nueva ruta para "Account"
    name: 'account',
    component: ProfileView // Muestra el perfil de la cuenta
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
