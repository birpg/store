import axios from '../axios'

/**
 * 获取商品类别
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getCategoryApi = () => axios('/api/category')

/**
 * 删除商品类别
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delCategoryApi = id => axios.delete(`/api/category/delete/${id}`)

/**
 * 获取商品类别
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putCategoryApi = (url, params) =>
  axios.post(`/api/category/${url}`, params)

/**
 * 获取商品品牌
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getBrandApi = () => axios('/api/brand')

/**
 * 删除商品品牌
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delBrandApi = id => axios.delete(`/api/brand/delete/${id}`)

/**
 * 修改商品品牌
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putBrandApi = (url, params) => axios.post(`/api/brand/${url}`, params)

/**
 * 获取商品档案
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getFileApi = () => axios('/api/file')

/**
 * 删除商品档案
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delFileApi = id => axios.delete(`/api/file/delete/${id}`)

/**
 * 批量删除商品档案
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delFilesApi = idArr =>
  axios.delete(`/api/file/deleteAllSelected/${idArr}`)

/**
 * 修改商品档案
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putFileApi = (url, params) => axios.post(`/api/file/${url}`, params)

/**
 * 获取商品参数
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getUnitApi = () => axios('/api/unit')

/**
 * 删除商品参数
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delUnitApi = id => axios.delete(`/api/unit/delete/${id}`)

/**
 * 修改商品参数
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putUnitApi = (url, params) => axios.post(`/api/unit/${url}`, params)

export default {
  getCategoryApi,
  delCategoryApi,
  putCategoryApi,
  getBrandApi,
  delBrandApi,
  putBrandApi,
  getFileApi,
  delFileApi,
  delFilesApi,
  putFileApi,
  getUnitApi,
  delUnitApi,
  putUnitApi,
}
