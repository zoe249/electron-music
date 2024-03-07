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
