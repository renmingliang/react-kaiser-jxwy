import axios from 'axios'
import qs from 'qs'
import { Toast } from 'antd-mobile'
import { getToken } from '../utils/auth'

import store from '../redux/store/index'
import { setBrowserMask } from '../redux/actions'

// import createHistory from 'history/createHashHistory'
// const history = createHistory()
const baseURL = process.env.NODE_ENV === 'development' ? '' : 'https://test-huodong-api.ksgame.com'

// create an axios instance
const service = axios.create({

  baseURL, // api的base_url
  headers: {
    // `headers` 是即将被发送的自定义请求头
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'LOGIN-TYPE': 'wechat'
  },

  // `transformRequest` 允许在向服务器发送前，修改请求数据
  // 只能用在 'PUT', 'POST' 和 'PATCH' 这几个请求方法
  // 后面数组中的函数必须返回一个字符串，或 ArrayBuffer，或 Stream
  transformRequest: [
    function(data) {
      // 对 data 进行任意转换处理
      return qs.stringify(data)
    }
  ]
})

// request interceptor
service.interceptors.request.use(config => {
  // 用户token信息
  if (getToken()) {
    config.headers['TOKEN'] = getToken()
  }

  // 防止get请求获取数据304缓存，必须保证状态为200
  if (config.method === 'get') {
    if (config.params) {
      config.params['_'] = +new Date()
    } else {
      config.params = { '_': +new Date() }
    }
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 10000) {
      // 用户未登录，再次唤起微信授权登录
      if (res.code === 10003) {
        const { redirect_url } = res.data
        window.location.href = redirect_url
      } else if (res.code === 10005) {
      // 非微信环境
        store.dispatch(setBrowserMask(true))
      } else {
        Toast.info(res.msg)
      }
      return Promise.reject(res)
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error)// for debug
    let msg = error.message
    // 超时错误
    if (error.code === 'ECONNABORTED' && msg.indexOf('timeout') !== -1) {
      msg = '网络请求超时，请稍后重试'
    }
    Toast.fail(msg)

    return Promise.reject(error)
  })

export default service
