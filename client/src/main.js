import Vue from 'vue'
import './plugins/element'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './http'
import { message } from './assets/resetMessage'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faHome, faPowerOff, faArchive, faShoppingCart, faCalculator, faChartArea, faUser, faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserCircle, faHome, faPowerOff, faArchive, faShoppingCart, faCalculator, faChartArea, faUser, faCalendarAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.prototype.$message = message
Vue.prototype.$axios = axios


// 全局时间过滤器
Vue.filter('dateFormat', originVal => {
  if (originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  }
  return '---'
})

Vue.filter('dateFilter', val => {
  let str = val.toString()
  return str.replace(',', '~')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
