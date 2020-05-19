import axios from 'axios'
import { Loading } from 'element-ui'
import router from './router'
import { message } from './assets/resetMessage'

let loading        //定义loading变量
function startLoading () {    //使用Element loading-start 方法
    loading = Loading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(0, 0, 0, .3)'
    })
}
function endLoading () {    //使用Element loading-close 方法
    loading.close()
}


// 请求拦截 
axios.interceptors.request.use(config => {
    if (config.showLoading !== false) {
        // 开始加载动画
        startLoading()
    }
    if (localStorage.storeToken)
        // 设置统一的请求头
        config.headers.Authorization = localStorage.storeToken
    return config
}, error => {
    return Promise.reject(error)
})

// 响应拦截,401 token过期处理
axios.interceptors.response.use(response => {
    endLoading()
    return response
}, error => {
    // 错误提醒
    endLoading()
    message.error(error.response.data)

    // 获取错误状态码
    const { status } = error.response
    if (status == 401) {
        message.error('登录过期，请重新登录')
        // 清除token
        localStorage.removeItem('storeToken')
        // 页面跳转
        router.push('/login')
    }
    return Promise.reject(error)
})

export default axios