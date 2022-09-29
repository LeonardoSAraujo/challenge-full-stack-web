import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
//
import { createStore } from 'vuex'

Vue.config.productionTip = false
//Vue.prototype.$axios = axios

new Vue({
  vuetify,
  createStore,
  render: h => h(App)
}).$mount('#app')
