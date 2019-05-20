import Vue from 'vue'
import App from './App.vue'
import router from './router'
import bootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueSweetalert2 from 'vue-sweetalert2'

Vue.use(bootstrapVue)

const option = {
  showConfirmButton: false
}

Vue.use(VueSweetalert2,option)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
