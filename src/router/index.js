import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/SignUPPageView',
      name: 'SignUPPageView',
      component: () =>import('../views/SignUpPageView.vue')  
    },
    {
      path: '/TodoListPageView',
      name: 'TodoListPageView',
      component: () =>import('../views/TodoListPageView.vue')  
    }
  ]
})

export default router
