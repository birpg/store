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
const AddFile = () => import('../components/commodity/AddFile.vue')
const Supplier = () => import('@/views/purchase/Supplier.vue')
const AddSupplier = () => import('@/components/purchase/AddSupplier.vue')
const Purchase = () => import('@/views/purchase/Purchase.vue')
const AddPurchase = () => import('@/components/purchase/AddPurchase.vue')
const Personal = () => import('@/views/account/Personal.vue')
const ChangePwd = () => import('@/views/account/ChangePwd.vue')
const Department = () => import('@/views/account/Department.vue')
const Account = () => import('@/views/account/Account.vue')
const AddAccount = () => import('@/components/account/AddAccount.vue')
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
    redirect: '/index',
  },

  {
    path: '/index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home', name: 'Home', component: Home },
      { path: '/category', name: 'Category', component: Category },
      { path: '/brand', name: 'Brand', component: Brand },
      { path: '/unit', name: 'Unit', component: Unit },
      {
        path: '/file',
        name: 'File',
        component: File,
        meta: { show: true },
        children: [{ path: 'addFile', name: 'AddFile', component: AddFile }],
      },
      {
        path: '/supplier',
        name: 'Supplier',
        component: Supplier,
        meta: { show: true },
        children: [
          {
            path: 'addSupplier',
            name: 'AddSupplier',
            component: AddSupplier,
          },
        ],
      },
      {
        path: '/purchase',
        name: 'Purchase',
        component: Purchase,
      },
      {
        path: '/purchase/addPurchase',
        name: 'AddPurchase',
        component: AddPurchase,
      },
      { path: '/personal', name: 'Personal', component: Personal },
      { path: '/changePwd', name: 'ChangePwd', component: ChangePwd },
      { path: '/department', name: 'Department', component: Department },
      { path: '/account', name: 'Account', component: Account },
      { path: '/addAccount', name: 'AddAccount', component: AddAccount },
      { path: '/identity', name: 'Identity', component: Identity },
      {
        path: '/storage',
        name: 'Storage',
        component: Storage,
      },
      {
        path: '/storage/addStorage',
        name: 'AddStorage',
        component: AddStorage,
      },
      {
        path: '/outbound',
        name: 'Outbound',
        component: OutBound,
      },
      {
        path: '/outbound/addOutBound',
        name: 'AddOutBound',
        component: AddOutBound,
      },
      {
        path: '/order',
        name: 'Order',
        component: Order,
      },
      { path: '/order/addOrder', name: 'AddOrder', component: AddOrder },
    ],
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '*',
    name: '404',
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.storeToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
})

export default router
