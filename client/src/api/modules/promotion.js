import axios from '../axios'

/**
 * 获取所有促销订单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getOrderApi = () => axios('/api/order')

/**
 * 获取单个促销订单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getOrderItemApi = id => axios(`/api/order/${id}`)

/**
 * 获取单个促销订单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putOrderItemApi = (url, params) => axios.post(`/api/order/${url}`, params)

/**
 * 删除促销订单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delOrderApi = id => axios.delete(`/api/order/delete/${id}`)

export default {
  getOrderApi,
  getOrderItemApi,
  putOrderItemApi,
  delOrderApi,
}
