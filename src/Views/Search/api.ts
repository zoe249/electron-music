import request from '@/api/index'

export const getSearch = <T>(type: string, keywords: string) => {
  return request.get<T>('/search', { type, keywords })
}
