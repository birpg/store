import axios from '../axios'

/**
 * 获取用户信息
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getUserApi = () => axios('/api/users/current')

/**
 * 更新用户信息
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putUserApi = (url, params) =>
  axios.post(`/api/users/current/${url}`, params)

/**
 * 获取部门信息
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getDepartmentApi = () => axios('/api/department')

/**
 * 删除部门信息
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delDepartmentApi = id => axios.delete(`/api/department/delete/${id}`)

/**
 * 修改部门信息
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putDepartmentApi = (url, params) =>
  axios.post(`/api/department/${url}`, params)

/**
 * 修改密码
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putPasswordApi = params => axios.post('/api/users/updatePwd', params)

/**
 * 获取身份
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getIdentityApi = () => axios('/api/identity')

/**
 * 修改身份
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putIdentityApi = (url, params) =>
  axios.post(`/api/identity/${url}`, params)

/**
 * 删除身份
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delIdentityApi = id => axios.delete(`/api/identity/delete/${id}`)

/**
 * 员工账号
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const getAccountApi = () => axios('/api/users/employees')

/**
 * 新增员工账号
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const addAccountInfoApi = (url, params) =>
  axios.post(`/api/users/employee/${url}`, params)

/**
 * 删除员工账号
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const delAccountApi = id => axios.delete(`/api/users/employee/delete/${id}`)

/**
 * 修改员工账号
 * @param {Object} 请求参数
 * @returns 请求结果的Promise对象
 */
const putAccountApi = (id, params) =>
  axios.post(`/api/users/employee/edit/${id}`, params)

export default {
  getUserApi,
  putUserApi,
  getDepartmentApi,
  delDepartmentApi,
  putDepartmentApi,
  putPasswordApi,
  getIdentityApi,
  putIdentityApi,
  delIdentityApi,
  getAccountApi,
  addAccountInfoApi,
  delAccountApi,
  putAccountApi,
}
