import { createRouter, createWebHistory } from 'vue-router'
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/manage-parcels', name: 'ManageParcels', component: PlotRegisterComponent },
    { path: '/view-parcels-status', name: 'ViewParcelsStatus', component: NodeRegisterComponent },
    //{ path: '/scheduled-irrigations', name: 'ScheduledIrrigations', component: ScheduledIrrigationsView },
    //{ path: '/irrigation-reports', name: 'IrrigationReports', component: IrrigationReportsView },
    //{ path: '/notifications', name: 'Notifications', component: NotificationsView },
    //{ path: '/account', name: 'Account', component: AccountView },
    //{ path: '/support', name: 'Support', component: SupportView },
  ]
})

export default router
