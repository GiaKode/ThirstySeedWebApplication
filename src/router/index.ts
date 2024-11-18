import { createRouter, createWebHistory } from 'vue-router'
import SetIrrigationMode from '../irrigation-management/components/set-irrigation-mode.vue'
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'
import ActivateIrrigationNodes from '@/irrigation-management/components/activate-irrigation-nodes.vue'
import PlotStatusView from "@/plot/components/PlotStatusView.vue";
import ActivateIrrigationInPlotView from "@/irrigation-management/components/ActivateIrrigationInPlotView.vue";
import PlotRegisteredView from '@/plot/components/PlotRegisteredView.vue'
import NotFoundPage from '@/shared/components/not-found-page.vue'
import SignInComponent from '@/iam/components/SignInComponent.vue';
import SignUpComponent from '@/iam/components/SignUpComponent.vue';
import ProfileComponent from "@/profile/components/ProfileComponent.vue";
import AccountComponent from "@/profile/components/AccountComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/sign-in' },
    {
      path: '/sign-in',
      name: 'SignIn',
      component: SignInComponent,
    },
    { path: '/manage-parcels', name: 'ManageParcels', component: PlotRegisteredView },
    {
      path: '/sign-up',
      name: 'SignUp',
      component: SignUpComponent,
    },
    { path: '/complete-profile', name: 'ProfileComponent', component: ProfileComponent },
    { path: '/account', name: 'Account', component: AccountComponent },

    { path: '/set-irrigation-mode', name: 'SetIrrigationMode', component: SetIrrigationMode },
    { path: '/register-plot', name: 'registerplot', component: PlotRegisterComponent },
    { path: '/register-node/:id', name: 'registernode', component: NodeRegisterComponent },
    {path: '/activate-irrigation-nodes', name: 'activateirrigationnodes', component: ActivateIrrigationNodes},
    { path: '/plot-status/:id', name: 'plotstatus', component: PlotStatusView,props: true,  },
    { path: '/irrigation-schedule', name: 'irrigationschedule', component: ActivateIrrigationInPlotView },

    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ]
})

export default router
