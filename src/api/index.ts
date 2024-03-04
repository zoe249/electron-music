import axios from './axios'
import type { AxiosRequestConfig, AxiosRequestHeaders } from 'axios'

const instance = axios()
export default {
  get<T>(
    url: string,
    params?: unknown,
    headers?: AxiosRequestHeaders
  ): Promise<T> {
    const options: AxiosRequestConfig = {}
    if (params) {
      options.params = params
    }
    if (headers) {
      options.headers = headers
    }
    return instance.get(url, options)
  },
}
