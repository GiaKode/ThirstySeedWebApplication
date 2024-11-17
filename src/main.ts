import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

// PrimeVue Material Design Theme
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
//import Aura from "@primevue/themes/aura";

// PrimeVue Components
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
const app = createApp(App)

app.use(createPinia())
app.use(router)

// PrimeVue Configuration
//app.use(PrimeVue, {ripple: true});
app.use(PrimeVue)

// Registrar componentes
app.use(ToastService)
app.component('pv-toast', Toast)
app.mount('#app')
