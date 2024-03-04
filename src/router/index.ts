import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    // {
    // path: '',
    // redirect: '/home',
    // },
    {
      path: '/home',
      component: () => import('@/Views/Home/index.vue'),
    },
    {
      path: '/boke',
      component: () => import('@/Views/Boke/index.vue'),
    },
  ],
})

export default router
