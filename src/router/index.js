import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: HomeView
    },
    {
      path: '/Register',
      name: 'Register',
      component: () =>import('../views/SignUpPageView.vue')  
    },
    {
      path: '/Todo',
      name: 'Todo',
      component: () =>import('../views/TodoListPageView.vue') 
    }
  ]
})

export default router
