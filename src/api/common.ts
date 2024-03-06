import request from './index'
/**
 * 默认搜索
 * @returns
 */
export const getSearchDefault = <T>() => {
  return request.get<T>('/search/default')
}
