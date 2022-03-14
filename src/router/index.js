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
      {
        path: 'anniversary',
        name: 'Anniversary',
        component: () => import('../views/FirstAnniversary.vue'),
      },
      {
        path: 'contact',
        name: 'Contact',
        component: () => import('../views/ContactUs.vue'),
      },
      {
        path: 'products',
        name: 'UserProducts',
        component: () => import('../views/UserProducts.vue'),
      },
      {
        path: 'product/:id',
        name: 'UserProduct',
        component: () => import('../views/UserProduct.vue'),
      },
      {
        path: 'cart',
        name: 'UserCart',
        component: () => import('../views/UserCart.vue'),
      },
      {
        path: 'order',
        name: 'UserOrder',
        component: () => import('../views/UserOrder.vue'),
        children: [
          {
            path: 'info',
            name: 'UserOrderInfo',
            component: () => import('../views/UserOrderInfo.vue'),
          },
          {
            path: 'confirm',
            name: 'UserOrderConfirm',
            component: () => import('../views/UserOrderConfirm.vue'),
          },
          {
            path: 'finished/:id',
            name: 'UserOrderFinished',
            component: () => import('../views/UserOrderFinished.vue'),
          },
          {
            path: 'error',
            name: 'UserOrderErr',
            component: () => import('../views/UserOrderErr.vue'),
          },
        ],
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
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/NotFound.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
