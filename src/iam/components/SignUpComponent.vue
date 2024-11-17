<template>
  <div class="signup-container">
    <h2>Signup</h2>
    <form @submit.prevent="handleSignup">
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Signup</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AuthenticationService from '@/iam/services/authentication-service';

export default defineComponent({
  name: 'SignUp',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        const user = {
          username: this.username,
          password: this.password,
        };
        const response = await AuthenticationService.signUp(user);
        console.log('Signup successful:', response.data);
        // Redirigir al login después del registro exitoso
        this.$router.push('/sign-in');
      } catch (error) {
        console.error('Error durante el registro:', error);
      }
    },
  },
});
</script>

<style scoped>
.signup-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
