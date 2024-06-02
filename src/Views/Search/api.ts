import request from '@/api/index'

export const getSearch = <T>(type: number, keywords: string) => {
  return request.get<T>('/search', { type, keywords })
}
