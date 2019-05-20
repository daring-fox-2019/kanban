import Vue from 'vue'
import buefy from 'buefy'

import '@mdi/font/css/materialdesignicons.css'
import 'buefy/dist/buefy.min.css'
import 'bulma-divider/dist/css/bulma-divider.min.css'
import 'vue-loading-overlay/dist/vue-loading.css'

import App from './App.vue'
import router from './router'

import './assets/padding.css'
import './assets/margin.css'

Vue.use(buefy)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
