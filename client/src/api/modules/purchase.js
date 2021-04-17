import axios from '../axios'

/**
 * 获取供应商
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getSupplierApi = () => axios('/api/supplier')

/**
 * 删除供应商
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delSupplierApi = id => axios.delete(`/api/supplier/delete/${id}`)

/**
 * 修改供应商
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putSupplierApi = (url, params) =>
  axios.post(`/api/supplier/${url}`, params)

/**
 * 获取采购单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getPurchaseApi = () => axios('/api/purchase')

/**
 * 删除采购单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delPurchaseApi = id => axios.delete(`/api/purchase/delete/${id}`)

/**
 * 获取单个采购单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getPurchaseItemApi = id => axios(`/api/purchase/${id}`)

/**
 * 修改采购单
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putPurchaseItemApi = (url, params) =>
  axios.post(`/api/purchase/${url}`, params)

export default {
  getSupplierApi,
  delSupplierApi,
  putSupplierApi,
  getPurchaseApi,
  delPurchaseApi,
  getPurchaseItemApi,
  putPurchaseItemApi,
}
