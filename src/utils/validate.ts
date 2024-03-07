/**
 * 校验手机号
 */
export const validatePhone = (phone: string) => {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
  const result = reg.test(phone) ? true : false
  return result
}
