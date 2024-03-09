import axios from './axios'
import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'
import cache from '@/utils/cache'

const instance = axios()
export default {
  get<T>(
    url: string,
    params: unknown = {},
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    const cookie = cache.local.get('cookie')
    const options: AxiosRequestConfig = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    if (cookie) {
      ;(options.params as any)['cookie'] = cookie
    }
    return instance.get(url, options)
  },
}
