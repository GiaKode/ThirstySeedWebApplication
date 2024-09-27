<template>
  <div :class="['side-nav', { collapsed: isCollapsed, 'is-mobile': isMobile }]">
    <!-- Logo, Title and Collapsed Icon -->
    <div class="logo-container">
      <img src="@/assets/images/image.png" alt="ThirstySeed Logo" class="logo" />
      <span v-if="!isCollapsed" class="logo-title">Thirsty Seed</span>
      <button class="toggle-button" v-if="!isCollapsed" @click="toggleSidebar">
        <i class="pi pi-bars"></i>
      </button>
    </div>
      
    <hr class="divider" />

    <!-- Collapsed button-->
    <button v-if="isCollapsed" class="toggle-button collapsed" @click="toggleSidebar">
      <i class="pi pi-bars"></i>
    </button>

    <!-- Navegation list-->
    <ul>
      <li
        v-for="item in items"
        :key="item.label"
        :class="{ active: activeItem === item.label }"
        @click="selectItem(item.label)"
      >
        <RouterLink :to="item.to" class="nav-link">
          <i :class="getIconClass(item.label)" class="nav-icon"></i>
          <span v-if="!isCollapsed">{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Logout -->
    <div class="logout">
      <RouterLink to="/logout" class="nav-link logout-link">
        <i class="pi pi-sign-out nav-icon"></i>
        <span v-if="!isCollapsed">Logout</span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SideNavigationBar',
  data() {
    return {
      isCollapsed: false,
      isMobile: false,
      activeItem: '',
      items: [
        { label: 'Manage parcels', to: 'manage-parcels' },
        { label: 'View parcels status', to: 'view-parcels-status' },
        { label: 'Scheduled irrigations', to: 'scheduled-irrigations' },
        { label: 'Irrigation reports', to: 'irrigation-reports' },
        { label: 'Notifications', to: 'notifications' },
        { label: 'Account', to: 'account' },
        { label: 'Support', to: 'support' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    },
    selectItem(label) {
      this.activeItem = label
    },
    getIconClass(label) {
      switch (label) {
        case 'Manage parcels':
          return 'pi pi-folder'
        case 'View parcels status':
          return 'pi pi-eye'
        case 'Scheduled irrigations':
          return 'pi pi-calendar'
        case 'Irrigation reports':
          return 'pi pi-file'
        case 'Notifications':
          return 'pi pi-bell'
        case 'Account':
          return 'pi pi-user'
        case 'Support':
          return 'pi pi-info-circle'
        default:
          return ''
      }
    },
    handleResize() {
      this.isMobile = window.innerWidth <= 768
      if (this.isMobile) {
        this.isCollapsed = true
      }
    }
  },
  mounted() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize)
  }
}
</script>

<style scoped>
.side-nav {
  width: 250px;
  background-color: #ffffff;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  box-shadow: 2px 0px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.side-nav.collapsed {
  width: 80px;
}

.logo-container {
  display: flex;
  align-items: center;
  padding: 15px;
  text-align: left;
}

.logo {
  max-width: 40px;
  margin-right: 10px;
}

.logo-title {
  color: #2b9846;
  font-size: 18px;
  font-weight: bold;
  flex-grow: 1;
}

.toggle-button {
  background: none;
  border: none;
  color: #2b9846;
  font-size: 24px;
  margin-left: auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.toggle-button.collapsed {
  margin: 0; /* Elimina el margen adicional */
  width: 100%;
  padding: 10px 0;
  justify-content: center; /* Alinea al centro el ícono */
}

.divider {
  border: none;
  border-bottom: 2px solid #2b9846;
  margin: 10px 0;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
}

li {
  margin: 15px 0;
}

.nav-link {
  text-decoration: none;
  color: #2b9846;
  font-weight: normal;
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.nav-icon {
  margin-right: 10px;
  font-size: 20px;
}

li.active .nav-link {
  background-color: #dfffda;
}

.logout {
  margin-top: auto;
  padding-bottom: 20px;
}

.logout-link {
  color: #2b9846;
}

.side-nav.is-mobile {
  width: 80px;
}

@media (max-width: 768px) {
  .side-nav {
    width: 80px;
  }

  .side-nav.collapsed {
    width: 80px;
  }

  .side-nav .toggle-button {
    display: none;
  }
}
</style>
