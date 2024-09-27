import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'

// PrimeVue Material Design Theme
import Aura from '@primevue/themes/lara'; 
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'

// PrimeVue Components
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Checkbox from 'primevue/checkbox';

const app = createApp(App)

app.use(createPinia())
app.use(router)

// PrimeVue Configuration
app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});

// Registrar componentes
app.component('pv-button', Button)
app.component('pv-input-text', InputText)
app.component('pv-checkbox', Checkbox)

app.mount('#app')
