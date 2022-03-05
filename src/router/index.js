import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/IndexView.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('../views/HomeView.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/DashboardView.vue'),
    children: [
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/Dashboard/ProductsView.vue'),
      },
      {
        path: 'coupons',
        name: 'AdminCoupons',
        component: () => import('../views/Dashboard/CouponsView.vue'),
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/Dashboard/OrderView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  linkActiveClass: 'active',
});

export default router;
