import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/location/:name',
    name: 'location',
    component: () => import('../views/LocationView.vue'),
    props: true
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/UserProfile.vue')
  },
  {
    path: '/ranking',
    name: 'ranking',
    component: () => import('../views/RankingView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})


export default router
