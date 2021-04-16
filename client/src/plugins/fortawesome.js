import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faUserCircle,
  faHome,
  faPowerOff,
  faArchive,
  faShoppingCart,
  faCalculator,
  faChartArea,
  faUser,
  faCalendarAlt,
} from '@fortawesome/free-solid-svg-icons'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.component('font-awesome-icon', FontAwesomeIcon)

library.add(
  faUserCircle,
  faHome,
  faPowerOff,
  faArchive,
  faShoppingCart,
  faCalculator,
  faChartArea,
  faUser,
  faCalendarAlt
)
