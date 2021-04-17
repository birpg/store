import Vue from 'vue'
import './plugins/element'
import './plugins/fortawesome'
import './utils/dataFilter'
import App from './App.vue'
import router from './router'
import store from './store'
import api from './api/api'
import { message } from './utils/resetMessage'

const Pagination = () => import('./components/Pagination.vue')
const Search = () => import('./components/Search.vue')
const DialogTable = () => import('./components/DialogTable.vue')

Vue.component('pagination', Pagination)
Vue.component('search', Search)
Vue.component('dialog-table', DialogTable)

Vue.prototype.$message = message
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
