import axios from './axios'
import goods from './modules/goods'
import purchase from './modules/purchase'
import promotion from './modules/promotion'
import inStock from './modules/inStock'
import account from './modules/account'

/**
 * 登录
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const loginApi = params => axios.post('/api/users/login', params)

/**
 * 注册
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const registerApi = params => axios.post('/api/users/register', params)

export default {
  loginApi,
  registerApi,
  ...goods,
  ...purchase,
  ...promotion,
  ...inStock,
  ...inStock,
  ...account,
}
