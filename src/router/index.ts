import { createRouter, createWebHistory } from 'vue-router'
import SetIrrigationMode from '../irrigation-management/components/set-irrigation-mode.vue'
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'
import ActivateIrrigationNodes from '@/irrigation-management/components/activate-irrigation-nodes.vue'
import PlotStatusView from "@/plot/components/PlotStatusView.vue";
import ActivateIrrigationInPlotView from "@/irrigation-management/components/ActivateIrrigationInPlotView.vue";
import ProfileView from '@/profile/components/ProfileView.vue'
import PlotRegisteredView from '@/plot/components/PlotRegisteredView.vue'
import NotFoundPage from '@/shared/components/not-found-page.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/manage-parcels', name: 'ManageParcels', component: PlotRegisteredView },
    { path: '/set-irrigation-mode', name: 'SetIrrigationMode', component: SetIrrigationMode },
    { path: '/register-plot', name: 'registerplot', component: PlotRegisterComponent },
    { path: '/register-node', name: 'registernode', component: NodeRegisterComponent },
    {path: '/activate-irrigation-nodes', name: 'activateirrigationnodes', component: ActivateIrrigationNodes},
    { path: '/plot-status', name: 'plotstatus', component: PlotStatusView },
    { path: '/irrigation-schedule', name: 'irrigationschedule', component: ActivateIrrigationInPlotView },
    { path: '/account', name: 'Account', component: ProfileView },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFoundPage }
  ]
})

export default router
