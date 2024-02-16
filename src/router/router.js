import Vue from 'vue';
import VueRouter from 'vue-router';
import MainPage from '@/views/MainPage.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: MainPage,
  },
  {
    path: '/gallery',
    component: () => import('@/views/PhotosPage.vue'),
  },
  {
    path: '/table-filter',
    component: () => import('@/views/TableFilterTwo.vue'),
  },
];

export default new VueRouter({
  mode: 'history',
  routes: routes,
});
