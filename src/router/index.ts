import { createRouter, createWebHistory } from 'vue-router'
import SetIrrigationMode from '../irrigation-management/components/set-irrigation-mode.vue'
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'
import ActivateIrrigationNodes from '@/irrigation-management/components/activate-irrigation-nodes.vue'
import PlotStatusView from "@/plot/components/PlotStatusView.vue";
import ActivateIrrigationInPlotView from "@/irrigation-management/components/ActivateIrrigationInPlotView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //{ path: '/manage-parcels', name: 'ManageParcels', component: ManageParcelsView },
    //{ path: '/view-parcels-status', name: 'ViewParcelsStatus', component: SetIrrigationMode },
    { path: '/set-irrigation-mode', name: 'SetIrrigationMode', component: SetIrrigationMode },
    { path: '/register-plot', name: 'registerplot', component: PlotRegisterComponent },
    { path: '/register-node', name: 'registernode', component: NodeRegisterComponent },
    {path: '/activate-irrigation-nodes', name: 'activateirrigationnodes', component: ActivateIrrigationNodes},
    { path: '/plot-status', name: 'plotstatus', component: PlotStatusView },
    { path: '/irrigation-schedule', name: 'irrigationschedule', component: ActivateIrrigationInPlotView }
    //{ path: '/scheduled-irrigations', name: 'ScheduledIrrigations', component: ScheduledIrrigationsView },
    //{ path: '/irrigation-reports', name: 'IrrigationReports', component: IrrigationReportsView },
    //{ path: '/notifications', name: 'Notifications', component: NotificationsView },
    //{ path: '/account', name: 'Account', component: AccountView },
    //{ path: '/support', name: 'Support', component: SupportView },
  ]
})

export default router
