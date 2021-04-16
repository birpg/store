import Vue from 'vue'
import './plugins/element'
import './plugins/fortawesome'
import './utils/dataFilter'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './axios'
import { message } from './assets/resetMessage'

const Pagination = () => import('./components/Pagination.vue')
const Search = () => import('./components/Search.vue')
const DialogTable = () => import('./components/DialogTable.vue')

Vue.component('pagination', Pagination)
Vue.component('search', Search)
Vue.component('dialog-table', DialogTable)

Vue.prototype.$message = message
Vue.prototype.$axios = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
