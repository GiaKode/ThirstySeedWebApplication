import { createRouter, createWebHistory } from 'vue-router';
import SetIrrigationMode from '../irrigation-management/components/set-irrigation-mode.vue';
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue';
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue';
import ActivateIrrigationNodes from '@/irrigation-management/components/activate-irrigation-nodes.vue';
import PlotStatusView from "@/plot/components/PlotStatusView.vue";
import ActivateIrrigationInPlotView from "@/irrigation-management/components/ActivateIrrigationInPlotView.vue";
import ProfileView from '@/profile/components/ProfileView.vue';
import PlotRegisteredView from '@/plot/components/PlotRegisteredView.vue';
import NotFoundPage from '@/shared/components/not-found-page.vue';
import Login from '@/profile/components/Login.vue';
import ForgotPassword from '@/profile/components/ForgotPassword.vue'
import SignUp from '@/profile/components/SignUp.vue'
import Support from '@/support/components/Support.vue'

const routes = [
  { path: '/', redirect: '/login' }, // Redirigir a login por defecto
  { path: '/login', name: 'Login', component: Login },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp
  },
  { path: '/manage-parcels', name: 'ManageParcels', component: PlotRegisteredView, meta: { requiresAuth: true } },
  { path: '/set-irrigation-mode', name: 'SetIrrigationMode', component: SetIrrigationMode, meta: { requiresAuth: true } },
  { path: '/register-plot', name: 'registerplot', component: PlotRegisterComponent, meta: { requiresAuth: true } },
  { path: '/register-node', name: 'registernode', component: NodeRegisterComponent, meta: { requiresAuth: true } },
  { path: '/activate-irrigation-nodes', name: 'activateirrigationnodes', component: ActivateIrrigationNodes, meta: { requiresAuth: true } },
  { path: '/plot-status/:plotId', name: 'plotstatus', component: PlotStatusView, meta: { requiresAuth: true } },
  { path: '/irrigation-schedule', name: 'irrigationschedule', component: ActivateIrrigationInPlotView, meta: { requiresAuth: true } },
  { path: '/account', name: 'Account', component: ProfileView, meta: { requiresAuth: true } },
  {path: '/support', name: 'Support', component: Support, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('authToken'); // Verificar autenticación

  if (!isAuthenticated && to.path !== '/login' && to.path !== '/forgot-password' && to.path !== '/sign-up') {
    // Si no está autenticado y la ruta no es login, forgot-password o sign-up, redirigir al login
    next('/login');
  } else if (isAuthenticated && (to.path === '/login' || to.path === '/forgot-password' || to.path === '/sign-up')) {
    // Si está autenticado y quiere acceder a login, forgot-password o sign-up, redirigir a la vista principal
    next('/manage-parcels'); // Cambia a la vista principal de tu app
  } else {
    next(); // Permitir la navegación
  }
});


export default router;
