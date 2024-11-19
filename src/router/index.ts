import { createRouter, createWebHistory } from 'vue-router'
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'
import PlotStatusView from "@/plot/components/PlotStatusView.vue";
import PlotRegisteredView from '@/plot/components/PlotRegisteredView.vue'
import NotFoundPage from '@/shared/components/not-found-page.vue'
import SignInComponent from '@/iam/components/SignInComponent.vue';
import SignUpComponent from '@/iam/components/SignUpComponent.vue';
import ProfileComponent from "@/profile/components/ProfileComponent.vue";
import AccountComponent from "@/profile/components/AccountComponent.vue";
import PlanSelectionModal from "@/subscriptions/components/PlanSelectionModal.vue";
import PaymentForm from "@/subscriptions/components/PaymentForm.vue";
import SchedulesViewComponent from '@/schedule/components/SchedulesViewComponent.vue';
import ScheduleFormComponent from '@/schedule/components/ScheduleFormComponent.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //INICIO
    { path: '/', redirect: '/sign-in' },
    { path: '/sign-in', name: 'SignIn', component: SignInComponent},
    { path: '/manage-parcels', name: 'ManageParcels', component: PlotRegisteredView },
    { path: '/sign-up', name: 'SignUp', component: SignUpComponent },

    //PROFILE
    { path: '/complete-profile', name: 'ProfileComponent', component: ProfileComponent },
    { path: '/plan-selection', name: 'Plan', component: PlanSelectionModal, props: true },
    { path: '/payment', name: 'Pay', component: PaymentForm },
    { path: '/account', name: 'Account', component: AccountComponent },

    //PLOTS AND NODES
    { path: '/register-plot', name: 'registerplot', component: PlotRegisterComponent },
    { path: '/register-node/:id', name: 'registernode', component: NodeRegisterComponent },
    { path: '/plot-status/:id', name: 'plotstatus', component: PlotStatusView,props: true},

    //IRRIGATION
    { path: '/schedule', name: 'schedule', component: SchedulesViewComponent },
    { path: '/schedule-form/:id?', name: 'scheduleform', component: ScheduleFormComponent },
    
    //NOT FOUND
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }

  ]
})

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
