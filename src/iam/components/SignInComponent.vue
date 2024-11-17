<template>
  <div class="signin-container">
    <h2>Sign In</h2>
    <form @submit.prevent="handleSignIn">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Sign In</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import AuthenticationService from '@/iam/services/authentication-service'

export default defineComponent({
  name: 'SignIn',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async handleSignIn() {
      try {
        const user = {
          username: this.username,
          password: this.password
        }
        const response = await AuthenticationService.signIn(user)
        console.log('Sign in successful:', response.data)
        // Redirigir al dashboard después del login exitoso (ajusta la ruta según tu app)
        this.$router.push('/account')
      } catch (error) {
        console.error('Error durante el inicio de sesión:', error)
      }
    }
  }
})
</script>

<style scoped>
.signin-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
