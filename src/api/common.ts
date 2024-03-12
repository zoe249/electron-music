import request from './index'
/**
 * 默认搜索
 * @returns
 */
export const getSearchDefault = <T>() => {
  return request.get<T>('/search/default')
}

/**
 * 发送验证码
 * @returns
 */
export const getCtcode = <T>(phone: string) => {
  return request.get<T>('/captcha/sent?phone=' + phone)
}

/**
 * 登录
 */
export const loginByCaptcha = <T>(phone: string, captcha: string) => {
  return request.get<T>(`/login/cellphone`, { phone: phone, captcha: captcha })
}

/**
 * 热搜
 */
export const getSearchHot = <T>() => {
  return request.get<T>('/search/hot/detail')
}

/**
 * 搜索建议
 */
export const getSearchSuggest = <T>(keywords: string) => {
  return request.get<T>('/search', { keywords: keywords })
}

/**
 * 获取歌曲信息
 */
export const getSongsInfo = <T>(ids: string) => {
  return request.get<T>('/song/detail', { ids })
}

/**
 * 获取音乐url
 * 播放音质等级, 分为 standard => 标准,higher => 较高, exhigh=>极高, lossless=>无损, hires=>Hi-Res, jyeffect => 高清环绕声, sky => 沉浸环绕声, jymaster => 超清母带
 */
export const getSongsUrl = <T>(id: string, level = 'standard') => {
  return request.get<T>('/song/url/v1', { id, level })
}

/**
 * 获取音乐url 新版
 */
