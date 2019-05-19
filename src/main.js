import Vue from 'vue'
import App from './App.vue'
import router from './router'

import bootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.config.productionTip = false
Vue.use(bootstrapVue)

//gak bisa pakai .env? cek kenapa
firebase.initializeApp({
  apiKey: "AIzaSyC_yhY6p6v4cnrshwXGQMm2zrtQ-zIwyOY",
  authDomain: "kanban-323af.firebaseapp.com",
  projectId: "kanban-323af"
})

export const db = firebase.firestore();

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
