import axios from 'axios'
import { tansParams } from '@/utils'

const baseUrl = import.meta.env.VITE_APP_BASE_API
const http = axios.create({
  timeout: 30000,
  baseURL: baseUrl,
})

// 添加请求拦截器
http.interceptors.request.use(
  (config) => {
    if (config.method == 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 添加响应拦截器
http.interceptors.response.use(
  (res) => {
    if (
      res.request.responseType === 'blob' ||
      res.request.responseType === 'arraybuffer'
    ) {
      return res
    }
    return Promise.resolve(res.data)
  },
  (error) => {
    return Promise.reject(error)
  }
)

/**
 * 创建统一封装过的 axios 实例
 * @return {AxiosInstance}
 */
export default function () {
  return http
}
