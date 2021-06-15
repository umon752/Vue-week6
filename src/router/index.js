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
    path: '/admin',
    component: () => import('../views/Dashboard/Dashboard.vue'),
    children: [
      {
        path: '',
        component: () => import('../views/Dashboard/Index.vue'),
      },
      {
        path: 'productList',
        component: () => import('../views/Dashboard/ProductList.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () => import('../views/Error/Error.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
