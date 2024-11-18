<template>
  <div class="account-container" v-if="profile">
    <h2>Your Account</h2>
    <div class="profile-details">
      <img
          :src="profile.profileImage || '../../assets/images/default-profile.png'"
          alt="Profile Picture"
          class="profile-image"
      />
      <p>
        <i class="fas fa-user"></i><span class="shaded-text">{{ profile.fullName }}</span>
      </p>
      <p>
        <i class="fas fa-phone-alt"></i><span class="shaded-text">{{ profile.phoneNumber }}</span>
      </p>
      <p>
        <i class="fas fa-envelope"></i><span class="shaded-text">{{ profile.email }}</span>
      </p>
      <p>
        <i class="fas fa-map-marker-alt"></i><span class="shaded-text">{{ profile.location }}</span>
      </p>
    </div>
  </div>
  <div v-else>
    <p>Loading profile...</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ProfileService from '@/profile/services/profile-service'
import type { Account } from '../model/Account'

export default defineComponent({
  name: 'AccountComponent',
  data() {
    return {
      profile: {} as Account
    }
  },
  async mounted() {
    try {
      // Obtener el ID del usuario desde localStorage
      const userId = localStorage.getItem('userId')
      if (!userId) {
        throw new Error('User ID not found')
      }

      // Obtener todos los perfiles y buscar el que coincida con el userId
      const response = await ProfileService.getAllProfiles()
      const profiles: Account[] = response.data
      const userProfile = profiles.find((profile) => profile.userId === parseInt(userId))

      if (userProfile) {
        this.profile = userProfile
      } else {
        // Si no se encuentra el perfil, redirigir al componente de completar perfil
        this.$router.push('/complete-profile')
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }
})
</script>

<style scoped>
.account-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.profile-details {
  text-align: center;
}

.profile-image {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
}

.shaded-text {
  background-color: #def6d9;
  border-radius: 25px;
  padding: 10px 20px;
  display: inline-block;
  margin-bottom: 15px;
  text-align: left;
}

i {
  margin-right: 10px;
  vertical-align: middle;
  color: #000000;
}
</style>