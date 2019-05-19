import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import swal from 'sweetalert';
import router from './router';
import App from './App.vue';

Vue.use(BootstrapVue);
Vue.config.productionTip = false;

new Vue({
  router,
  swal,
  render: h => h(App),
}).$mount('#app');
