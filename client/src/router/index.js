import Vue from 'vue'
import VueRouter from 'vue-router'

const Index = () => import('@/views/Index.vue')
const NotFound = () => import('@/views/404.vue')
const Register = () => import('@/views/Register.vue')
const Login = () => import('@/views/Login.vue')
const Home = () => import('@/views/Home.vue')
const Category = () => import('@/views/commodity/Category.vue')
const Brand = () => import('@/views/commodity/Brand.vue')
const Unit = () => import('@/views/commodity/Unit.vue')
const File = () => import('@/views/commodity/File.vue')
const Supplier = () => import('@/views/purchase/Supplier.vue')
const Purchase = () => import('@/views/purchase/Purchase.vue')
const Personal = () => import('@/views/account/Personal.vue')
const ChangePwd = () => import('@/views/account/ChangePwd.vue')
const Department = () => import('@/views/account/Department.vue')
const Account = () => import('@/views/account/Account.vue')
const Identity = () => import('@/views/account/Identity.vue')
const Storage = () => import('@/views/inventory/Storage.vue')
const AddStorage = () => import('@/components/inventory/AddStorage.vue')
const OutBound = () => import('@/views/inventory/OutBound.vue')
const AddOutBound = () => import('@/components/inventory/AddOutBound.vue')
const Order = () => import('@/views/promotion/Order.vue')
const AddOrder = () => import('@/components/promotion/AddOrder.vue')



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index'
  },

  {
    path: '/index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home', name: 'home', component: Home },
      { path: '/category', name: 'category', component: Category },
      { path: '/brand', name: 'brand', component: Brand },
      { path: '/unit', name: 'unit', component: Unit },
      { path: '/file', name: 'file', component: File },
      { path: '/supplier', name: 'supplier', component: Supplier },
      { path: '/purchase', name: 'purchase', component: Purchase },
      { path: '/personal', name: 'personal', component: Personal },
      { path: '/changePwd', name: 'changePwd', component: ChangePwd },
      { path: '/department', name: 'department', component: Department },
      { path: '/account', name: 'account', component: Account },
      { path: '/identity', name: 'identity', component: Identity },
      {
        path: '/storage', name: 'storage', component: Storage, meta: { show: true }, children: [
          { path: 'addStorage', name: 'addStorage', component: AddStorage, meta: { show: false } }
        ]
      },
      {
        path: '/outbound', name: 'outbound', component: OutBound, meta: { show: true }, children: [
          { path: 'addOutBound', name: 'addOutBound', component: AddOutBound, meta: { show: false } }
        ]
      },
      {
        path: '/order', name: 'order', component: Order, meta: { show: true }, children: [
          { path: 'addOrder', name: 'addOrder', component: AddOrder }
        ]
      }
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.storeToken ? true : false
  if (to.path == "/login" || to.path == "/register") {
    next()
  } else {
    isLogin ? next() : next("/login")
  }
})

export default router
