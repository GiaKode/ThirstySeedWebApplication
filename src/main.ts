import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import i18n from '@/i18n';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(i18n); // Asegúrate de agregar i18n aquí

// PrimeVue Configuration
//app.use(PrimeVue, {ripple: true});
app.use(PrimeVue)

// Registrar componentes
app.use(ToastService)
app.component('pv-toast', Toast)
app.mount('#app')
