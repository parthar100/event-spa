import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from './components/App.vue';
import store from './store';
import router from './router';

require('./bootstrap');

Vue.config.productionTip = false;

sync(store, router);

const et = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});

et.$mount(App);

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});
