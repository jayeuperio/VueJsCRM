import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { sync } from 'vuex-router-sync'
import store from './store';

Vue.use(BootstrapVue)

// Sync Store and router properties
sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})

store.dispatch('checkedLoggedIn');
