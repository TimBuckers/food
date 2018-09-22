import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import VueFire from 'vuefire'
import { db } from "./firestore.js"
Vue.config.productionTip = false

Vue.use(VueFire)


Vue.prototype.$db = db
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
