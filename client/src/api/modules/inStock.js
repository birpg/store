import axios from '../axios'

/**
 * 获取入库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getStorageApi = () => axios('/api/storage')

/**
 * 获取单个入库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getStorageItemApi = id => axios(`/api/storage/${id}`)

/**
 * 修改入库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putStorageItemApi = (url, params) =>
  axios.post(`/api/storage/${url}`, params)

/**
 * 删除入库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delStorageApi = id => axios.delete(`/api/storage/delete/${id}`)

/**
 * 获取出库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getOutboundApi = () => axios('/api/outbound')

/**
 * 获取单个出库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getOutboundItemApi = id => axios(`/api/outbound/${id}`)

/**
 * 修改出库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putOutboundApi = (url, params) =>
  axios.post(`/api/outbound/${url}`, params)

/**
 * 删除出库商品
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delOutboundApi = id => axios.delete(`/api/outbound/delete/${id}`)

export default {
  getStorageApi,
  delStorageApi,
  getStorageItemApi,
  putStorageItemApi,
  getOutboundApi,
  getOutboundItemApi,
  putOutboundApi,
  delOutboundApi,
}
