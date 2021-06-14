import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Index.vue'),
      },
      {
        path: 'productList',
        component: () => import('../views/ProductList.vue'),
      },
      {
        path: 'product/:id',
        component: () => import('../views/Product.vue'),
      },
      {
        path: 'cart',
        component: () => import('../views/Cart.vue'),
      },
      {
        path: 'order',
        component: () => import('../views/Order.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('../views/Login/Login.vue'),
  },
  {
    path: '/dashboard',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Dashboard/DashboardIndex.vue'),
      },
      {
        path: '/admin',
        component: () => import('../views/Dashboard/Admin.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
