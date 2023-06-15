import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getTimeStamp } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 50000 // request timeout
})

const timeOut = 60 * 60 * 1000

// token过期时间
function isCheckTomeOut() {
  const currentTime = Date.now()
  const timeStamp = getTimeStamp()
  return (currentTime - timeStamp) > timeOut
}

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      if (isCheckTomeOut()) {
        store.dispatch('user/logout')
        router.push('/login')
        return Promise.reject(new Error('token超时了'))
      }
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // config.headers['X-Token'] = getToken()
      config.headers['Authorization'] = 'Bearer ' + store.getters.token
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    // 判断是否二进制
    if (response.data instanceof Blob) return response.data
    const { success, message, data } = response.data
    if (success) {
      return data
    } else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  error => {
    if (error.response && error.response.data && error.response.data.code === 10002) {
      store.dispatch('user/logout')
      router.push('/login')
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
    }
    return Promise.reject(error)
  }
)

export default service
