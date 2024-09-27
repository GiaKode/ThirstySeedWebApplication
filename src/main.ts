import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

// PrimeVue Material Design Theme
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// Theme

// PrimeVue Components

const app = createApp(App)

app.use(createPinia())
app.use(router)

// PrimeVue Configuration
app.use(PrimeVue, { ripple: true })
app.mount('#app')
