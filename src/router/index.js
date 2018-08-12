import Vue from 'vue';
import Router from 'vue-router';
const Events = () => import('@/components/sections/layouts/Events');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/',
  linkActiveClass: 'onstate',
  routes: [
    {
      path: '/',
      component: Events
    }
  ]
});
