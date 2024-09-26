import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PlotStatusView from "@/plot/pages/PlotStatusView.vue";
import PlotRegisterComponent from '@/plot/components/PlotRegisterComponent.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import NodeRegisterComponent from '@/node/components/NodeRegisterComponent.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HelloWorld
    },
    {
      path: '/plotstatus',
      name: 'plotstatus',
      component: PlotStatusView
    },
    {
      path: '/plotregister',
      name: 'plotregister',
      component: PlotRegisterComponent
    },
    {
      path: '/hola',
      name: 'hola',
      component: NodeRegisterComponent
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router